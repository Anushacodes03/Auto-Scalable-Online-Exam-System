FROM node:22

WORKDIR /app

COPY . .

RUN npm install
RUN cd backend && npm install

RUN npm run build

EXPOSE 4173

CMD ["npm","run","preview","--","--host"]