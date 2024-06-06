FROM docker.arvancloud.ir/node:22-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node","main.js"]