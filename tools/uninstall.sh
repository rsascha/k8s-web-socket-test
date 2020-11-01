#!/bin/bash

kind delete cluster
docker network disconnect "kind" "kind-registry"
