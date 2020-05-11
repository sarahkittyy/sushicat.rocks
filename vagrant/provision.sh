#!/bin/bash

apt-get update

apt install -y mongodb
systemctl enable --now mongodb

apt install -y npm nodejs

sudo npm i -g npx