# npm run build first

FROM node:12.18.3

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

EXPOSE 80

COPY . .

CMD ["npm", "run", "build:start"]


# docker build -t gcr.io/react-graphql-295404/front:1.3 .
# docker push gcr.io/react-graphql-295404/front:1.3
# docker run --name react-graphql-front-con -p 80:80 gcr.io/react-graphql-295404/front:1.3