const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Objetivo = sequelize.define('Objetivo', {
  id_objetivo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_plano_negocio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descricao: DataTypes.STRING(255)
}, {
  tableName: 'Objetivo',
  timestamps: false
});

Objetivo.associate = (models) => {
  Objetivo.belongsTo(models.PlanoNegocio, { foreignKey: 'id_plano_negocio' });
};

module.exports = Objetivo;