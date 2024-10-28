# Step 1: Build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Step 2: Serve the app using a web server
FROM nginx:alpine

# Copy the build output to Nginx's html directory
# COPY --from=build /app/build /usr/share/nginx/html

# Expose the port the app runs on

EXPOSE 3000  # Make sure this line is included

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
