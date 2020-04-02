const AUTH = {
  region: process.env.REACT_APP_AWS_REGION,
  userPool: process.env.REACT_APP_USER_POOL,
  userPoolBaseUri: process.env.REACT_APP_USER_POOL_BASE_URI,
  clientId: process.env.REACT_APP_CLIENT_ID,
  callbackUri: process.env.REACT_APP_CLIENT_URL + "/callback",
  signoutUri: process.env.REACT_APP_CLIENT_URL,
  tokenScopes: [
    "openid",
    "email",
    "profile",
    "https://cognito-demo-api.arronharden.com/hello-world.all"
  ]
};

export default AUTH;
