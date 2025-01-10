FROM node:16-alpine

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies with network timeout 
RUN npm install --omit=dev --network-timeout=300000

# Copy the rest of the application
COPY . .

USER node

EXPOSE 8000

CMD [ "npm", "start" ]