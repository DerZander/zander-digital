# Build-Stage
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# .env wird automatisch gelesen
RUN npm run build

# Serve über Nginx
FROM nginx:alpine

# Lösche default Seite
RUN rm -rf /usr/share/nginx/html/*

# Kopiere Build-Output
COPY --from=build /app/dist /usr/share/nginx/html

# (Optional) eigene Nginx-Konfig
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
