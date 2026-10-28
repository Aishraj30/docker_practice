# docker_practice

## Run with Docker Compose

From the repository root, build and start the frontend, backend, and MongoDB:

```sh
docker compose up --build -d
```

Open [http://localhost:8080](http://localhost:8080). The frontend proxies API
requests to the backend, so the backend and MongoDB do not need to be exposed
to the host.

Compose starts a MongoDB container by default and stores its data in the
`mongo_data` volume. To use an external MongoDB instead, set `MONGO_URI` in a
root-level `.env` file or in the shell before starting Compose; that URI
overrides the local MongoDB connection string. Set `FRONTEND_PORT` to change
the host port (for example, `FRONTEND_PORT=3000`).

Stop the containers with `docker compose down`. To also delete the persisted
MongoDB data, run `docker compose down --volumes`.
