# [Choice] Debian OS version: bullseye, buster
ARG VARIANT=bullseye
FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/base:0-${VARIANT}

ENV DENO_INSTALL=/deno
RUN mkdir -p /deno
RUN curl -fsSL https://deno.land/x/install/install.sh | sh
RUN chown -R vscode /deno

ENV PATH=${DENO_INSTALL}/bin:${PATH}
ENV DENO_DIR=${DENO_INSTALL}/.cache/deno

RUN deno upgrade

# [Optional] Uncomment this section to install additional OS packages.
# RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
#    && apt-get -y install --no-install-recommends <your-package-list-here>
