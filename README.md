# k8s-web-socket-test

## Setup Insecure Registries

If you try to work with a insecure registry, you will get `http: server gave HTTP response to HTTPS client`. 

Fix:

Create or modify `/etc/docker/daemon.json`

```json
{ "insecure-registries":["172.17.0.2:5000"] }
```

Restart docker daemon

```bash
sudo service docker restart
```
