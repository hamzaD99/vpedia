const Sequelize = require("sequelize");

class Category extends Sequelize.Model {
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
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                tableName: 'categories',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.hasMany(models.CategoryFilm, { foreignKey: 'category_id', as: 'Films' })
    }

}

module.exports = Category;