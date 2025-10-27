FROM debian:bookworm-slim

WORKDIR /app
COPY build .
EXPOSE 8081
CMD ["./frontend"]