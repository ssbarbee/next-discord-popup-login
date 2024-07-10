import Head from 'next/head';
import { useState } from 'react';

const clientId = process.env.DISCORD_CLIENT_ID;
const redirectUrlToken = 'http://localhost:3000/discord-token';
const redirectUrlCode = 'http://localhost:3000/discord-code';
const scopes = 'identify';
const Home = () => {
    const [discordCode, setDiscordCode] = useState('');
    const [discordToken, setDiscordToken] = useState('');
    const [discordError, setDiscordError] = useState('');
    const loginToGetCode = () => {
        const params =
            'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=700,height=800,left=50%,top=50%';

        const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrlCode}&scope=${scopes}`;

        const popup = window.open(url, 'Discord Auth', params);

        const interval = window.setInterval(() => {
            popup!.postMessage('', '*'); // Replace * with your origin
        }, 500);

        window.addEventListener(
            'message',
            (event) => {
                if (event.data.code) {
                    window.clearInterval(interval);
                    popup!.close();

                    setDiscordCode(event.data.code);
                    setDiscordToken('');
                    setDiscordError('');
                }
                if (event.data.error) {
                    window.clearInterval(interval);
                    popup!.close();

                    setDiscordCode('');
                    setDiscordToken('');
                    setDiscordError(event.data.error);
                }
            },
            false,
        );
    };

    const loginToGetToken = () => {
        const params =
            'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=700,height=800,left=50%,top=50%';

        const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUrlToken}&scope=${scopes}`;

        const popup = window.open(url, 'Discord Auth', params);

        const interval = window.setInterval(() => {
            popup!.postMessage('', '*'); // Replace * with your origin
        }, 500);

        window.addEventListener(
            'message',
            (event) => {
                if (event.data.token) {
                    window.clearInterval(interval);
                    popup!.close();

                    setDiscordToken(event.data.token);
                    setDiscordCode('');
                    setDiscordError('');
                }
                if (event.data.error) {
                    window.clearInterval(interval);
                    popup!.close();

                    setDiscordToken('');
                    setDiscordCode('');
                    setDiscordError(event.data.error);
                }
            },
            false,
        );
    };

    let buttonStyle = { marginBottom: 8,borderRadius: 4, padding: 16, width: '100%', backgroundColor: 'white', color: 'black', fontSize: '1.5rem' };
    return (
        <>
            <Head>
                <title>Discord Popup Login</title>
            </Head>
            <div style={{ width: 500, margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {!discordCode && !discordToken && <button style={buttonStyle} onClick={loginToGetCode}>Login with Discord to get Code</button>}
                {!discordToken && !discordCode && <button style={buttonStyle} onClick={loginToGetToken}>Login with Discord to get Token</button>}
                {(discordCode || discordToken) && <button style={buttonStyle} onClick={() => {
                    setDiscordCode('');
                    setDiscordToken('');
                    setDiscordError('');
                }}>Logout</button>}
                {discordCode && <p style={{ marginTop: 4,fontSize: '1rem', color: 'white' }}>Discord Code: {discordCode}</p>}
                {discordToken && <p style={{ marginTop: 4,fontSize: '1rem', color: 'white' }}>Discord Token: {discordToken}</p>}
                {discordError && <p style={{ marginTop: 4,fontSize: '2rem', color: 'red' }}>Discord Error: {discordError}</p>}
            </div>
        </>
    );
};

export default Home;
