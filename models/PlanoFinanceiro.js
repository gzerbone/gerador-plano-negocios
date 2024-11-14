const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlanoFinanceiro = sequelize.define('PlanoFinanceiro', {
  id_plano_financeiro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  investimento_inicial: DataTypes.DECIMAL(10, 2),
  custos_fixos: DataTypes.DECIMAL(10, 2),
  custos_variaveis: DataTypes.DECIMAL(10, 2),
  receitas_previstas: DataTypes.DECIMAL(10, 2),
  lucro_estimado: DataTypes.DECIMAL(10, 2)
}, {
  tableName: 'Plano_Financeiro',
  timestamps: false
});

PlanoFinanceiro.associate = (models) => {
  PlanoFinanceiro.belongsTo(models.Empresa, { foreignKey: 'id_empresa' });
  PlanoFinanceiro.hasOne(models.PlanoNegocio, { foreignKey: 'id_plano_financeiro' });
};

module.exports = PlanoFinanceiro;