const Sequelize = require("sequelize");

class SubscribedUser extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
               id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                user_id: DataTypes.UUID,
                plan_id: DataTypes.INTEGER,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
                expiredAt: DataTypes.DATE
            },
            {
                tableName: 'subscribed_users',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' });
        this.myAssociations = this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'Plan' });
    }

}

module.exports = SubscribedUser;