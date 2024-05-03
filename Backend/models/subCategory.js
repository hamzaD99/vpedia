const Sequelize = require("sequelize");

class SubCategory extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
               ID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
                name_arabic: DataTypes.STRING,
                name_english: DataTypes.STRING,
                category_id: DataTypes.UUID,
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
        this.myAssociations = this.hasMany(models.SubCategoryFilm, { foreignKey: 'subcategory_id', as: 'Films' })
    }

}

module.exports = SubCategory;