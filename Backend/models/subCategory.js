const Sequelize = require("sequelize");

class SubCategory extends Sequelize.Model {
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
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'sub_categories',
                sequelize,
            }
        );
    }

    static associate(models) {
        // this.myAssociations = this.hasMany(models.CategoryFilm, { foreignKey: 'category_id', as: 'Films' })
    }

}

module.exports = SubCategory;