ARG NODE_VERSION=18
ARG NPM_VERSION=8.19.2

FROM node:${NODE_VERSION}

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install -g npm@${NPM_VERSION}
RUN npm install -g serve
RUN npm ci --only=production

COPY . ./

RUN npm run build

EXPOSE 80

CMD serve -s build -l 80