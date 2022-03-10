from node:16

WORKDIR /app

COPY package.json /app
COPY /framework /app/framework
COPY /test /app/test

RUN npm install
RUN mkdir /app/report

CMD ["npm", "run", "test"]
