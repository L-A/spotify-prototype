import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="root">
      <Head>
        <title>Browse your albums</title>
        <meta
          name="description"
          content="A simple app to browse your Spotify albums like you would browse a record crate."
        />
        <link rel="icon" href="/favicon.png" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://albums.lal.fyi/" />
        <meta property="og:title" content="Browse your albums" />
        <meta
          property="og:description"
          content="Browse your Spotify albums like you would browse a record crate."
        />
        <meta
          property="og:image"
          content="https://albums.lal.fyi/social-share-image.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://albums.lal.fyi/" />
        <meta property="twitter:title" content="Browse your albums" />
        <meta
          property="twitter:description"
          content="Browse your Spotify albums like you would browse a record crate."
        />
        <meta
          property="twitter:image"
          content="https://albums.lal.fyi/social-share-image.png"
        />
      </Head>
      {children}
      <style jsx>
        {`
          :global(html) {
            background-color: #252525;
            background: radial-gradient(#252525, #000);
            color: #ddd;
          }

          :global(body, html, #__next) {
            height: 100%;
            margin: 0;
            padding: 0;
          }

          :global(a) {
            color: inherit;
          }

          .root {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-family: sans-serif;
            height: 100%;
          }
        `}
      </style>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          window.goatcounter = {
            referrer: function () {
              return null;
            },
            path: function () {
              return "albums.lal.fyi";
            },
          };
        `,
        }}
      />
      <script
        data-goatcounter="https://lal.goatcounter.com/count"
        async
        src="https://gc.zgo.at/count.js"
      ></script>
    </div>
  );
};

export default Layout;
