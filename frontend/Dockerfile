# Dockerfile
FROM node:20-alpine

# set work directory
WORKDIR /app/frontend

# copy package.json
COPY ./package.json .

# install packages
RUN npm install

# copy whole project
COPY . .

# create a build
RUN npm run build