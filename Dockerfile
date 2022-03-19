from node:16

WORKDIR /app

COPY package.json /app
COPY /framework /app/framework
COPY /test /app/test

RUN mkdir /app/report
RUN npm install

ENTRYPOINT ["npm", "run", "test"]
