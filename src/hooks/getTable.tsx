import { useState, useEffect, useRef, useLayoutEffect } from 'react';

const useCallbackRef = (callback) => {
  const callbackRef = useRef(callback);
  useLayoutEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  return callbackRef;
};

export const useFetch = (options) => {
  const [data, setData] = useState(null);

  const savedOnSuccess = useCallbackRef(options.onSuccess);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    console.log('useFetch useEffect xxx');
    if (options.url) {
      let isCancelled = false;
      fetch(options.url, {
        headers: {
          'content-type': 'application/octet-stream',
          'X-RapidAPI-Key': 'Rd2pyVFguwJeulnqTswlZ2pJCrlurqnE',
          RapidAPI: 'api-football-v1.p.rapidapi.com',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (!isCancelled) {
            savedOnSuccess.current?.(json);
            setData(json);
          }
        });
      return () => {
        isCancelled = true;
      };
    }
  }, [options.url]);

  return {
    data,
  };
};
