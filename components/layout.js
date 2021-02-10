import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <div className="root">
      <Head>
        <title>🔈 Pick an album</title>
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
    </div>
  );
};

export default Layout;
