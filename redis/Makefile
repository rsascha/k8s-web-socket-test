k8s-kustomize:
	@mkdir -p k8s/generated
	kustomize build k8s/overlays/dev/ --output k8s/generated/dev.yaml

k8s-apply:
	kubectl apply -f k8s/generated/dev.yaml

deploy: k8s-kustomize \
        k8s-apply
