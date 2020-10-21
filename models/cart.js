// DEPENDENCIES AND VARIABLES
// ===============================================
const Sequelize = require("sequelize");
const db = require("../models");


// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {
  const cart = sequelize.define("cart", {


    // TABLE COLUMNS
    // ===============================================
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    userId: {
      type: DataTypes.UUID,
      references: db.user,
      key: 'id'
    },
  },


    // TABLE NAME
    // ===============================================
    {
      tableName: "cart"
    })


  // ASSOCIATIONS
  // ===============================================
  cart.associate = (models) => {
    cart.belongsTo(models.user, { onDelete: 'cascade' });
    cart.belongsToMany(models.item, { through: 'cart_content', onDelete: 'cascade' })
  };


  // RETURN
  // ===============================================
  return cart;
}