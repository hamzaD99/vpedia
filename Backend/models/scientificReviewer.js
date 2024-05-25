const Sequelize = require("sequelize");

class ScientificReviewer extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
               id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                },
                name_arabic: DataTypes.STRING,
                name_english: DataTypes.STRING,
                createdAt: DataTypes.DATE,
                deletedAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE,
            },
            {
                tableName: 'scientific_reviewers',
                sequelize,
            }
        );
    }

    static associate(models) {
        this.myAssociations = this.hasMany(models.Film, { foreignKey: 'reviewer_id', as: 'Films' });
    }

}

module.exports = ScientificReviewer;