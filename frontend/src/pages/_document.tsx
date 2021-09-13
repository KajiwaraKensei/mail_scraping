import NextDocument, { Html, Head, Main, NextScript } from "next/document";

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head lang="ja">
          <meta charSet="utf-8" />
          <meta name="description" content="List of internal mailing lists" />
          <meta property="og:title" content="mailing list" />
          <meta name="theme-color" content="#000" />
          <meta
            property="og:description"
            content="List of internal mailing lists"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
