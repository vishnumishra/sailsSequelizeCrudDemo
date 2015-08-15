/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
getId = function(data){
	id = [];
	data.forEach(function(options){
		id.push(options.id)
	})
	return id;
}

searchUserWithLocation = function(req,res,params){
	Location.findAll(params).then(function(result){
		var locationId = getId(result);
		if(result == null){
			res.json({sucess:true,usersData:[]})
			return;
		}else{
			User.findAll({"where":{id:locationId}}).then(function(users){
				res.json({sucess:true,usersData:users})
				return;
			}).catch(function(err){
				res.json({sucess:false,err:err});
				return;				
			})
		}
	}).catch(function(err){
		res.json({sucess:false,err:err});
		return;
	})
}


module.exports = {
	create:function(req,res,next){
		try{
			var params = req.body;
			Location.create(params).then(function(data){
				res.json({sucess:true,data:data});
			}).catch(function(err){
				res.json({sucess:false,err:err.message});
			})
		}catch(err){
			res.json({sucess:false,err:err});
		}
	},
	update:function(req,res,next){
		try{
			var params = req.body;
			var id = params.id;
			Location.update(params,{"where":{"id":id},returning:true})
			.then(function(result){
				res.json({sucess:true,result:result});
			}).catch(function(err){
				res.json({sucess:false,err:err.message});
			})
		}catch(err){
			res.json({sucess:false,err:err});			
		}
	},
	find:function(req,res){
		try{
			var params = req.body;
			Location.findAll(params).then(function(result){
				result = (result == null)?[]:result;
				res.json({sucess:true,result:result})
			}).catch(function(err){
				res.json({sucess:false,err:err.message});
			})
		}catch(err){
			res.json({sucess:false,err:err});			
		}
	},
	destroy:function(req,res,next){
		try{
			var id = req.body.id;
			Location.destroy({"where":{"id":id}}).then(function(result){
				res.json({sucess:true,result:result})
			}).catch(function(err){
				res.json({sucess:false,err:err.message});
			})
		}catch(err){
			res.json({sucess:false,err:err});			
		}
	},
	getUserByLocation:function(req,res,next){
		try{
			var params = req.body;
			var options;
			var longitude = params.longitude;
			var latitude = params.latitude;
			var shortAddress = params.shortAddress
			if((typeof(longitude)=='number') && (typeof(latitude)=='number')){
				options = {"where":{"longitude":longitude,"latitude":latitude}}
			}else{
				options = {"where":{"shortAddress":shortAddress}}
			}
			searchUserWithLocation(req,res,options);
		}catch(err){
			res.json({sucess:false,err:err});	
		}
	}
};

