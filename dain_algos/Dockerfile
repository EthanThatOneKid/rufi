# Use an official Node.js runtime as a parent image
FROM node:18

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./
COPY dain.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 2022

# Define the command to run the app
CMD ["npm", "run", "dev"]

