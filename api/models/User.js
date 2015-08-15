/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING
    },
    phone:{
    	type:Sequelize.STRING
    }
  },
  associate: function() {
    User.belongsToMany(Locations, {through: 'UserLocation'})
  }
};