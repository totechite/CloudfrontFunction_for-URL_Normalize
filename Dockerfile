FROM node:18-bullseye

WORKDIR /app

COPY . /app/

RUN npm install

ENTRYPOINT [ "sh", "entrypoint.sh" ]
