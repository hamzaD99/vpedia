const Sequelize = require("sequelize");

class Institution extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                UUID: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                name_arabic: DataTypes.STRING,
                name_english: DataTypes.STRING,
                issuer: DataTypes.STRING,
                entryPoint: DataTypes.STRING,
                cert: DataTypes.TEXT,
                logoutUrl: DataTypes.STRING,
                callbackUrl: DataTypes.STRING,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'institutions',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.hasMany(models.User, { foreignKey: 'institutionId', as: 'Users' });
    }

}

module.exports = Institution;