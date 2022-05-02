FROM node:12

WORKDIR /usr/src/app

COPY . .

COPY package*.json ./

RUN npm install

EXPOSE 3000

RUN npm run build

CMD [ "npm", "run" , "start" ]

