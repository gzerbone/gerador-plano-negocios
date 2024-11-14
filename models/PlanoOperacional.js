const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const PlanoOperacional = sequelize.define('PlanoOperacional', {
  id_plano_operacional: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descricao_atividade: DataTypes.STRING(255),
  equipamentos: DataTypes.STRING(255),
  pessoal_envolvido: DataTypes.STRING(255),
  localizacao: DataTypes.STRING(200)
}, {
  tableName: 'Plano_Operacional',
  timestamps: false
});

PlanoOperacional.associate = (models) => {
  PlanoOperacional.belongsTo(models.Empresa, { foreignKey: 'id_empresa' });
  PlanoOperacional.hasOne(models.PlanoNegocio, { foreignKey: 'id_plano_operacional' });
};

module.exports = PlanoOperacional;