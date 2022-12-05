FROM node:18-bullseye

WORKDIR /app

COPY . /app/

RUN npm install -y

ENTRYPOINT [ "sh", "entrypoint.sh" ]
