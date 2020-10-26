#!/bin/bash

OUTPUT_FILE=generated/dev.yaml
kustomize build overlays/dev/ --output $OUTPUT_FILE
if [ ! $? ]; then
    echo "Kustomize build failed!"
fi
echo "Kustomization done :) -> wrote: $OUTPUT_FILE"
