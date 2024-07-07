FROM node:latest

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de la aplicación
COPY package.json ./
COPY package-lock.json ./ 

RUN npm install
COPY . ./

ENV DB_USER=postgres
ENV DB_HOST=localhost
ENV DB_NAME=clothing_store
ENV DB_PASSWORD=postgres
ENV DB_PORT=5432

EXPOSE 3000
EXPOSE 5432
CMD ["node", "server.js", "--host", "0.0.0.0"]