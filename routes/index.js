const express = require('express');
const router = express.Router();
const { Empresa, PlanoFinanceiro, PlanoOperacional, RedeAtividades, PlanoNegocio, Objetivo } = require('../models');
// Página inicial
router.get('/', (req, res) => {
  res.render('index', { title: 'Gerador de Plano de Negócios', progress: 0 });
});

// Cadastro da Empresa
router.get('/empresa', (req, res) => {
  res.render('empresa', { title: 'Cadastro da Empresa', progress: 20 });
});

router.post('/empresa', async (req, res) => {
  try {
    const empresa = await Empresa.create(req.body);
    res.redirect(`/plano-financeiro/${empresa.id_empresa}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar empresa');
  }
});

// Plano Financeiro
router.get('/plano-financeiro/:id', (req, res) => {
  res.render('plano-financeiro', { title: 'Plano Financeiro', id_empresa: req.params.id, progress: 40 });
});

router.post('/plano-financeiro/:id', async (req, res) => {
  try {
    await PlanoFinanceiro.create({
      ...req.body,
      id_empresa: req.params.id
    });
    res.redirect(`/plano-operacional/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar plano financeiro');
  }
});

// Plano Operacional
router.get('/plano-operacional/:id', (req, res) => {
  res.render('plano-operacional', { title: 'Plano Operacional', id_empresa: req.params.id, progress: 60 });
});

router.post('/plano-operacional/:id', async (req, res) => {
  try {
    await PlanoOperacional.create({
      ...req.body,
      id_empresa: req.params.id
    });
    res.redirect(`/rede-atividades/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar plano operacional');
  }
});

// Rede de Atividades
router.get('/rede-atividades/:id', (req, res) => {
  res.render('rede-atividades', { title: 'Rede de Atividades', id_empresa: req.params.id, progress: 80 });
});

router.post('/rede-atividades/:id', async (req, res) => {
  try {
    await RedeAtividades.create({
      ...req.body,
      id_empresa: req.params.id
    });
    res.redirect(`/objetivos/${req.params.id}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar rede de atividades');
  }
});

// Objetivos
router.get('/objetivos/:id', (req, res) => {
  res.render('objetivos', { title: 'Objetivos', id_empresa: req.params.id, progress: 90 });
});

router.post('/objetivos/:id', async (req, res) => {
  try {
    const empresa = await Empresa.findByPk(req.params.id);
    const planoFinanceiro = await PlanoFinanceiro.findOne({ where: { id_empresa: req.params.id } });
    const planoOperacional = await PlanoOperacional.findOne({ where: { id_empresa: req.params.id } });
    const redeAtividades = await RedeAtividades.findOne({ where: { id_empresa: req.params.id } });

    if (!empresa || !planoFinanceiro || !planoOperacional || !redeAtividades) {
      return res.status(404).send('Dados não encontrados');
    }

    const planoNegocio = await PlanoNegocio.create({
      id_empresa: req.params.id,
      id_plano_financeiro: planoFinanceiro.id_plano_financeiro,
      id_plano_operacional: planoOperacional.id_plano_operacional,
      id_rede_atividade: redeAtividades.id_rede_atividades
    });

    const objetivosArray = Array.isArray(req.body.objetivos) ? req.body.objetivos : [];
    const objetivos = objetivosArray.map(objetivo => ({
      descricao: objetivo,
      id_plano_negocio: planoNegocio.id_plano_negocio
    }));

    if (objetivos.length > 0) {
      await Objetivo.bulkCreate(objetivos);
    }

    res.redirect(`/plano-final/${planoNegocio.id_plano_negocio}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao cadastrar objetivos e plano de negócio');
  }
});

// Plano Final
router.get('/plano-final/:id', async (req, res) => {
    try {
      const planoNegocio = await PlanoNegocio.findByPk(req.params.id, {
        include: [
          { model: Empresa },
          { model: PlanoFinanceiro },
          { model: PlanoOperacional },
          { model: RedeAtividades },
          { model: Objetivo }
        ]
      });
  
      if (!planoNegocio) {
        return res.status(404).send('Plano de negócio não encontrado');
      }
  
      console.log('Plano Negócio:', JSON.stringify(planoNegocio, null, 2));
  
      res.render('plano-final', { 
        title: 'Plano de Negócios Final', 
        planoNegocio: planoNegocio.toJSON(),
        progress: 100 
      });
    } catch (error) {
      console.error('Erro ao recuperar plano de negócio:', error);
      res.status(500).send('Erro ao recuperar plano de negócio');
    }
  });
module.exports = router;