FROM node:18
WORKDIR /app
COPY ./package.json ./package.json
COPY . .
RUN npm install --force
EXPOSE 3000
CMD ["npm","start"]