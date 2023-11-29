const Sequelize = require("sequelize");

class Film extends Sequelize.Model {
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
                description_arabic: DataTypes.STRING,
                description_english: DataTypes.STRING,
                reviewer_arabic: DataTypes.STRING,
                reviewer_english: DataTypes.STRING,
                film_link: DataTypes.STRING,
                series_id: DataTypes.UUID,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'films',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.belongsTo(models.Series, { foreignKey: 'series_id' });
    }

}

module.exports = Film;