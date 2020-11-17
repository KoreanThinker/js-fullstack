FROM node:12.18.3

WORKDIR /app

COPY package.json .
COPY .next .next/
COPY public public/

RUN npm install

EXPOSE 80

CMD ["npm", "run", "start"]

# npm run build first
# docker build -t gcr.io/react-graphql-295404/front:1.4 .
# docker run --name react-graphql-front-con -p 80:80 gcr.io/react-graphql-295404/front:1.4
# docker push gcr.io/react-graphql-295404/front:1.4