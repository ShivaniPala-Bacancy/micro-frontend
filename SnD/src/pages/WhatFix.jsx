import {useEffect} from 'react';

const WhatFix = (url) => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = url;
        script.async = true;
        script.lang = 'javascript';
        script.type = 'text/javascript';

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [url]);
};

export default WhatFix;
