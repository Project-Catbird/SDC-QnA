docker volume create pgdata
docker run -p 5432:5432 -v pgdata:/var/lib/postgresql/data sdcqnadb