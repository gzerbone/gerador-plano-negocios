const Sequelize = require('sequelize');

const sequelize = new Sequelize('empreendedorismo_bd', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  // Adicione estas opções para evitar avisos de depreciação
  dialectOptions: {
    dateStrings: true,
    typeCast: true
  },
  timezone: '-03:00' // para salvar datas no fuso horário correto
});

// Teste a conexão
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

module.exports = sequelize;