var express=require('express');
var app=express();
var fs=require('fs');
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({encoded:false}));


app.locals.pretty=true;
app.set('views','./views_file');
app.set('view engine','jade');


app.get(['/topic','/topic/:title'], function(req,res){
	var title=req.params.title;
	fs.readdir('data',function(err, files){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error 1 ');
		}
		if(title=='new'){
			res.render('new',{topics:files});
		}else if(title){
			fs.readFile('data/'+title,'utf-8',function(err,data){
				if(err){
					console.log(err);
					res.status(500).send("Internal Server Error 2");
				}
				res.render('view',{topics:files,title:title,data:data});
			});
		}else{
			res.render('view',{topics:files,title:'I \'m Larry',data:'HELLO THERE'});
		}	
	});
});



app.post('/topic',function(req,res){
	var title=req.body.title;
	var description=req.body.description;
	fs.writeFile('data/'+title,description,function(err){
		if(err){
			console.log(err);
			res.status(500).send('Internal Server Error');
		}
		res.redirect('/topic/'+title);
	});
});

app.listen(3000,function(){
	console.log('3000 port connected');
});