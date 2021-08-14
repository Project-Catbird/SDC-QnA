from node:16

RUN mkdir /application

WORKDIR /application

COPY . /application

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]