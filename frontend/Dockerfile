# ベースとなるDockerイメージ指定
FROM node:18

# コンテナ内に作業ディレクトリを作成
WORKDIR /usr/src/app

# 依存関係ファイルをワーキングディレクトリにコピー
COPY ./package*.json ./

# パッケージのインストール
RUN yarn install

RUN chmod -R 777 ./

# ソースをコピー
COPY . .

# # 開発サーバの起動
# CMD [ "yarn", "dev" ]
