const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Empresa = sequelize.define('Empresa', {
  id_empresa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  cnpj: {
    type: DataTypes.STRING(14),
    allowNull: false,
    unique: true
  },
  missao: DataTypes.STRING(255),
  endereco: DataTypes.STRING(200),
  telefone: DataTypes.STRING(20)
}, {
  tableName: 'Empresa',
  timestamps: false
});

Empresa.associate = (models) => {
  Empresa.hasOne(models.PlanoNegocio, { foreignKey: 'id_empresa' });
  Empresa.hasOne(models.PlanoFinanceiro, { foreignKey: 'id_empresa' });
  Empresa.hasOne(models.PlanoOperacional, { foreignKey: 'id_empresa' });
  Empresa.hasOne(models.RedeAtividades, { foreignKey: 'id_empresa' });
};

module.exports = Empresa;