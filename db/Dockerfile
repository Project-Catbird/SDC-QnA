FROM postgres:latest

ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD password
ENV POSTGRES_DB 'sdc-qna'

COPY *.sql /docker-entrypoint-initdb.d/