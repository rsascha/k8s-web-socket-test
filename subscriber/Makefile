.PHONY: help

help: Makefile
	@sed -n 's/^##//p' $<

VERSION := $(shell date +%s)
export DOCKER_IMAGE = localhost:5000/subscriber:${VERSION}

## node_modules         : Perform npm install
node_modules:
	npm install

## dist                 : Perform npm build
dist: node_modules
	npm run build

## build-application    : Build the application
build-application: dist

## docker-build         : Build Docker image
docker-build: 
	docker build --tag=${DOCKER_IMAGE} --tag=latest .

## docker-push          : Push Docker image
docker-push: 
	docker push ${DOCKER_IMAGE}

## generate-kustomize   : Generate kustomize files from templates
generate-kustomize:
	envsubst < k8s/overlays/dev/deployment.tmpl.yaml > k8s/overlays/dev/deployment.yaml

## generate-manifests   : Generate K8s manifest files from templates
generate-manifests:
	@mkdir -p k8s/generated
	kustomize build k8s/overlays/dev/ --output k8s/generated/dev.yaml

## apply-to-k8s         : Deploy application
apply-to-k8s:
	kubectl apply -f k8s/generated/dev.yaml

## clear-dist           : Delete npm modules and the dist directory
clear-dist:
	rm -r dist

## clean                : Delete npm modules and the dist directory
clean: clear-dist
	rm -r node_modules

## deploy               : Deploy application
deploy: build-application \
        docker-build \
        docker-push \
        generate-kustomize \
        generate-manifests \
        apply-to-k8s 

## build-and-deploy      : Deploy application
build-and-deploy: clear-dist deploy
