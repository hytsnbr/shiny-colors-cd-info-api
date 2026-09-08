# Denoのバージョンを明示的に固定
ARG DENO_VERSION=2.9.6
FROM denoland/deno:${DENO_VERSION}

ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=${USER_UID}

# devcontainer.json の remoteUser("vscode")を作成
# ※ 公式 denoland/deno イメージには vscode ユーザーが存在しないため必須
RUN groupadd --gid ${USER_GID} ${USERNAME} \
    && useradd --uid ${USER_UID} --gid ${USER_GID} -m -s /bin/bash ${USERNAME}

# Denoの依存キャッシュ置き場のみ vscode ユーザーの書き込み可能な場所に用意する
# （バイナリ自体は /usr/local/bin/deno のまま。devcontainer.json の "deno.cache": "$HOME/.cache/deno" と一致させる）
ENV DENO_DIR=/home/${USERNAME}/.cache/deno

RUN mkdir -p ${DENO_DIR} \
    && chown -R ${USERNAME}:${USERNAME} /home/${USERNAME}

# 以降は作成したユーザー vscode で実行
USER ${USERNAME}
