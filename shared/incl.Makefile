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

process-templates:
	envsubst < k8s/overlays/dev/deployment.tmpl.yaml > k8s/overlays/dev/deployment.yaml
	@sed -i '1s/^/---\n/' k8s/overlays/dev/deployment.yaml
	@sed -i '2s/^/# ------------------------------------\n/' k8s/overlays/dev/deployment.yaml
	@sed -i '3s/^/# --- GENERATED FILE - DO NOT EDIT ---\n/' k8s/overlays/dev/deployment.yaml
	@sed -i '4s/^/# --- Edit: deployment.tmpl.yaml   ---\n/' k8s/overlays/dev/deployment.yaml
	@sed -i '5s/^/# ------------------------------------\n/' k8s/overlays/dev/deployment.yaml
	@sed -i '6s/^/---\n/' k8s/overlays/dev/deployment.yaml

docker-build: process-templates
	docker build --tag=${DOCKER_IMAGE} --tag=latest .
	docker push ${DOCKER_IMAGE}

k8s-kustomize: process-templates
	@mkdir -p k8s/generated
	kustomize build k8s/overlays/dev/ --output k8s/generated/dev.yaml
	@sed -i '1s/^/---\n/' k8s/overlays/dev/deployment.yaml
	@sed -i '2s/^/# --------------------------------------\n/' k8s/generated/dev.yaml
	@sed -i '3s/^/# --- GENERATED FILE - DO NOT EDIT   ---\n/' k8s/generated/dev.yaml
	@sed -i '4s/^/# --- Edit files in base or overlays ---\n/' k8s/generated/dev.yaml
	@sed -i '5s/^/# --------------------------------------\n/' k8s/generated/dev.yaml
	@sed -i '6s/^/---\n/' k8s/overlays/dev/deployment.yaml

k8s-apply:
	kubectl apply -f k8s/generated/dev.yaml

deploy: build-application \
        docker-build \
        k8s-kustomize \
        k8s-apply

deploy-with-build: clear-dist deploy
