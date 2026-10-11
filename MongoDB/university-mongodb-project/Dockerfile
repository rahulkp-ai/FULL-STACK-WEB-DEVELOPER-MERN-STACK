FROM node:20-alpine

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy dependency manifests
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project source files
COPY . .

# Run the project script
CMD ["npm", "start"]