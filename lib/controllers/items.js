const { Router } = require('express');
const authorizeItem = require('../middleware/authorizeItem');
const Item = require('../models/Item');

module.exports = Router()
  .delete('/:id', authorizeItem, async (req, res, next) => {
    try {
      const resp = await Item.delete(req.params.id);
      res.json(resp);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authorizeItem, async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const item = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(item);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const resp = await Item.getAll(req.user.id);
      res.json(resp);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
