FROM node:22 AS base
WORKDIR /app
EXPOSE 5173

COPY ./package*.json ./
RUN npm install --verbose
COPY . .

FROM base AS publish
RUN npm run build

FROM nginx:alpine AS production
COPY --from=publish /app/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=publish /app/dist .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
