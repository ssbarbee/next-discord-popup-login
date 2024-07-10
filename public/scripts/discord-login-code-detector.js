console.log('hi');
window.addEventListener('message', (event) => {
    var params = new URLSearchParams(window.location.search);
    var code = params.get('code');
    console.log(code);
    if (code) {
        event.source.postMessage(
            {
                code: code,
            },
            event.origin,
        );
    } else {
        var error = params.get('error_description') || params.get('error');
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
