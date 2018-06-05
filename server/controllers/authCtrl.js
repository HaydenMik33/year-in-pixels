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
    res.redirect("http://localhost:3000/#/");
  } else {
    res.status(200).json(req.user);
  }
};

const logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("http://localhost:3000/#/");
  });
};

const newIlgi = (req, res, next) => {
  console.log("Hit the post  =>/api/ilgi");
  const { title } = req.body;
  req.app
    .get("db")
    .newIlgi([title, req.user.id])
    .then(Ilgi => {
      res.status(200).send(Ilgi);
    })
    .catch(() => res.status(500).send());
};

const getIlgi = (req, res) => {
  console.log("HIT the get =>/api/ilgi");
  const { id } = req.params;
  req.app
    .get("db")
    .getIlgi([id])
    .then(Ilgi => {
      res.status(200).send(Ilgi);
    })
    .catch(err => res.status(500).send(err));
};
const deleteAll = (req, res) => {
  const { ilgi_id } = req.params;
  req.app
    .get("db")
    .deleteIlgi([ilgi_id])
    .then(response => {
      res.status(200).send(response);
    });
};
module.exports = {
  strat,
  getUser,
  logout,
  newIlgi,
  getIlgi,
  deleteAll
};
