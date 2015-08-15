/**
 * MailboxController
 *
 * @description :: Server-side logic for managing mailboxes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var getPhaseIdFromLocationId = function(locationsId,cb){
	var phases =[]; 
	Location.findAll({where:{id:locationsId}}).then(function(result){
		result = (result == null)?[]:result;
		result.forEach(function(location){
			phases.push(location.phase_id)
		})
		cb(null,phases)
		return ;
	}).catch(function(err){
		cd(err,phases)
		return;
	})
}

var getPhaseFromPhaseId = function(phaseId,cb){
	console.log("phaseid"+phaseId)
	Phase.findAll({where:{id:phaseId},attributes:['name']}).then(function(result){
		result = (result == null)?[]:result;
		cb(null,result)
		return ;
	}).catch(function(err){
		cd(err,[])
		return;
	})	
}

var getLocationIdFromMailboxName = function(mailbox,cb){
	var mailboxId=[];
	Mailbox.findAll({"where":{"name":mailbox}}).then(function(mailboxData){
		mailboxData = (mailboxData == null || mailboxData.is_active == false)?[]:mailboxData;
		mailboxData.forEach(function(data){
			mailboxId.push(data.locationId)
		})
		cb(null,mailboxId)
		return ;
	}).catch(function(err){
		cb(err,mailboxId);		
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
			Mailbox.create(params).then(function(data){
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
			Mailbox.update(params,{"where":{"id":id},returning:true})
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
			Mailbox.findAll(params).then(function(result){
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
			Mailbox.destroy({"where":{"id":id}}).then(function(result){
				res.json({sucess:true,result:result})
			}).catch(function(err){
				res.json({sucess:false,err:err.message});
			})
		}catch(err){
			res.json({sucess:false,err:err});			
		}
	},
	getUserFromMailBox:function(req,res,next){
		try{
			var mailbox = req.body.mailbox;
			var data = {};
			if(!mailbox){
				res.json({sucess:false,err:"No mailbox provided"})
				return;
			}
			var userDetails = [];
			async.waterfall([
	            function(cb) {
	                getLocationIdFromMailboxName(mailbox, cb);
	            },
	            function(locations, cb) {
	            	data["locations"] = locations
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
	            },
	            function(users,cb){
	            	userDetails = users;
	            	getPhaseIdFromLocationId(data["locations"],cb)
	            },
	            function(phases,cb){
	            	getPhaseFromPhaseId(phases,cb)
	            }
	        ],
            function(err, results) {
                res.json({
                    success:true,
                    userData:{phases:results,userDetails:userDetails}
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

