/**
 * PhaseController
 *
 * @description :: Server-side logic for managing phases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var getLocationsFromPhaseId = function(phaseId,cb){
	var locations =[]; 
	Location.findAll({where:{phase_id:phaseId}}).then(function(result){
		result = (result == null)?[]:result;
		result.forEach(function(location){
			locations.push(location.id)
		})
		cb(null,locations)
		return ;
	}).catch(function(err){
		cd(err,locations)
		return;
	})
}

var getPhaseIdFromName = function(phase,cb){
	var phaseId;
	Phase.findOne({"where":{"name":phase}}).then(function(phaseData){
		phaseId = phaseData.id
		cb(null,phaseId);
	}).catch(function(err){
		cb(err,phaseId);		
	})
};

var getUserIdFromLocationId = function(locations,cb){
var users =[]; 
	UserLocation.findAll({"where":{locationId:locations}}).then(function(result){
		result = (result == null)?[]:result;
		result.forEach(function(data){
			users.push(data.userId)
		})
		cb(null,users)
		return ;
	}).catch(function(err){
		cd(err,users)
		return;
	})	
}
var getUserDetailsFromUserId = function(userId,cb){
	User.findAll({where:{id:userId},attributes:['id','firstName','lastName']}).then(function(result){
		result = (result == null)?[]:result;
		cb(null,result)
		return ;
	}).catch(function(err){
		cd(err,[])
		return;
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
			if(!phase){
				res.json({sucess:false,err:"No phase provided"})
				return;
			}
			async.waterfall([
	            function(cb) {
	                getPhaseIdFromName(phase, cb);
	            },
	            function(phaseId, cb) {
	            	if(!phaseId){
	            		res.json({sucess:true,data:[]})
	            		return;
	            	}
	            	getLocationsFromPhaseId(phaseId,cb)
	            },
	            function(locations, cb) {
	            	if((!locations) || locations.length == 0){
	            		res.json({sucess:true,data:[]})
	            		return;
	            	}
	            	getUserIdFromLocationId(locations,cb)
	            },
	            function(users, cb) {
	            	if((!users) || users.length == 0){
	            		res.json({sucess:true,data:[]})
	            		return;
	            	}
	            	getUserDetailsFromUserId(users,cb)
	            }
	        ],
            function(err, results) {
                res.json({
                    success:true,
                    userData:results
                })
            })
		}catch(err){
	        res.json({
	            success:false,
	            userData:[]
	        })
		}
	}
};

