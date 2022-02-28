module.exports = function (req, res, next) {
  const { firstname, lastname, username, password, email } = req.body;

  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (![firstname, lastname, username, password, email].every(Boolean)) {
      return res.status(401).send("Elements manquants");
    } else if (!validEmail(email)) {
      return res.status(401).send("Email invalide");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).send("Elements manquants");
    } else if (!validEmail(email)) {
      return res.status(401).send("Email invalide");
    }
  }

  next();
};
