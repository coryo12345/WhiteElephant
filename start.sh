#!/bin/sh
#install dependencies
npm install --prefix /root/whiteelephant/backend/
npm install --prefix /root/whiteelephant/frontend/
# start backend
npm start --prefix /root/whiteelephant/backend/ &
npm start --prefix /root/whiteelephant/frontend/
