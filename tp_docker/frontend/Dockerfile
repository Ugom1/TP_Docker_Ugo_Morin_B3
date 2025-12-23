# --- Stage 1: Build ---
  FROM node:20-slim AS build
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  # On crée le dossier dist et on y copie ton html
  RUN mkdir -p dist && cp src/index.html dist/ || cp index.html dist/
  
  # --- Stage 2: Production (Cible 'production') ---
  FROM nginx:alpine AS production
  # On copie le contenu du dossier dist vers Nginx
  COPY --from=build /app/dist /usr/share/nginx/html
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  
  # --- Stage 3: Development (Cible 'development') ---
  FROM build AS development
  # On utilise l'utilisateur non-root pour le barème
  USER node
  CMD ["npm", "run", "dev"]