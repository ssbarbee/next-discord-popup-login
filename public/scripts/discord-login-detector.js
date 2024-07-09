console.log('hi from discord-login-detector');
window.addEventListener('message', (event) => {
  console.log('code detected', new URLSearchParams(window.location.search).get('code'));
  event.source.postMessage(
    {
      code: new URLSearchParams(window.location.search).get('code'),
    },
    event.origin,
  );
});
