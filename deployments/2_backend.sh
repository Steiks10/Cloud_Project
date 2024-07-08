#!/bin/bash

# Nombre del archivo YAML del deployment del backend (plantilla)
TEMPLATE_FILE="backend-deployment-template.yaml"

# Nombre del archivo YAML del deployment del backend (resultado final)
OUTPUT_FILE="backend-deployment.yaml"

# Obtener la IP del servicio de la base de datos
DB_IP=$(microk8s.kubectl get svc db-1-service -o jsonpath='{.spec.clusterIP}')
echo "IP del servicio de la base de datos: $DB_IP"

# Exportar la IP de la base de datos como una variable de entorno
export DB_IP

# Sustituir la variable de entorno en la plantilla del YAML del backend
echo "Generando el archivo de despliegue del backend con la IP de la base de datos..."
envsubst < ${TEMPLATE_FILE} > ${OUTPUT_FILE}

# Ejecutar el YAML de despliegue para crear el pod del backend en MicroK8s
echo "Desplegando el backend..."
microk8s.kubectl apply -f ${OUTPUT_FILE}

echo "Despliegue del backend completo."

