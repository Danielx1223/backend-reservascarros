FROM node:18.16.1-alpine
WORKDIR /backend-m3-diplomado1
ENV DB_URL=mongodb+srv://danielx_12:Adri9874_@backenddiplomado.tab9le8.mongodb.net/?retryWrites=true&w=majority
ENV SALTING_ROUNDS=5
ENV JWT_SECRET_KEY=XNWXx2BFRGoQnUxBapADIhmAbEvB9lPijAjQr0nTC+qDtKk5ECqH2bE6v/LhSWKNtwIGfeOiNCp74LfKh7NgdLyi2GsWxARBFbjoBaGWYXm1KShCsqTcYIegATeOK4LkizG+FekOZG9MTBqvwbosUFQD/6BweIciRFM/Z6cQaou+qc6p0oCPshAzfzG+FqP7s/g7JA5zE5MUgJn7IXoSdUajtN1wp6vOXLhlzMr1CkbWCaCW9Ww5EEykjhP8IvbzzFpCLtf9V54B89P3jGdwIRN03h1Re2egvTdAumlcqbFbjZX50cYZDL8VBuWhWS9so53SxEB35aLQLMqjDGHSHA==
ENV JWT_TTL=24h
ENV PORT=80
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE  80

CMD ["node","index.js"]
