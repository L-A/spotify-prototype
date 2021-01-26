import Head from "next/head";

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>🔈 Pick an album</title>
      </Head>
      {children}
    </>
  );
};

export default Layout;
