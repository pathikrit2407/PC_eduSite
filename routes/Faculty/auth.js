const express = require('express'), 
	passport = require('passport'),
    LocalStrategy = require('passport-local');

const router = express.Router();
const User = require('../../models/User');
const Faculty = require('../../models/Faculty');

//PASSPORT CONFIGURATION===========
router.use(require('express-session')({
  secret: "ILoveTanyaRomanova!",
  resave: false,
  saveUninitialized: false
}))

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();  
});




//AUTH ROUTES===================
//login
router.get("/login",(req,res)=>{
	res.render("./Faculty/login");
})
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/faculty/acc",
		failureRedirect: "/faculty/login"
	}),(req,res)=>{

})


//register
router.get("/register",(req,res)=>{
	res.render("./Faculty/register");
})

router.post("/register",(req,res)=>{
	var newFaculty = new Faculty({name:req.body.name, email:req.body.email, contact:req.body.contact, stars : 2});
	newFaculty.save(function(err){
        if (err)
        {
        	console.log(err); 
        	return handleError(err); 
        }
        else
        {

        	var newUser = new User({username:req.body.username, faculty_id:newFaculty._id}); 
        	User.register(newUser, req.body.password, function(err, user){
        		if (err)
        		{
        			console.log(err); 
        			res.redirect("/fuckeduped"); 
        		}
        		else
        		{
        			passport.authenticate("local")(req, res, function(){
        				res.redirect("/faculty/acc");
        			});
        		}
        	}); 
        }
	});


});


//logout
router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/faculty/login");
})


router.get("/acc", isLoggedIn, isTeacher, function(req, res){
        res.render("./Faculty/acc");
});


function isTeacher(req,res,next){
  if(req.user.faculty_id){
    return next();
  }
  res.redirect("/faculty/login");
}



//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/faculty/login");
}

module.exports = router;
