# PWA Camera Control

このリポジトリは、React・TypeScript・Viteを用いたPWA対応のカメラアプリです。

## 概要

- スマートフォンやPCのブラウザで動作するPWAカメラアプリです。
- Reactによる快適なUIと、TypeScriptによる型安全な実装です。
- Viteを利用して高速な開発・ビルドが可能です。
- Tailwind CSSでスタイリッシュなデザインを実現しています。

## 使い方

1. このリポジトリをクローンします。
2. 依存パッケージをインストールします。
   ```sh
   npm install
   ```
3. 開発サーバーを起動します。
   ```sh
   npm run dev
   ```
4. ブラウザで `http://localhost:5173` を開き、カメラ機能を利用してください。

## 主なコマンド

| コマンド          | 説明                       |
| ----------------- | -------------------------- |
| `npm run dev`     | 開発サーバーの起動         |
| `npm run build`   | 本番ビルド                 |
| `npm run preview` | ビルド後のプレビュー       |
| `npm run lint`    | ESLintによるコードチェック |
| `npm run format`  | Prettierによるコード整形   |

## 技術スタック

- React 19
- TypeScript
- Vite（rolldown-vite）
- Tailwind CSS
- React Router v7
- PWA対応

## 注意事項

- PWAとしてインストールすることで、スマートフォンのホーム画面からも起動できます。
- カメラ機能を利用する際は、ブラウザのカメラ権限を許可してください。
