const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const sequelize = require('./config/database');

const app = express();
app.use(express.static('public'));
// Configuração do EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotas
app.use('/', routes);


// Importar modelos
const models = require('./models');
  
  // Inicializar associações
  Object.keys(models).forEach(modelName => {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});