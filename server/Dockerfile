FROM node:18
WORKDIR /app
COPY ./package.json ./package.json
COPY . .
RUN npm install 
EXPOSE 3001
CMD ["npm", "start"]