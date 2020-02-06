#!/bin/sh
docker run -d -p 3100:3100 -v $(pwd):/root/whiteelephant --name whiteelephant --restart always node:10 /root/whiteelephant/start.sh
