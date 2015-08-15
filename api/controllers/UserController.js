/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var insertOnUserLocations = function(locations,userId){
	locations.forEach(function(location){
		var params = {"locationId":location,"userId":userId}
		UserLocation.create(params).then(function(data){
		}).catch(function(err){
			console.log(err)
		})
	})
};

module.exports = {
	create:function(req,res,next){
		var params = req.body;
		var locations = params.locations;

		User.create(params).then(function(data){
			try{
				console.log(locations.length > 0)
				if(locations.length > 0){
 				   insertOnUserLocations(locations,data.id);
				   res.json({sucess:true,data:data});
					return;
				}
			}catch(err){
				res.json({sucess:true,data:data,msg:"fk_voilation in location table but user is created"});
				return;
			}
			res.json({sucess:true,data:data});
		}).catch(function(err){
			res.json({sucess:false,err:err});
		})
	},
	// ,
	// update:function(req,res,next){
	// 	var params = req.body;

	// 	User.update(params,{"where":{"id":req.body.id}})
	// 	.then(function(result){
	// 		res.json({sucess:true,data:result});
	// 	}).catch(function(err){
	// 		res.json({sucess:false,err:err});
	// 	})
	// },
	find:function(req,res){
		var params = req.body;
		User.findAll(params).then(function(result){
			result = (result == null)?[]:result;
			res.json({sucess:true,result:result})
		}).catch(function(err){
			res.json({sucess:false,err:err});
		})
	},
	destroy:function(req,res,next){
		try{
			var id = req.body.id;
			User.destroy({"where":{"id":id}}).then(function(result){
				res.json({sucess:true,result:result})
			}).catch(function(err){
				res.json({sucess:false,err:err.message});
			})
		}catch(err){
			res.json({sucess:false,err:err});			
		}
	}
};

