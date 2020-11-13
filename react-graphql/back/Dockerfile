# run npm build first

FROM node:12.18.3

WORKDIR /usr/src/app

COPY package.json .
COPY dist dist/
COPY prisma prisma/

RUN npm install
RUN npm run generate:prisma

EXPOSE 80

CMD ["npm", "run", "start"]

# docker build -t gcr.io/react-graphql-295404/back:1.2 .
# docker push gcr.io/react-graphql-295404/back:1.2
# docker run --name react-graphql-back-con -p 80:80 gcr.io/react-graphql-295404/back:1.2