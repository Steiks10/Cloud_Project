#!/bin/bash

# Nombre del archivo YAML del deployment del frontend (plantilla)
TEMPLATE_FILE="frontend-deployment-template.yaml"

# Nombre del archivo YAML del deployment del frontend (resultado final)
OUTPUT_FILE="frontend-deployment.yaml"

# Obtener la IP del backend (o la URL completa según tu configuración)
BACKEND_IP=$(microk8s.kubectl get svc backend-service -o jsonpath='{.spec.clusterIP}')
echo "IP del backend: $BACKEND_IP"

# Exportar la IP del backend como una variable de entorno
export BACKEND_IP

# Sustituir la variable de entorno en la plantilla del YAML del frontend
echo "Generando el archivo de despliegue del frontend con la IP del backend..."
envsubst < ${TEMPLATE_FILE} > ${OUTPUT_FILE}

# Verificar si el deployment del frontend ya existe
EXISTING_DEPLOYMENT=$(microk8s.kubectl get deployment frontend-deployment --ignore-not-found)

if [ -z "$EXISTING_DEPLOYMENT" ]; then
  echo "Creando nuevo deployment del frontend..."
  microk8s.kubectl apply -f ${OUTPUT_FILE}
else
  echo "Actualizando deployment del frontend existente..."
  IMAGE_NAME=$(grep 'image:' ${OUTPUT_FILE} | awk '{print $2}')
  microk8s.kubectl set image deployment/frontend-deployment frontend=${IMAGE_NAME} --record
fi

sleep 10

# Entrar al pod del frontend
FRONTEND_POD=$(microk8s.kubectl get pods -l app=frontend -o jsonpath='{.items[0].metadata.name}')
echo "Entrando al pod del frontend: ${FRONTEND_POD}"
microk8s.kubectl exec -it ${FRONTEND_POD} -- /bin/bash -c "sed -i 's|backend_host: .*|backend_host: \"$BACKEND_IP\" |' /app/src/environments/environment.ts"

echo "Despliegue del frontend completo y actualización de environment.ts."

