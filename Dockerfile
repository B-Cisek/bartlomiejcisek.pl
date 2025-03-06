# Use official Node.js image as a build step
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the React app
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:stable-alpine


COPY .docker/nginx/nginx.conf /etc/nginx/nginx.conf

# Copy the built files from the build step
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
