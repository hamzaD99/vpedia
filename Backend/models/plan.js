const Sequelize = require("sequelize");

class Plan extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
               id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name_arabic: DataTypes.STRING,
                name_english: DataTypes.STRING,
                description_arabic: DataTypes.STRING,
                description_english: DataTypes.STRING,
                period: DataTypes.INTEGER,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'plans',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.hasMany(models.SubscribedUser, { foreignKey: 'plan_id', as: 'Subscriptions' });
    }

}

module.exports = Plan;