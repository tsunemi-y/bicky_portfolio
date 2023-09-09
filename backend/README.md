名前
====
bicky

## 概要
予約機能付きのHPです。
発達に遅れがある児童の訓練を行う事業のHPです。

当該システムは、すでに利用されており、安定して稼働しています。

## 詳細
ユーザ画面と管理画面があります。
主な機能は、以下となります。

### ユーザ画面 
- ユーザ登録機能
- ログイン機能
- 予約機能
- 予約キャンセル機能
- 予約内容確認内容をユーザにメール送信する機能
- 予約内容確認内容を管理者にLINE送信する機能
- 予約内容をGoogle Calendarに連携する機能

### 管理画面
- 予約可能時間登録（ここで登録した日時がユーザ予約画面にて、予約可能となる）
- 領収書メール送信機能
- 評価表メール送信機能（管理者が選択した添付ファイルをPDFに変換して送信）
- 毎朝定刻に、その日の予約内容を管理者にLINE送信する機能

## 使用技術
- Laravel
- jQuery（ユーザ画面）
- React.js（管理画面）

ユーザ画面と管理画面のJavascriptライブラリが異なる理由は、工数削減のためです。
今後、ユーザ画面もReact.jsにリプレイス予定です。

## 実装の際に意識したこと
- コントローラーのスリム化
  - ビジネスロジックをService層に記載
  - バリデーションは、FormRequestを使用
  - コントローラーで使用するサービスクラスプロパティをコンストラクタで生成（依存性注入とサービスコンテナを利用）
- データアクセスロジックをビジネスロジックと分離するため、レポジトリパターンの採用
- 保守性の強化
  - 複数箇所で利用される処理の関数化
  - ネスト削減のため、ガード節を採用
  - マジックナンバー、再利用する値の定数化