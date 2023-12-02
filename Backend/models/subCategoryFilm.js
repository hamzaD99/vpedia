const Sequelize = require("sequelize");

class SubCategoryFilm extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                UUID: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                film_id: DataTypes.UUID,
                subcategory_id: DataTypes.UUID,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'sub_categories_films',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.belongsTo(models.Film, { foreignKey: 'film_id', as: 'Film' })
        this.myAssociations = this.belongsTo(models.SubCategory, { foreignKey: 'subcategory_id', as: 'SubCategory' })
    }

}

module.exports = SubCategoryFilm;