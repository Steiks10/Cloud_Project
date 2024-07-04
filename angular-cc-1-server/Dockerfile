FROM node:latest

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de la aplicación
COPY package.json ./
COPY package-lock.json ./ 

RUN npm install
COPY . ./

EXPOSE 3000
EXPOSE 5432
CMD ["node", "server.js", "--host", "0.0.0.0"]