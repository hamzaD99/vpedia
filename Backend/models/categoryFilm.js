const Sequelize = require("sequelize");

class CategoryFilm extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                UUID: {
                    type: DataTypes.UUID,
                    defaultValue: DataTypes.UUIDV4,
                    primaryKey: true,
                },
                film_id: DataTypes.UUID,
                category_id: DataTypes.UUID,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'categories_films',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.belongsTo(models.Film, { foreignKey: 'film_id', as: 'Film' })
        this.myAssociations = this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'Category' })
    }

}

module.exports = CategoryFilm;