var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var app = express();

app.set('views',path.join(__dirname,'views'));
app.set("view engine",'jade');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));


app.get("/",function(req,res){
	res.render("index",{title:"Welcome"});
});

app.get("/about",function(req,res){
	res.render("about");
});

app.get("/contact",function(req,res){
	res.render("contact");
});


app.post("/contact/send",function(req,res){
	var transpoter = nodemailer.createTransport({
		service:"gmail",
		host: 'smtp.gmail.com',
		port: 465,
		secure: true,
		auth :{
			user:"indranshastri@gmail.com",
			pass:"timepass@5785"
		}
	});

	var mailoptions = {
		from: "indranshastri@gmail.com",
		to:"indranshastri@gmail.com",
		subject: 'Website Submission',
		text:"You have submitted following detials Name : "+req.body.name+"<br/>email : "+req.body.email+"<br/>message : "+req.body.message,
		html:"<h3>You have submitted following detials<h3> <ul><li>Name : "+req.body.name+"</li><li>email : "+req.body.email+"</li><li>message : "+req.body.message+"</li></ul>",
	}

	transpoter.sendMail(mailoptions,function(error, info){
		if(error){
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message Sent: '+info.response);
			res.redirect('/');
		}
	});

});



app.listen("3000");
console.log("Server is running on port 3000");