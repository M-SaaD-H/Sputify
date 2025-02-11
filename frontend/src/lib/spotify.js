import axios from "axios";

const getAccessToken = async () => {
  const accessTokenResponse = await axios.post('https://accounts.spotify.com/api/token',
    new URLSearchParams({
      'grant_type': 'client_credentials',
      'client_id': import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      'client_secret': import.meta.env.VITE_SPOTIFY_CLIENT_SECRET
    }),
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    }
  );

  const { access_token } = accessTokenResponse.data;

  return access_token;
}

const accessToken = await getAccessToken();

const spotifyApi = axios.create({
  baseURL: 'https://api.spotify.com/v1',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

export { spotifyApi }