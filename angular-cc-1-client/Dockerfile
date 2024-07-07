#Intento 1

FROM node:latest
RUN mkdir -p /app
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 
EXPOSE 4200
EXPOSE 3000
CMD ["npm", "start", "--", "--host=0.0.0.0"]


# Intento 2

# Etapa de build
# FROM node:16-alpine as builder 

# WORKDIR /app
# COPY package.json ./
# RUN npm install
# COPY . . 
# RUN npm run build

# # Etapa de producción
# FROM nginx:latest
# COPY --from=builder /app/dist /usr/share/nginx/html
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]