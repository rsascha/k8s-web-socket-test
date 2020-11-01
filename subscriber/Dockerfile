FROM nginxinc/nginx-unprivileged:stable-alpine

WORKDIR /usr/share/nginx/html
COPY dist/subscriber .
COPY docker/etc/nginx/conf.d/default.conf /etc/nginx/conf.d/
