// DEPENDENCIES AND VARIABLES
// ===============================================
const Sequelize = require("sequelize");


// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {


  // TABLE COLUMNS
  // ===============================================
  const item = sequelize.define("item", {


    // TABLE COLUMNS
    // ===============================================
    classId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    inventory: DataTypes.STRING,
    description: DataTypes.STRING,
    instructor: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
  },


    // TABLE NAME
    // ===============================================
    {
      tableName: "class"
    })


  // ASSOCIATIONS
  // ===============================================
  item.associate = (models) => {
    item.belongsToMany(models.cart, { through: "cartItems", onDelete: 'cascade' })
    item.belongsToMany(models.user, { through: 'userClassTable', onDelete: 'cascade' })
  };


  // RETURN
  // ===============================================
  return item;
}