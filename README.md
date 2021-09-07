# mail_scraping




## ./frontend
メーリングリストをスクレイピングしてWebページに表示
### 使用言語・ライブラリ
 - Node@15.6.0
 - yarn@1.22.10
 - TypeScript
 - Next.js@11
 - styled-components
 - socket.io
 - Nightmare

### 使用方法

*.env.example* を参考に *./frontend* に *.env* ファイルを作成
```bash
cd frontend
npm i
yarn dev
```
[localhost:3000](localhost:3000)
### ビルド
```bash
yarn build
yarn dev
```
## ./node

メーリングリストをスクレイピングして、csvに出力する。  
### 使用言語・ライブラリ
 - Node@v15.6.0
 - yarn@1.22.10
 - TypeScript
 - webpack@5
 - Nightmare

### 使用方法
*.env.example* を参考に *./node* に *.env* ファイルを作成
```bash
cd node
npm i
yarn build
yarn start
```
csvファイルがある場合はcsvにあるメーリングアドレスのみ取得。
csvファイルがない場合は全取得。