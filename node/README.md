# mail_scraping

メーリングリストをスクレイピングして、csvに出力する。  
## 使用言語・ライブラリ
 - Node@v15.6.0
 - yarn@1.22.10
 - TypeScript
 - webpack@5
 - puppeteer

## 使用方法
```bash
npm i
yarn build
yarn start
```
csvファイルがある場合はcsvにあるメーリングアドレスのみ取得。
csvファイルがない場合は全取得。