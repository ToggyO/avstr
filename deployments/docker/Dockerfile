FROM node:12.2.0-alpine as build-deps
COPY . /src
WORKDIR /src
RUN npm install --silent --production
RUN npm run build:prod

FROM nginx:1.16.0-alpine
COPY --from=build-deps /src/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY /deployments/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]