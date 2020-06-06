express = require('express');
var app = express();
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
	secret: 'keyboard admin',
	resave: false,
	saveUninitialized: false
}));


app.use(express.static(__dirname + '/dist/angularredux')); 

//--------connection for mysql
var mysql = require('mysql');
var con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "",
	database :"angular_redux"
});

//--------------------------Login--------------------
app.post('/api/login',function(req,res){
	var selectq =  "select * from user_mst where s_email = '"+req.body.s_email+"'";
	con.query(selectq,function(err,result){
		if(err){
			console.log(err);
		}else{
			if(result.length > 0){
				if(validPassword(req.body.s_password,result[0].s_password)){
					res.send({error :false,msg : "Login success" ,data:result});
				}else{
					res.send({error:true , msg : "The Password  not recognised"});
				}
			}
			else{
				res.send({error:true , msg : "The Email  not recognised"});
			}
		}
	});
});

//--------Select data for datatable 
app.post('/api/select', function(req, res) {
	var col = [];
	col.push('s_name','s_email');
	console.log("search data");
	var columnData = (req.body.order != undefined && req.body.order != '') ? req.body.order[0].column : '';
	var columntype = (req.body.order != undefined && req.body.order != '') ? req.body.order[0].dir : '';
	
	var searchData = req.body.search.value;
	if(searchData.length == 0){
		var q = "select * from user_mst ORDER BY  "+ col[columnData]+" "+columntype+" limit  "+req.body.length+"  OFFSET "+req.body.start   ;
	}
	else{
		var q = "select * from user_mst where s_name like '%"+ req.body.search.value +"%' OR s_email like '%"+req.body.search.value+"%' ORDER BY  "+ col[columnData]+" "+columntype+" limit  "+req.body.length+"  OFFSET "+req.body.start;
	}
	con.query(q ,function(err,result,field){
	if(err) 
		 console.log(err);
	var qcount ="SELECT COUNT(*) as co FROM user_mst";
		con.query(qcount,function(err,c,field){
			var data = {"draw":0,
					"recordsTotal": searchData.length ? result.length:c[0].co ,
					"recordsFiltered": c[0].co,
					"data" :result};
			res.json(data);
		});	
	});
});

//----select all data
app.get('/api/select', function(req, res) {
	var q = "select * from stud " ;
	con.query(q ,function(err,result,field){
		if(err) 
			 console.log(err);
		else
		 res.json(result);
	});	
});

//---------------Insert API For other Project 
app.post('/api/insert', function(req, res) {
	username = req.body.s_name;
	email= req.body.s_email;
	password = req.body.s_password;
	gen = req.body.s_gender;
	var sqlemailcheck = "select * from user_mst where s_email = '"+req.body.s_email+"'";
	if(req.body.mode == "Save"){
		con.query(sqlemailcheck,function(erremail,infoemail) {
			if(erremail){
				res.send({data:"Not insert",error : true});
			}else{
				if(infoemail.length > 0){
					res.send({data:"Email alrady exist.",error : true});
				}else{
					var sqlinsert = "insert into user_mst (s_name,s_email,s_password) values('"+username+"', '"+email+"', '"+generateHash(password)+"' ) ";
					con.query(sqlinsert,function(err,info){
						if (err) {
							res.send({data:"Not insert",error : true});
						}else{
							res.send({data:"Record has been Inserted..!!",error : false});
						}
					});
				}
			}
		})
	}else{
		con.query(sqlemailcheck,function(erremail,infoemail) {
			if(erremail){
				res.send({data:"Not insert",error : true});
			}else{
				if(infoemail.length > 0){
					if(infoemail[0].s_id == req.body.s_id){
						id = req.body.s_id;
						var sqlupdate = "update user_mst set s_name= '"+username+"' , s_email = '"+email+"' , s_password = '"+password+"'  where s_id =  "+id;
						con.query(sqlupdate,function(err,info){
							if (err) {
								res.send({data:"Not update",error : false});
							}
							else{
							    res.send({data:"Record has been Updated..!!",error : false});
							}
						});
					}else{
						res.send({data:"Email alrady exist.",error : true});
					}
				}else{
					id = req.body.s_id;
					var sqlupdate = "update user_mst set s_name= '"+username+"' , s_email = '"+email+"' , s_password = '"+password+"'  where s_id =  "+id;
					con.query(sqlupdate,function(err,info){
						if (err) {
							res.send({data:"Not update",error : false});
						}
						else{
						    res.send({data:"Record has been Updated..!!",error : false});
						}
					});
				}
			}
		})
		
	};   
});

//-------delete 
app.post('/api/delete',function(req,res){
 		var id =req.body.s_id;
		var sqldelete = "delete from user_mst  where s_id =  "+id;
		con.query(sqldelete,function(err,info){
		if (err){
			res.send({error : true ,err : err});
		}else{
			res.send({data:"Record has been Delete..!!" , error : false});
		}
	});
});

//--------------search
app.post('/api/oneuser',function(req,res){
	var id = req.body.s_id;
	var likeq = "select * from user_mst  where s_id =  "+id;;
	con.query(likeq,function(err,result,field){
		if (err){
			res.send({error : true});
		}
		else{
			res.send({error : false ,data : result});
		}
		
	});
});

//====function for password encrypt
function generateHash(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
//====function for password check
function validPassword(password,passwordDB) {
	return bcrypt.compareSync(password, passwordDB);
};

app.listen('1437', function(){
	console.log('Example App Listening on port 1437');
});
