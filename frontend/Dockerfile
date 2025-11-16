# Stage 1: Build React App
FROM node:18 AS build

WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Fix OpenSSL issue and build the React app
ENV NODE_OPTIONS="--openssl-legacy-provider"
RUN npm run build

# Stage 2: Nginx for Serving React App with HTTPS
FROM nginx:alpine

# Remove default Nginx static files and copy built React files
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html

# Copy SSL certificates and Nginx config
COPY ssl/my-cert.crt /etc/nginx/ssl/my-cert.crt
COPY ssl/my-cert.key /etc/nginx/ssl/my-cert.key
COPY nginx.conf /etc/nginx/nginx.conf

# Expose ports for HTTP (80) and HTTPS (443)
EXPOSE 80 443

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
