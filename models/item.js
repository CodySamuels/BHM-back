// DEPENDENCIES AND VARIABLES
// ===============================================
const Sequelize = require("sequelize");
const db = require("../models/");


// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {
  const item = sequelize.define("item", {


    // TABLE COLUMNS
    // ===============================================
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    adminId: {
      type: DataTypes.UUID,
      references: db.user,
      key: 'id'
    },

    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    inventory: DataTypes.STRING,
    description: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    time: DataTypes.STRING,
    gradeRange: DataTypes.STRING
  },


    // TABLE NAME
    // ===============================================
    {
      tableName: "class"
    })


  // ASSOCIATIONS
  // ===============================================
  item.associate = (models) => {
    // item.hasOne(models.roster, { onDelete: 'cascade' });
    item.belongsToMany(models.cart, { through: 'cart_content', onDelete: 'cascade' })
    item.belongsToMany(models.user, { through: 'roster', onDelete: 'cascade' })
  };


  // RETURN
  // ===============================================
  return item;
}