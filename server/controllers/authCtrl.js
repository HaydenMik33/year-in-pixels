const Auth0Strategy = require("passport-auth0");

const { AUTH_CLIENT_ID, AUTH_CLIENT_SECRET, AUTH_DOMAIN } = process.env;

const strat = new Auth0Strategy(
  {
    clientID: AUTH_CLIENT_ID,
    clientSecret: AUTH_CLIENT_SECRET,
    domain: AUTH_DOMAIN,
    scope: "openid profile",
    callbackURL: "/auth"
  },
  function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

const getUser = (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Not Authorized" });
  } else {
    res.status(200).json(req.user);
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/");
  });
};

module.exports = {
  strat,
  getUser,
  logout
};
