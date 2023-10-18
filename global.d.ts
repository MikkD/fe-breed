interface ImportMeta {
    env: {
        VITE_REACT_APP_OMDB_API_KEY: string;
        // ... add any other VITE_ prefixed variables you might be using
        [key: string]: unknown;
    };
}
