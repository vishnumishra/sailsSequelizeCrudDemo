/**
 * LocationController
 *
 * @description :: Server-side logic for managing locations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

searchUserWithLocation = function(options){
	Location.findAll(params).then(function(result){
		result = (result == null)?[]:result;
		return result;
	}).catch(function(err){
		return [];
	})
}

getId = function(data){
	id = [];
	data.forEach(function(options){
		id.push(options.id)
	})
	return id;
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
			var longitude = params.longitude;
			var latitude = params.latitude;
			var shortAddress = params.shortAddress
			if((typeof(longitude)=='number') && (typeof(latitude)=='number')){

				params = {"where":{"longitude":longitude,"latitude":latitude}}
				
				Location.findAll(params).then(function(result){
					var locationId = getId(result);
					console.log(locationId)
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
			}else{
				params = {"where":{"shortAddress":shortAddress}}
				
				Location.findAll(params).then(function(result){
					var locationId = getId(result);
					if(result == null){
						res.json({sucess:true,usersData:[]})
						return;
					}else{
						User.findAll({"where":{id:locationId}}).then(function(users){
							res.json({sucess:true,usersData:users})
						}).catch(function(err){
							res.json({sucess:false,err:err});
							return;				
						})
					}
				}).catch(function(err){
					res.json({sucess:false,err:err});					
				})
			}
		}catch(err){
			res.json({sucess:false,err:err});	
		}
	}
};

