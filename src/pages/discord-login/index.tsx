import Head from 'next/head';
import Script from 'next/script';

const DiscordLogin = () => {
  return (
    <>
      <Head>
        <title>Discord Login</title>
      </Head>
      Loading...
      <Script src="/scripts/discord-login-token-detector.js" type="text/javascript"></Script>
    </>
  );
};

export default DiscordLogin;
