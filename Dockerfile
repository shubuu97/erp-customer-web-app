FROM node:6.10.3-alpine
RUN mkdir -p /customer-web-app
ENV APPLICATION_BFF_URL=""
CMD mkdir /var/log/applogs
CMD chmod +777 /var/log/applogs
WORKDIR /customer-web-app
ADD . /customer-web-app
CMD npm run build
#RUN npm install -g serve
#CMD serve -s build