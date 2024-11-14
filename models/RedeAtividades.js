const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RedeAtividades = sequelize.define('RedeAtividades', {
  id_rede_atividades: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_empresa: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  descricao: DataTypes.STRING(255),
  atividade_principal: DataTypes.STRING(255),
  atividades_auxiliares: DataTypes.STRING(255),
  responsaveis: DataTypes.STRING(255)
}, {
  tableName: 'Rede_Atividades',
  timestamps: false
});

RedeAtividades.associate = (models) => {
  RedeAtividades.belongsTo(models.Empresa, { foreignKey: 'id_empresa' });
  RedeAtividades.hasOne(models.PlanoNegocio, { foreignKey: 'id_rede_atividade' });
};

module.exports = RedeAtividades;