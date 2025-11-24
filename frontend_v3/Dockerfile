# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production stage
FROM nginx:1.17.9

# Copy built files from build stage
COPY --from=build /app/build /var/www

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Set permissions
RUN chown -R nobody: /var/cache/nginx
RUN chown -R nobody: /var/run/
RUN chown -R nobody: /var/www

USER nobody

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]

