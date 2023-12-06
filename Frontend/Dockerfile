# Stage 1: Build the Vue application
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Set up Apache and copy the built files
FROM httpd:alpine
COPY --from=builder /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
