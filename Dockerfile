FROM nginx:latest

RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/apps/site/browser /usr/share/nginx/html
COPY ./apps/site/nginx.conf /etc/nginx/nginx.conf
COPY ./apps/site/assets /usr/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
