#
# This file can be used by other Makefiles like:
#
# 	export DOCKER_IMAGE := localhost:5000/subscriber:$(shell date +%s)
# 	include incl.Makefile
#

node_modules:
	npm install

dist: node_modules
	npm run build

build-application: dist

clear-dist:
	rm -r dist

rebuild-application: clear-dist build-application

clear-node_modules:
	rm -r node_modules

clear-all: clear-dist clear-node_modules

generate-templates:
	envsubst < k8s/overlays/dev/deployment.tmpl.yaml > k8s/overlays/dev/deployment.yaml

docker-build: generate-templates
	docker build --tag=${DOCKER_IMAGE} --tag=latest .
	docker push ${DOCKER_IMAGE}

k8s-kustomize: generate-templates
	@mkdir -p k8s/generated
	kustomize build k8s/overlays/dev/ --output k8s/generated/dev.yaml

k8s-apply:
	kubectl apply -f k8s/generated/dev.yaml

deploy: build-application \
        docker-build \
        k8s-kustomize \
        k8s-apply

deploy-with-build: clear-dist deploy
