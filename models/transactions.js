const Sequelize = require("sequelize");

module.exports = class Transactions extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        index: {
          //   primaryKey: true,
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        in: {
          allowNull: true,
          type: Sequelize.STRING(500),
        },
        out: {
          allowNull: true,
          type: Sequelize.STRING(500),
        },
        price: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
      },
      {
        sequelize,
        timestamps: true,
        modelName: "Transactions",
        tableName: "transactions",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
      }
    );
  }

  // 테이블간 관계 설정
  static associate(db) {
    db.Transactions.belongsTo(db.Blocks, {
      foreignKey: "index",
      sourceKey: "index",
    });
  }
};
