#!/bin/bash

if [ ! -d "../node_modules" ]; then
    echo "Please run `npm install`"
    exit 1
fi
echo "Found node_modules :)"

if [ ! -d "../dist" ]; then
    echo "Please run `npm run build`"
    exit 1
fi
echo "Found dist folder :)"

if [ ! -f "version" ]; then
    echo 0 > version
    echo "Version file created ;)"
fi

OLD_VERSION=$(cat version)
NEW_VERSION=$((OLD_VERSION + 1))
echo "Switch version from $OLD_VERSION to $NEW_VERSION"

export DOCKER_IMAGE="localhost:5000/socket-server:$NEW_VERSION"
docker build --tag=$DOCKER_IMAGE ..
if [ $? -gt 0 ]; then
    echo "Docker build failed!"
    exit 1
fi
echo "Docker build is good :)"

docker push $DOCKER_IMAGE 
if [ $? -gt 0 ]; then
    echo "Docker push failed!"
    exit 1
fi
echo "Docker push is good :)"

echo "Perform envsubst"
SOURCE_FILE=overlays/dev/deployment.tmpl.yaml
TARGET_FILE=overlays/dev/deployment.yaml
echo "Source File: $SOURCE_FILE Target File: $TARGET_FILE"
envsubst < $SOURCE_FILE > $TARGET_FILE
if [ $? -gt 0 ]; then
    echo "envsubs push failed!"
    exit 1
fi
echo "envsubst is good :)"

echo $NEW_VERSION > version
echo "Wrote new version $NEW_VERSION to 'version' file"

OUTPUT_FILE=generated/dev.yaml
kustomize build overlays/dev/ --output $OUTPUT_FILE
if [ $? -gt 0 ]; then
    echo "Kustomize build failed!"
fi
echo "Kustomization done :) -> wrote: $OUTPUT_FILE"

kubectl apply -f $OUTPUT_FILE 
