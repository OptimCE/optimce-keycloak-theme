FROM maven:3.9-eclipse-temurin-17 AS builder
WORKDIR /app

RUN apt-get update -qq && apt-get install -y -qq nodejs npm

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run build-keycloak-theme

FROM ubuntu:jammy AS theme-extractor
RUN apt-get update -qq && apt-get install -y -qq unzip zip && rm -rf /var/lib/apt/lists/*
WORKDIR /src
COPY --from=builder /app/dist_keycloak/keycloak-theme-for-kc-all-other-versions.jar .
RUN mkdir -p /theme-fix /dist && \
    cd /theme-fix && \
    unzip -o /src/keycloak-theme-for-kc-all-other-versions.jar && \
    mv theme/keycloakify-starter theme/optimce && \
    echo '{"themes":[{"name":"optimce","types":["login"]}]}' > META-INF/keycloak-themes.json && \
    zip -r /dist/keycloak-theme-for-kc-all-other-versions.jar META-INF theme && \
    cd / && rm -rf /theme-fix /src

ENTRYPOINT ["echo", "Theme built: /dist/keycloak-theme-for-kc-all-other-versions.jar"]
CMD ["/bin/bash"]
