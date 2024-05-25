const Sequelize = require("sequelize");

class UserSeries extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
               id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
                user_id: DataTypes.UUID,
                series_id: DataTypes.UUID,
                expiredAt: DataTypes.DATE,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'user_series',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.belongsTo(models.Series, { foreignKey: 'series_id', as: 'Series' })
        this.myAssociations = this.belongsTo(models.User, { foreignKey: 'user_id', as: 'User' })
    }

}

module.exports = UserSeries;