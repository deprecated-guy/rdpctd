FROM nginx:latest

# Копируем статические файлы из собранного приложения в каталог Nginx
RUN rm -rf /usr/share/nginx/html/*
COPY ./dist/apps/site/browser /usr/share/nginx/html
COPY ./apps/site/nginx.conf /etc/nginx/nginx.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
