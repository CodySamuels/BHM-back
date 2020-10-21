// DEPENDENCIES AND VARIABLES
// ===============================================
const Sequelize = require("sequelize");
const db = require("../models");


// MODEL
// ===============================================
module.exports = function (sequelize, DataTypes) {
    const roster = sequelize.define("roster", {


        // TABLE COLUMNS
        // ===============================================
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },

        itemId: {
            type: DataTypes.UUID,
            references: db.item,
            key: 'id'
        },
    },


        // TABLE NAME
        // ===============================================
        {
            tableName: "roster"
        })


    // ASSOCIATIONS
    // ===============================================
    roster.associate = (models) => {
        roster.belongsTo(models.item, { onDelete: 'cascade' });
        roster.belongsToMany(models.user, { through: 'roster_content', onDelete: 'cascade' })
    };


    // RETURN
    // ===============================================
    return roster;
}