import Head from 'next/head';
import Script from 'next/script';

const DiscordCode = () => {
  return (
    <>
      <Head>
        <title>Discord Login</title>
      </Head>
      Loading...
      <Script src="/scripts/discord-login-code-detector.js" type="text/javascript"></Script>
    </>
  );
};

export default DiscordCode;
