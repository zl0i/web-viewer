FROM node:16-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npm run build


FROM nginx:1.19-alpine
EXPOSE 8080
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /var/www/static/
