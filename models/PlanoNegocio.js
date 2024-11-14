const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlanoNegocio = sequelize.define('PlanoNegocio', {
  id_plano_negocio: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_plano_financeiro: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_plano_operacional: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_rede_atividade: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'Plano_Negocio',
  timestamps: false
});

PlanoNegocio.associate = (models) => {
  PlanoNegocio.belongsTo(models.Empresa, { foreignKey: 'id_empresa' });
  PlanoNegocio.belongsTo(models.PlanoFinanceiro, { foreignKey: 'id_plano_financeiro' });
  PlanoNegocio.belongsTo(models.PlanoOperacional, { foreignKey: 'id_plano_operacional' });
  PlanoNegocio.belongsTo(models.RedeAtividades, { foreignKey: 'id_rede_atividade' });
  PlanoNegocio.hasMany(models.Objetivo, { foreignKey: 'id_plano_negocio' });
};

module.exports = PlanoNegocio;