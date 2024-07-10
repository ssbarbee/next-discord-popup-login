window.addEventListener('message', (event) => {
    var code = new URLSearchParams(window.location.search).get('code');
    if (code) {
        event.source.postMessage(
            {
                code: code,
            },
            event.origin,
        );
    } else {
        var error =
            new URLSearchParams(window.location.search).get('error_description') ||
            new URLSearchParams(window.location.search).get('error');
        if (error) {
            event.source.postMessage(
                {
                    error: error,
                },
                event.origin,
            );
        }
    }
});
