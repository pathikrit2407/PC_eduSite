var Faculty = require('../../models/faculty'); 
var passport = require('passport');
var LocalStrategy = require('passport-local');
var express = require('express');
var router = express.Router(); 

//Configuring passport
router.use(require('express-session')({
  secret: "TRV!",
  resave: false,
  saveUninitialized: false
}))

router.use(passport.initialize());
router.use(passport.session());
passport.use(new LocalStrategy(Faculty.authenticate()));
passport.serializeUser(Faculty.serializeUser());
passport.deserializeUser(Faculty.deserializeUser());
router.use(function(req,res,next){
  res.locals.currentUser1 = req.user;
  next();  
});

router.get('/register', (req, res)=>{
	res.render('./Faculty/register');
});


router.post('/register', (req, res)=>{
	var newFaculty = new Faculty({
		username:req.body.username, 
	
	name:req.body.name, 
	contact:req.body.contact, 
	email :req.body.email, 
	stars:2, 
	}); 

	Faculty.register(newFaculty, req.body.password, function(err, user){
		if (err)
		{
			console.log(err); 
			res.render('./Faculty/register');
		}
		else
		{
			passport.authenticate("local")(req, res, function(){
				res.redirect('/faculty/acc'); 
			});
		}
	}); 

}); 

router.get("/login",(req,res)=>{
	res.render("./Faculty/login");
});
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/faculty/acc",
		failureRedirect: "/faculty/login"
	}),(req,res)=>{

});

router.get("/acc", function(req, res){
	res.render('./Faculty/acc', { name:req.user.name });
});


router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/faculty/login");
})



module.exports = router; 
