FROM debian:bookworm-slim

WORKDIR /app
COPY build ./build
COPY frontend .
EXPOSE 8081
CMD ["./frontend"]