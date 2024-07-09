import { Button } from 'brokoli-ui';
import Head from 'next/head';
import { useState } from 'react';

const clientId = process.env.DISCORD_CLIENT_ID;
const redirectUrl = 'http://localhost:3000/discord';
const scopes = 'identify';
const Home = () => {
    const [discordToken, setDiscordToken] = useState('');
    const login = () => {
        const params =
            'scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=700,height=800,left=50%,top=50%';

        const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUrl}&scope=${scopes}`;

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

                    setDiscordToken(event.data.code);
                }
            },
            false,
        );
    };

    let buttonStyle = { borderRadius: 4, padding: 16, width: '100%', backgroundColor: 'white', color: 'black', fontSize: '1.5rem' };
    return (
        <>
            <Head>
                <title>Discord Popup Login</title>
            </Head>
            <div style={{ width: 500, margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                {!discordToken && <button style={buttonStyle} onClick={login}>Login with Discord</button>}
                {discordToken && <button style={buttonStyle} onClick={() => setDiscordToken('')}>Logout</button>}
                {discordToken && <p style={{ marginTop: 4,fontSize: '1rem', color: 'white' }}>Discord Token: {discordToken}</p>}
            </div>
        </>
    );
};

export default Home;
