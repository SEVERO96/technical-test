FROM node:alpine3.16
WORKDIR /app
COPY package.json .
RUN npm install --silent 
COPY . .
RUN npm run build
CMD ["npm", "start"]

