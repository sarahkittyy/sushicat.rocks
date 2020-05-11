FROM ubuntu:18.04

EXPOSE 8000

WORKDIR /workspace
COPY package.json .

RUN apt update -y
RUN apt install -y nodejs npm
RUN npm install
RUN npm install -g npx