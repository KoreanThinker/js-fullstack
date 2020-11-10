FROM node:12.18.3

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

CMD ["npm", "run", "build&start"]

COPY . .