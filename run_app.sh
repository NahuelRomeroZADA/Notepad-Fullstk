#!/bin/bash

# Instalar dependencias globales o comunes
npm install

# Ingresar al directorio backend, instalar las dependencias y ejecutar la configuración de la base de datos
cd backend
npm install
node db.js

# Regresar al directorio raíz del proyecto
cd ..

# Ingresar al directorio frontend, instalar las dependencias
cd frontend
npm install

# Regresar al directorio raíz del proyecto
cd ..

# Iniciar la aplicación
# Nota: Si estás utilizando npm start para iniciar la aplicación, descomenta la siguiente línea.
npm start