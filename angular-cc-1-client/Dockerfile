# Dockerfile

# Establecer la imagen base de Node.js
FROM node:latest

# Crear el directorio de la aplicación dentro del contenedor
RUN mkdir -p /app
WORKDIR /app

# Copiar los archivos de configuración y de dependencias
COPY package*.json ./
RUN npm install
COPY . .

# Configurar la variable de entorno BACKEND_HOST (puedes cambiar esto según tus necesidades)
ENV BACKEND_HOST=backend_host

# Generar el archivo environment.ts usando la variable de entorno
RUN echo "export const environment = {" > ./src/environments/environment.ts
RUN echo "  backend_host: '$BACKEND_HOST'" >> ./src/environments/environment.ts
RUN echo "};" >> ./src/environments/environment.ts

# Compilar la aplicación Angular
RUN npm run build --prod

# Exponer el puerto de la aplicación Angular
EXPOSE 4200

# Comando para iniciar la aplicación Angular
CMD ["npm", "start", "--", "--host=0.0.0.0"]
