# Usar una imagen de Node.js como base
FROM node:14

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY ./next-horarios/package.json ./
COPY ./next-horarios/package-lock.json ./

RUN npm cache clean --force

# Instalar las dependencias del proyecto
RUN npm ci --production

# Copiar el código fuente del proyecto
COPY ./next-horarios .

# Ejecutar el comando build
RUN npm run build

# Copiar los archivos del certificado SSL
COPY ./cert/NetlifeNetEc1.crt.pem /app/cert/
COPY ./cert/netlifeNetEc1.key.pem /app/cert/

# Exponer el puerto en el contenedor
EXPOSE 8001

# Comando para iniciar la aplicación
CMD ["npm", "start"]
