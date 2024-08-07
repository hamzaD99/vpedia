const Sequelize = require("sequelize");

class User extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                UUID: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                name: DataTypes.STRING,
                email: DataTypes.STRING,
                userName: DataTypes.STRING,
                password: DataTypes.STRING,
                institutionId: DataTypes.UUID,
                roleId: DataTypes.INTEGER,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE
            },
            {
                tableName: 'users',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.hasMany(models.SubscribedUser, { foreignKey: 'user_id', as: 'Subscriptions' });
        this.myAssociations = this.belongsTo(models.Institution, { foreignKey: 'institutionId', as: 'Institution' });
    }

}

module.exports = User;