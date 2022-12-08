FROM node:18-bullseye

WORKDIR /app

COPY . ./

RUN npm install

ENTRYPOINT [ "sh", "entrypoint.sh" ]
