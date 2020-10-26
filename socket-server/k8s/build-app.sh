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
echo "Old version is $OLD_VERSION"

NEW_VERSION=$((OLD_VERSION + 1))
echo "New version is $NEW_VERSION"

docker build --tag=$NEW_VERSION ..
if [ ! $? ]; then
    echo "Docker build failed!"
    exit 1
fi
echo "Docker build is good :)"

echo $NEW_VERSION > version
echo "Wrote new version ($NEW_VERSION) to 'version' file"
