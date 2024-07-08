#!/bin/bash

# Nombre del archivo SQL a cargar
SQL_FILE="clothing_store_data.sql"

# Nombre del YAML de despliegue
YAML_FILE="db-1-deployment.yaml"

echo "Aplicando YAML de despliegue para crear el pod de PostgreSQL (db-1)..."
microk8s.kubectl apply -f ${YAML_FILE}

# Esperar unos segundos para asegurar que el pod esté completamente creado
sleep 10

# Obtener el nombre del pod de PostgreSQL (db-1)
POD_NAME=$(microk8s.kubectl get pods -l app=db-1 -o=jsonpath='{.items[0].metadata.name}')
echo "Pod de PostgreSQL (db-1) creado: ${POD_NAME}"

# Copiar el archivo SQL al contenedor de PostgreSQL (db-1)
echo "Copiando archivo SQL (${SQL_FILE}) al contenedor de PostgreSQL (db-1)..."
microk8s.kubectl cp ${SQL_FILE} ${POD_NAME}:/tmp/${SQL_FILE}

# Ejecutar el script SQL dentro del contenedor de PostgreSQL (db-1)
echo "Ejecutando script SQL (${SQL_FILE}) en la base de datos clothing_store..."
microk8s.kubectl exec ${POD_NAME} -- psql -U postgres -d clothing_store -f /tmp/${SQL_FILE}

echo "Script SQL ejecutado exitosamente."

