/**
* Location.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	phase_id:{
  		type:Sequelize.INTEGER,
        references:{
	        model:'Phases',
	        key: "id"
	    },
      onDelete:'cascade'
  	},
    shortAddress: {
      type:Sequelize.STRING
    },
    latitude: {
      type: Sequelize.DOUBLE
    },
    longitude:{
    	type:Sequelize.DOUBLE
    }
  },
  associate: function() {
    Locations.belongsToMany(Users, {through: 'UserLocation'});
  }
};

