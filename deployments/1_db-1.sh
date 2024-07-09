#!/bin/bash

# Nombre del archivo SQL a cargar
SQL_FILE="clothing_store_data.sql"

# Nombre del YAML de despliegue
YAML_FILE="db-1-deployment.yaml"

# Verificar si el deployment ya existe
if microk8s.kubectl get deployment db-1-deployment; then
  echo "El deployment db-1-deployment ya existe. Actualizando la imagen..."
  microk8s.kubectl set image deployment/db-1-deployment db-1=${IMAGE_NAME} --record
else
  echo "Aplicando YAML de despliegue para crear el pod de PostgreSQL (db-1)..."
  microk8s.kubectl apply -f ${YAML_FILE}

  # Esperar unos segundos para asegurar que el pod esté completamente creado
  sleep 10
fi

# Obtener el nombre del pod de PostgreSQL (db-1)
POD_NAME=$(microk8s.kubectl get pods -l app=db-1 -o=jsonpath='{.items[0].metadata.name}')
echo "Pod de PostgreSQL (db-1) creado: ${POD_NAME}"

# Verificar si la tabla products existe
TABLE_EXISTS=$(microk8s.kubectl exec ${POD_NAME} -- psql -U postgres -d clothing_store -tAc "SELECT 1 FROM pg_tables WHERE tablename='products';")

if [ "$TABLE_EXISTS" = "1" ]; then
  echo "La tabla products ya existe. No se ejecutará el script SQL."
else
  # Copiar el archivo SQL al contenedor de PostgreSQL (db-1)
  echo "Copiando archivo SQL (${SQL_FILE}) al contenedor de PostgreSQL (db-1)..."
  microk8s.kubectl cp ${SQL_FILE} ${POD_NAME}:/tmp/${SQL_FILE}

  # Ejecutar el script SQL dentro del contenedor de PostgreSQL (db-1)
  echo "Ejecutando script SQL (${SQL_FILE}) en la base de datos clothing_store..."
  microk8s.kubectl exec ${POD_NAME} -- psql -U postgres -d clothing_store -f /tmp/${SQL_FILE}

  echo "Script SQL ejecutado exitosamente."
fi

