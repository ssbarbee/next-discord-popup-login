import Head from 'next/head';
import { useState } from 'react';
import { OnSuccessCodeParams, discordLoginPopup, OnSuccessTokenParams } from 'discord-login-popup';

const clientId = process.env.DISCORD_CLIENT_ID;
const redirectUrl = 'http://localhost:3000/discord-login';

const Home = () => {
    const [discordCode, setDiscordCode] = useState('');
    const [discordToken, setDiscordToken] = useState('');
    const [discordError, setDiscordError] = useState('');
    const loginToGetCode = () => {
        if(!clientId) {
            alert('Please set the clientId');
            return;
        }
        discordLoginPopup({
            discordAppClientId: clientId,
            redirectUrl,
            scopes: 'identify',
            responseType: 'code',
            onSuccess: (data) => {
                setDiscordCode((data as OnSuccessCodeParams).code);
                setDiscordToken('');
                setDiscordError('');
            },
            onError: (data) => {
                setDiscordCode('');
                setDiscordToken('');
                setDiscordError(data.error_description);
            },
            onStart: () => {
                setDiscordCode('');
                setDiscordToken('');
                setDiscordError('');
            },
            onClose: () => {
                setDiscordCode('');
                setDiscordToken('');
                setDiscordError('');
            },
        });
    };

    const loginToGetToken = () => {
        if(!clientId) {
            alert('Please set the clientId');
            return;
        }
        discordLoginPopup({
            discordAppClientId: clientId,
            redirectUrl,
            scopes: 'identify',
            responseType: 'token',
            onSuccess: (data) => {
                setDiscordToken((data as OnSuccessTokenParams).access_token);
                setDiscordCode('');
                setDiscordError('');
            },
            onError: (data) => {
                setDiscordCode('');
                setDiscordToken('');
                setDiscordError(data.error_description);
            },
            onStart: () => {
                setDiscordCode('');
                setDiscordToken('');
                setDiscordError('');
            },
            onClose: () => {
                setDiscordCode('');
                setDiscordToken('');
                setDiscordError('');
            },
        });
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
