# Fetch JSON using Cache

_Cloudflare Workers_ でキャッシュを利用しつつ外部 API へのリクエスト結果を応答するサンプルアプリケーションです。外部 API 提供先へのリクエスト回数を抑えつつ、エッジでのスクリプト実行とキャッシュ応答による UX の向上を目指しています。

[`index.js`](./index.js)を Workers としてデプロイすることで動作します。

サンプルではアメリカ証券取引委員会(SEC)が提供しているティッカー情報の JSON を返却します。利用規約により 1 秒間に 10 回までのリクエストに制限されています。詳細は[SEC のセキュリティポリシー](https://www.sec.gov/privacy.htm#security)を参照してください。

## ユースケース

以下の目的を満たすために作成しました。

- 特定の外部 API を自サービスで利用したい
- アクセスのたびに API をリクエストすることは避けたい
- API サーバーを建てるのは面倒くさいので回避したい
- サーバーレスな関数を試してみたい

## 学習時の参考資料

- [Cloudflare Workers の説明](https://developers.cloudflare.com/workers/)
- [Cloudflare Workers の Cache API の概要](https://blog.cloudflare.com/cache-api-for-cloudflare-workers-is-now-in-beta/)
- [JSON の単純な Fetch 方法](https://developers.cloudflare.com/workers/examples/fetch-json)
- [Cache API の単純な利用方法](https://developers.cloudflare.com/workers/examples/cache-api)
