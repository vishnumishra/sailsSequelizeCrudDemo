/**
 * PhaseController
 *
 * @description :: Server-side logic for managing phases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var getLocationId = function(phaseId){
		var locations =[]; 
		Location.findAll({"where":{"phase_id":params}}).then(function(result){
			result = (result == null)?[]:result;
			result.forEach(function(locationId){
				locations.push(locationId)
			})
			return locations;
		}).catch(function(err){
			return [];
		})
}
module.exports = {
	create:function(req,res,next){
		try{
			var params = req.body;
			Phase.create(params).then(function(data){
				res.json({sucess:true,data:data});
			}).catch(function(err){
				res.json({sucess:false,err:err});
			})
		}catch(err){
			res.json({sucess:false,err:err});
		}
	},
	update:function(req,res,next){
		try{
			var params = req.body;
			var id = params.id;
			Phase.update(params,{"where":{"id":id},returning:true})
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
			Phase.findAll(params).then(function(result){
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
			Phase.destroy({"where":{"id":id}}).then(function(result){
				res.json({sucess:true,result:result})
			}).catch(function(err){
				res.json({sucess:false,err:err.message});
			})
		}catch(err){
			res.json({sucess:false,err:err});			
		}
	},
	getUserDetails:function(req,res,next){
		try{
			var phase = req.body.phase;
			var phaseId;
			Phase.findOne({"where":{"name":phase}}).then(function(phaseData){
				if(phaseData){
					phaseId = phaseData.id;
				}else{
					res.json({sucess:false,user:"phase name not exist"})
					return;
				}
			})
			if(phaseId){
				var userId = [];
				var locations = getLocationId(phaseId);
				UserLocation.findAll({"where":{locationId:locations}}).then(function(users){
					users.forEach(function(user){
						userId.push(user.id);
					})
					if(userId>0){
						User.findAll({"where":{"id":userId}}).then(function(userData){
							res.json({sucess:true,userData:userData})
							return;
						}).catch(function(err){
							res.json({sucess:false,err:err});
							return;				
						})
					}else{
						res.json({sucess:true,userData:[]})
						return;
					}
				}).catch(function(err){
					res.json({sucess:false,err:err});
					return;				
				})
			}else{
				res.json({sucess:false,err:err});
				return;
			}
		}catch(err){
			res.json({sucess:false,err:err});			
		}
	}
};

