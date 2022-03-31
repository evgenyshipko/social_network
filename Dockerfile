FROM node:16

COPY package*.json ./

RUN npm ci

COPY . /

RUN npm run build

CMD npm run start