import Head from 'next/head';
import Script from 'next/script';

const Discord = () => {
  return (
    <>
      <Head>
        <title>Discord Login</title>
      </Head>
      Loading...
      <Script src="/scripts/discord-login-detector.js" type="text/javascript"></Script>
    </>
  );
};

export default Discord;
