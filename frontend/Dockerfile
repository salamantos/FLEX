FROM nginx:1.17.9

COPY . /var/www
COPY nginx.conf /etc/nginx/nginx.conf

RUN chown -R nobody: /var/cache/nginx
RUN chown -R nobody: /var/run/

USER nobody
