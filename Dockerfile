FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]

FROM nginx:1.23.4
WORKDIR /user/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /usr/src/app/build .
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]