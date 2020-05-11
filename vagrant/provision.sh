#!/bin/bash

apt-get update

apt install -y mongodb
systemctl enable --now mongodb

apt install -y npm nodejs

cd /home/vagrant/workspace
npm install
sudo npm i -g npx