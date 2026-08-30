// Netlify Function: OAuth2 proxy untuk Decap CMS (login via GitHub)
// Endpoint: /.netlify/functions/auth
// Alur: Decap CMS → function ini → GitHub OAuth → redirect balik dengan token

exports.handler = async (event) => {
  const clientId = process.env.GITHUB_CLIENT_ID || '';
  const clientSecret = process.env.GITHUB_CLIENT_SECRET || '';
  const siteUrl = process.env.URL || 'https://indira-portfolio-website.netlify.app';
  const oauthUrl = 'https://github.com/login/oauth';
  const apiUrl = 'https://api.github.com';

  // ===== Parameter dari Decap CMS =====
  const params = new URLSearchParams(event.queryStringParameters || {});
  const code = params.get('code');
  const state = params.get('state') || '';

  // ===== 1. Belum ada code → mulai alur OAuth: arahkan ke GitHub =====
  if (!code) {
    const redirectUri = `${siteUrl}/.netlify/functions/auth`;
    const githubAuthUrl =
      `${oauthUrl}/authorize?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=repo` +
      `&state=${encodeURIComponent(state)}`;
    return {
      statusCode: 302,
      headers: { Location: githubAuthUrl },
    };
  }

  // ===== 2. Ada code → tukar dengan access token GitHub =====
  try {
    const tokenRes = await fetch(`${oauthUrl}/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });
    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Gagal menukar code dengan token', detail: tokenData }),
      };
    }

    // Validasi token dengan mengambil profil GitHub
    const userRes = await fetch(`${apiUrl}/user`, {
      headers: { Authorization: `token ${accessToken}` },
    });
    const user = await userRes.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: accessToken,
        provider: 'github',
        user: { name: user.login, email: user.email },
      }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
