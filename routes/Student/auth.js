var express = require('express'), 
	passport = require('passport'),
    LocalStrategy = require('passport-local');

var router = express.Router();
var User = require('../../models/User');
var Student = require('../../models/Student');

//PASSPORT CONFIGURATION===========
router.use(require('express-session')({
  secret: "Mogambo!",
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
	res.render("./Student/login");
})
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/student/acc",
		failureRedirect: "/student/login"
	}),(req,res)=>{

})


//register
router.get("/register",(req,res)=>{
	res.render("./Student/register");
})

router.post("/register", function(req, res){
  var newStudent = new Student({name:req.body.name, email:req.body.email, contact:req.body.contact, father:req.body.father, 
    mother:req.body.mother});
    newStudent.save(function(err){
      if (err)
      {
        console.log(err); 
      }
      else
      {
        var newUser = new User({username:req.body.username, student_id:newStudent._id});
        User.register(newUser, req.body.password, function(err, user){
            if (err)
            {
              console.log(err); 
              res.redirect("/fuckeduped"); 
            }
            else
            {
              passport.authenticate("local")(req, res, function(){
                res.redirect("/student/acc");
              });
            }
          }); 
      }
    }); 
}); 


//logout
router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/student/login");
})


router.get("/acc", isLoggedIn, isStudent,  function(req, res){
        res.render("./Student/acc");
});

function isStudent(req,res,next){
  if(req.user.student_id){
    return next();
  }
  res.redirect("/student/login");
}



//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/student/login");
}

module.exports = router;