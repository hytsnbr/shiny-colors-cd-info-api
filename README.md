# shiny-colors-cd-info-api

![deno deploy](https://img.shields.io/badge/deno-deploy-green?logo|deno)

## 概要

アイドルマスターシャイニーカラーズのCD情報をまとめたAPI\
個人的に配信サイトと販売ショップを手軽に調べたかったので作成

## エンドポイント

[`https://shiny-colors-cd-info-api.deno.dev/list`](https://shiny-colors-cd-info-api.deno.dev/list)

## クエリパラメータ

以下のクエリパラメータを指定すると合致したデータのみが返却される

| クエリパラメータ名 | データ型 | 値例                 | 内容                                   |
| ------------------ | -------- | -------------------- | -------------------------------------- |
| releaseDateStart   | date     | 2018-01-01           | リリース日（範囲開始日）               |
| releaseDateEnd     | date     | 2018-06-30           | リリース日（範囲終了日）               |
| recordNumber       | string   | LACM-14781           | 品番                                   |
| recordNumbers      | string   | LACA-9946, LACA-9947 | 品番（複数個、カンマ区切り）           |
| limited            | boolean  | true                 | 限定販売か                             |
| title              | string   | CANVAS               | CDタイトル                             |
| series             | string   | BRILLI@NT WING       | CDシリーズ名                           |
| storeName          | string   | Spotify              | 販売ストア名（ダウンロード、店頭販売） |
| isHiRes            | boolean  | true                 | ハイレゾ対応のストアか                 |

## レスポンス（例）

<details>
<summary>長いので格納</summary>

```json
[
  {
    "title": "THE IDOLM@STER SHINY COLORS BRILLI@NT WING 01 Spread the Wings!!",
    "recordNumbers": [
      "LACM-14781"
    ],
    "releaseDate": "2018-06-06",
    "jacketUrl": "https://shinycolors.lantis.jp/X9pa5jNY/wp-content/uploads/2021/12/jk_LACM-14781.jpg",
    "limited": false,
    "series": "BRILLI@NT WING",
    "artist": "シャイニーカラーズ",
    "downloadSiteList": [
      {
        "name": "Apple Music",
        "url": "https://music.apple.com/jp/album/1675421830?ls=1&at=1l3vpUI&app=music&ct=LFV_0c29fbc1e3467f1597479e2cff6a1407&itscg=30440&itsct=catchall_p1&lId=28120685&cId=none&sr=1&src=Linkfire",
        "isHiRes": false
      },
      {
        "name": "Amazon Music",
        "url": "http://music.amazon.co.jp/albums/B0BXBC351C?tag=linkfiregen&ie=UTF8&linkCode=as2&ascsubtag=0c29fbc1e3467f1597479e2cff6a1407&ref=dmm_acq_soc_us_u_lfire_lp_x_0c29fbc1e3467f1597479e2cff6a1407",
        "isHiRes": false
      },
      {
        "name": "Spotify",
        "url": "http://open.spotify.com/album/2klsGa0KCtEePa04pjbV7r",
        "isHiRes": false
      },
      {
        "name": "Youtube Music",
        "url": "https://music.youtube.com/playlist?list=OLAK5uy_ndbJovdHI7DKReNUOZ93XDSE8J-8i_yzY&src=Linkfire&lId=d58a7737-70e1-4f34-a4f6-99884ba2dbd3&cId=d3d58fd7-4c47-11e6-9fd0-066c3e7a8751",
        "isHiRes": false
      },
      {
        "name": "LINE MUSIC",
        "url": "https://music.line.me/launch?target=album&item=mb0000000002c53072&cc=JP&v=1",
        "isHiRes": false
      },
      {
        "name": "AWA",
        "url": "https://s.awa.fm/album/ccce421852d497660c33?t=1678021204&lf=0c29fbc1e3467f1597479e2cff6a1407",
        "isHiRes": false
      },
      {
        "name": "TOWER RECORDS MUSIC",
        "url": "https://music.tower.jp/album/detail/1025487441",
        "isHiRes": false
      },
      {
        "name": "iTunes",
        "url": "https://music.apple.com/jp/album/1675421830?ls=1&at=1l3vpUI&app=music&ct=LFV_0c29fbc1e3467f1597479e2cff6a1407&itscg=30440&itsct=catchall_p8&lId=28120685&cId=none&sr=8&src=Linkfire",
        "isHiRes": false
      },
      {
        "name": "mora",
        "url": "https://mora.jp/package/43000008/195533010999/",
        "isHiRes": false
      },
      {
        "name": "レコチョク",
        "url": "https://recochoku.jp/album/A1025487441",
        "isHiRes": false
      },
      {
        "name": "animelo mix",
        "url": "https://r.animelo.jp/?id=uaP6iPRi",
        "isHiRes": false
      },
      {
        "name": "e-onkyo music",
        "url": "https://www.e-onkyo.com/music/album/lzc2294/?lf=0c29fbc1e3467f1597479e2cff6a1407",
        "isHiRes": true
      },
      {
        "name": "mora",
        "url": "https://mora.jp/package/43000152/LZC-2294_HI-24_96/",
        "isHiRes": true
      }
    ],
    "purchaseSiteList": [
      {
        "name": "A-on STORE",
        "url": "https://a-onstore.jp/item/item-1000205029/",
        "isHiRes": false
      },
      {
        "name": "A-on STORE Powered by A!SMART",
        "url": "https://www.asmart.jp/Form/Product/ProductDetail.aspx?shop=0&cat=600624200&swrd=&pid=10018140&vid=",
        "isHiRes": false
      },
      {
        "name": "animate",
        "url": "https://www.animate-onlineshop.jp/pn/%E3%80%90%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E3%82%BD%E3%83%B3%E3%82%B0%E3%80%91THE+IDOLM%40STER+SHINY+COLORS+BRILLI%40NT+WING+01+Spread+the+Wings%21%21/pd/1514168/",
        "isHiRes": false
      },
      {
        "name": "Amazon CD",
        "url": "https://www.amazon.co.jp/%E3%82%B2%E3%83%BC%E3%83%A0%E3%80%8E%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC-%E3%82%B7%E3%83%A3%E3%82%A4%E3%83%8B%E3%83%BC%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%BA%E3%80%8FBRILLI-WING-01%E3%80%8CSpread-Wings/dp/B07BBT25VM/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dchild=1&keywords=LACM-14781&qid=1617680258&sr=8-1&tag=linkfiregen&ie=UTF8&linkCode=as2&ascsubtag=30de2342f6c76c55040e9045a2e33f0f&ref=dmm_acq_soc_us_u_lfire_lp_x_30de2342f6c76c55040e9045a2e33f0f",
        "isHiRes": false
      },
      {
        "name": "GAMERS",
        "url": "https://www.gamers.co.jp/pn/%E3%80%90%E3%82%AD%E3%83%A3%E3%83%A9%E3%82%AF%E3%82%BF%E3%83%BC%E3%82%BD%E3%83%B3%E3%82%B0%E3%80%91%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC+%E3%82%B7%E3%83%A3%E3%82%A4%E3%83%8B%E3%83%BC%E3%82%AB%E3%83%A9%E3%83%BC%E3%82%BA+BRILLI%40NT+WING+01+Spread+the+Wings%21%21/pd/10394980/",
        "isHiRes": false
      },
      {
        "name": "セブンネットショッピング",
        "url": "https://7net.omni7.jp/detail/1301387446",
        "isHiRes": false
      },
      {
        "name": "TOWER RECORDS ONLINE",
        "url": "https://tower.jp/item/4699471/THE-IDOLM@STER-SHINY-COLORS-BRILLI@NT-WING-01-Spread-the-Wings!!",
        "isHiRes": false
      },
      {
        "name": "TSUTAYA オンラインショッピング",
        "url": "https://shop.tsutaya.co.jp/cd/product/4540774147816/",
        "isHiRes": false
      },
      {
        "name": "とらのあな",
        "url": "https://ecs.toranoana.jp/tora/ec/item/210006589253/",
        "isHiRes": false
      },
      {
        "name": "Rakuten ブックス",
        "url": "https://books.rakuten.co.jp/rb/15392403/?l-id=search-c-item-text-01",
        "isHiRes": false
      }
    ]
  }
]
```

</details>
