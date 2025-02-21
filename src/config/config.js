const config = {
  apiUrl: process.env.REACT_APP_API_URL || "http://localhost:3001",
  uploadsUrl:
    process.env.REACT_APP_UPLOADS_URL || "http://localhost:3001/uploads",
  spotify: {
    // ...existindo código do Spotify...
  },
};

export default config;
