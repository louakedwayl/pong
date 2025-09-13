# Étape 1 : Image Node pour builder le frontend
FROM node:20-alpine AS builder

# Créer et se placer dans le dossier de travail
WORKDIR /app

# Copier package.json et package-lock.json si tu en as
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le code
COPY . .

# Builder le projet TypeScript (remplace "build" par ton output)
RUN npm run build

# Étape 2 (optionnelle) : exporter le build pour Nginx
# On ne fait rien ici, juste on garde /app/build

