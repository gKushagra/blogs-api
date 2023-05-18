FROM node:16-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package.json ./

COPY /www ./

# install dependencies
RUN npm install

COPY . .

# build application
RUN npm run build

# remove development dependencies
RUN npm prune --production

# remove unused dependencies

FROM node:12-alpine

WORKDIR /usr/src/app

# copy from build image
COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

EXPOSE 7655

CMD [ "node", "./dist/main.js" ]