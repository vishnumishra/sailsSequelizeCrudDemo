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
	}
};

