const Sequelize = require("sequelize");

class ContactMessage extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
               id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
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