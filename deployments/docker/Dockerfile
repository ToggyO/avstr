FROM node:12.2.0-alpine as build-deps
WORKDIR /src
COPY . /src
RUN npm install --silent --production
RUN npm run build:prod

FROM nginx:1.17.0-alpine
RUN rm /etc/nginx/conf.d/default.conf
COPY /deployments/nginx/nginx.conf /etc/nginx/conf.d
COPY --from=build-deps /src/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx","-g","daemon off;"]
