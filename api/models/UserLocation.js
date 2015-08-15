/**
* UserLocation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {

    userId: {
      type: Sequelize.INTEGER,
      references:{
         model:'Users',
         key: "id"
      },
      onDelete:'cascade'
    },
    locationId: {
      type: Sequelize.INTEGER,
      references:{
         model:'Locations',
         key: "id"
      },
      onDelete:'cascade'
    }
  }
};

