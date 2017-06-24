

var express=require('express');
var bodyParser=require('body-parser');
var fs=require('fs');
var app=express();

app.use(bodyParser.urlencoded({encoded:false}));
app.set('views','./views_file');
app.set('view engine','jade');

app.get('/topic/new',function(req,res){ 
	res.render('new');
});
app.get('/topic/view',function(req,res){ 
	res.render('new');
});
app.post('/topic',function(req,res){
	var title=req.body.title;
	var description=req.body.description;
	fs.writeFile('./data/'+title, decription, 'utf-8',function(err){ 
		res.redirect('/topic');
	});
});

app.get('/topic', function(req,res){
	fs.readdir('data',function(err,files){
		res.render('index',{topics:files});
	});
});

app.get('/topic/:title',function(req,res){
	fs.readdir('data',function(err, files){
		fs.readFile('data/'+req.params.title, function(err, data){
			if(err){
				console.log(err);
				res.status(500).send('Internal Server Error');
			}
			res.render('index',{topic:files, title:req.params.title, description:data});
		});
	});
});
app.listen(3000, function(req,res){
	console.log('Listen 3000 port');
});