// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {

  const cart = sequelize.define("cart", {})


  // ASSOCIATIONS
  // ===============================================
  cart.associate = (models) => {

    cart.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }});

    cart.belongsToMany(models.item, {through: "cartItems"})
  };


  // RETURN
  // ===============================================
  return cart;
}