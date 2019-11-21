//middlewere that restricts user access
module.exports = function(req, res, next) {
  //if there is a user allow them to acces w.e route they are heading
  if (req.user || req.session.user) {
    return next();
  }
  //if there no is a user logged in redirect
  return res.redirect("user/login");
};
