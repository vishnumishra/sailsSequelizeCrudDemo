/**
* Mailbox.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    locationId:{
      type:Sequelize.INTEGER,
      references:{
         model:'Locations',
         key: "id"
      },
      onDelete:'cascade'
    },
    name: {
      type: Sequelize.STRING
    },
    capacity: {
      type: Sequelize.INTEGER
    },
    is_active:{
      type:Sequelize.BOOLEAN
    }
  }
};

