#!/bin/bash

sudo su -c 'echo "deb https://deb.nodesource.com/armv6l-node/ weezy main" >> /etc/apt/sources.list'
curl -s https://deb.nodesource.com/gpgkey/nodesource.gpg.key | sudo apt-key add -
sudo apt-get update -y
sudo apt-get install nodejs -y