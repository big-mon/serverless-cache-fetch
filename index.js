const init = {
  headers: {
    "content-type": "application/json;charset=UTF-8",
    },
}

// Workersイベント定義
addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event))
})

// リクエストを検証、結果を返却
async function handleRequest(event) {
  const url = new URL(event.request.url)
  const cacheUrl = `https://${url.hostname}${url.pathname}`

  // キャッシュの有無を確認
  const cache = caches.default
  let response = await cache.match(cacheUrl)
  if (!response) {
    // キャッシュが存在しない場合、オリジンサーバーへ問い合わせ
    const fetchUrl = 'https://www.sec.gov/files/company_tickers.json'
    response = await fetch(fetchUrl, init)

    // レスポンスを編集
    response = new Response(response.body, response)
    response.headers.append("Cache-Control", "public max-age=3600, s-maxage=3600")

    // キャッシュへ保存
    event.waitUntil(cache.put(cacheUrl, response.clone()))
  }

  const results = await gatherResponse(response)
  return new Response(results, init)
}

// レスポンスをJSON文字列へ変換
async function gatherResponse(response) {
  const { headers } = response
  const contentType = headers.get("content-type") || ""

  if (contentType.includes("application/json")) {
    return JSON.stringify(await response.json())
  }
  else {
    return await response.text()
  }
}
