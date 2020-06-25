var express =        require("express"),
      app =            express(),
      bodyParser =     require("body-parser"),
      mongoose =       require("mongoose"),
      flash =          require("connect-flash"),
      passport =       require("passport"),
      LocalStrategy =  require("passport-local"),
      expressSession = require("express-session"),
      methodOverride = require("method-override"),
      Game =           require("./models/game"),
      Comment =        require("./models/comment"),
      User =           require("./models/user"),
      seedDB =         require("./seeds");

// require all routes
var indexRoutes =   require("./routes/index"),
      gameRoutes =    require("./routes/games"),
      reviewRoutes  = require("./routes/reviews"),
      commentRoutes = require("./routes/comments");

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/gamerank", {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
app.set("view engine", "ejs"); // wihout this, need to type .ejs extension for every page
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); // allows us to use PUT method
app.use(flash());
app.locals.moment = require("moment");

// seedDB();

// PASSPORT CONFIG
app.use(expressSession({
  secret: "kelly the small dog",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// keeps track if there is a user signed in
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.errorMsg = req.flash("errorMsg");
  res.locals.successMsg = req.flash("successMsg");
  next();
});

// use required routes files
// can also do "app.use("/games", gameRoutes);" if each route begins with "/games" to auto append to each route
app.use(indexRoutes);
app.use(gameRoutes);
app.use(commentRoutes);
app.use(reviewRoutes);

app.listen(process.env.PORT || 8080, function() {
  console.log("gamerank server is running...");
});
