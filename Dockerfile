FROM debian:bookworm-slim

WORKDIR /app
COPY frontend .
EXPOSE 8081
CMD ["./frontend"]