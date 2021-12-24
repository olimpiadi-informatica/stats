FROM rustlang/rust:nightly-buster-slim AS build

RUN apt-get update && \
  apt-get install -y libsqlite3-dev && \
  rm -rf /var/lib/apt/lists/*

RUN cargo new --bin oii-stats
WORKDIR /oii-stats

COPY ./Cargo.lock ./Cargo.toml /oii-stats/

RUN cargo +nightly build --release
RUN rm src/*.rs

COPY ./src ./src

RUN rm ./target/release/deps/oii_stats*
RUN cargo build --release



FROM debian:buster-slim
LABEL org.opencontainers.image.authors="Edoardo Morassutto <edoardo.morassutto@gmail.com>"
LABEL org.opencontainers.image.source=https://github.com/algorithm-ninja/oii-stats

RUN apt-get update && \
  apt-get install -y libsqlite3-dev && \
  rm -rf /var/lib/apt/lists/*

ENV DATABASE_URL=/db.sqlite3
COPY db.sqlite3 /
COPY --from=build /oii-stats/target/release/oii-stats /

ADD docker/docker-entrypoint.sh /

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["/oii-stats"]
