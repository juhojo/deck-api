FROM node:12.18.4-alpine

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
