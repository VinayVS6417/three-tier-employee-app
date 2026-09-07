# -----------------------------------
# Stage - 1 : Prepare Frontend
# -----------------------------------

FROM node:22-alpine AS build

WORKDIR /app

COPY src ./src

RUN mkdir -p /app/dist && cp -r src/* /app/dist

# ------------------------------------
# Stage - 2 : Nginx
# ------------------------------------

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]