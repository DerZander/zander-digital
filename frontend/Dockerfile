# --- Build Stage ---
FROM node:18 AS build

WORKDIR /app

# Build-ARG für Vite-API-URL (standard fallback optional)
ARG VITE_API_URL=https://zander.digital/api
ENV VITE_API_URL=${VITE_API_URL}

COPY package*.json ./
RUN npm install

COPY . .

# zur Build-Zeit mit gesetzter API-URL
RUN npm run build

# --- Production Stage (nginx) ---
FROM nginx:alpine

# Entferne Standardseite
RUN rm -rf /usr/share/nginx/html/*

# Kopiere Build-Output
COPY --from=build /app/dist /usr/share/nginx/html

# (Optional) Eigene nginx.conf:
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
