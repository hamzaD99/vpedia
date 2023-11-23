const Sequelize = require("sequelize");

class ContactMessage extends Sequelize.Model {
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
                phone: DataTypes.STRING,
                subject: DataTypes.STRING,
                message: DataTypes.STRING,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE
            },
            {
                tableName: 'contact_us',
                sequelize,
            }
        );
    }

    static associate(models) {

    }

}

module.exports = ContactMessage;