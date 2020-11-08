kustomize:
	@mkdir -p k8s/generated
	kustomize build k8s/overlays/dev/ --output k8s/generated/dev.yaml

apply:
	kubectl apply -f k8s/generated/dev.yaml

deploy: kustomize \
        apply
