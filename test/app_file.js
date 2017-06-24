

var express=require('express');
var bodyParser=require('body-parser');
var fs=require('fs');
var app=express();

app.use(bodyParser.urlencoded({encoded:false}));
app.set('views','./views_file');
app.set('view engine','jade');

app.get('/topic/new',function(req,res){ //new.jade의 html을 띄어줄 것이다.
	res.render('new');
});
app.post('/topic',function(req,res){//아마 topic에는 title과 description의 입력하는 곳이 있을 것임
	var title=req.body.title;
	var description=req.body.description;
	fs.writeFile('./data/'+title, decription, 'utf-8',function(err){ //파일 작성 title=파일명 description=안에 내용
		res.redirect('/topic');
	});
});

app.get('/topic', function(req,res){//만약 get방식이면 readdir? 를 해줘라
	fs.readdir('data',function(err,files){
		res.render('index',{topics:files});
	});
});

app.get('/topic/:title',function(req,res){//query string 값을 받으면 readdir을 해서 data 폴더안에 req.params.title 파일을  읽어라.
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