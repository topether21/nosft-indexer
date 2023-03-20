# Ordinals Indexer

#Using Docker

```
# Build the image
docker build -t nosft_indexer:v1 .

# Start a container
docker run --name nosft_indexer --env-file .env -p 4002:4002 -d nosft_indexer:v1

#Open API

http://localhost:4002/status
```

# Local development

### Requirements

- Node.js >= 16.0

```
yarn i
yarn dev
http://localhost:4002/status
```

#Tools

[Convert Javascript Object to JSON](https://www.convertsimple.com/convert-javascript-to-json/)

#References

[Optimizing Node API Development with SWC Compiler and ESLint](https://dev.to/franciscomendes10866/how-to-setup-a-node-api-with-swc-and-eslint-1h5d)

[How to watch and reload ts-node when TypeScript files change](https://stackoverflow.com/questions/37979489/how-to-watch-and-reload-ts-node-when-typescript-files-change)

[How To Create A Production Image For A Node.js + TypeScript App Using Docker Multi-Stage Builds](https://www.andreadiotallevi.com/blog/how-to-create-a-production-image-for-a-node-typescript-app-using-docker-multi-stage-builds)
