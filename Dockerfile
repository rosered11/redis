FROM node:dubnium

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY ./web/package.json /usr/app
RUN npm install

COPY ./web/dist /usr/app/dist

CMD ["npm", "start"]