.PHONY : help

help : Makefile
	@sed -n 's/^##//p' $<

VERSION_FILE=k8s/version
OLD_VERSION=`cat $(VERSION_FILE)`
NEW_VERSION=$(shell echo $$(($(OLD_VERSION) + 1)))

## dist: Perform npm run build
dist: node_modules
	npm run build

## node_modules: Perform npm install
node_modules:
	npm install

## version: Generate version
version: k8s/version
	echo 0 > version

## build_application: : Build the application
build_application: dist
	@echo "ready!"
	@echo $(OLD_VERSION)
	@echo $(NEW_VERSION)
	
## clean: Delete npm modules and the dist directory
clean:
	rm -r node_modules
	rm -r dist
