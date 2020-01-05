#!/bin/sh
#install dependencies
npm install --prefix ./backend
npm install --prefix ./frontend
# start backend
npm start --prefix /root/whiteelephant/backend/ &
npm start --prefix /root/whiteelephant/frontend/
