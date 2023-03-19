# Ordinals Indexer

References

[Optimizing Node API Development with SWC Compiler and ESLint](https://dev.to/franciscomendes10866/how-to-setup-a-node-api-with-swc-and-eslint-1h5d)

```
# Build the image
docker build -t nosft_indexer:v1 .

# Start a container
docker run --name nosft_indexer --env-file .env -p 4002:4002 -d indexer_v1
```
