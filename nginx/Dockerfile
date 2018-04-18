FROM nginx:1.13-alpine

# Replace default nginx conf files with this projects conf files
RUN rm /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/
RUN rm /etc/nginx/conf.d/default.conf
COPY malvisualiser.conf /etc/nginx/conf.d/

# Make directory for serving static files and copy build over
RUN mkdir /var/www
COPY ./build /var/www/
