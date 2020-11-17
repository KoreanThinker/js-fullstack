FROM node:12.18.3

WORKDIR /app

COPY package.json .
COPY dist dist/
COPY prisma prisma/

RUN npm install
RUN npm run generate:prisma

EXPOSE 80

CMD ["npm", "run", "start"]

# run npm build first
# docker build -t gcr.io/react-graphql-295404/back:1.5 .
# docker run --name react-graphql-back-con -p 80:80 gcr.io/react-graphql-295404/back:1.5
# docker push gcr.io/react-graphql-295404/back:1.5