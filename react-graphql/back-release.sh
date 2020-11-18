version=1.6

cd back
npm run build
docker build -t gcr.io/react-graphql-295404/back:$version .
docker push gcr.io/react-graphql-295404/back:$version
cd ..