# stage1 : build vite app
FROM node:21-alpine3.19 as builder
WORKDIR /app
COPY package.json . 
RUN npm install
COPY . .
RUN npm run build

# stage2 : create the production stage
FROM nginx:latest
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

