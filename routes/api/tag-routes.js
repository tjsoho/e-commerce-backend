const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [
        { model: Product, as: "tag_products" }
      ],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          as: "tag_products",
        },
      ],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagsData = await Tag.create(req.body);
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      }
    });
    if (!tagsData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const tagsData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!tagsData) {
      res.status(404).json({ message: 'No tag found with that id!' });
      return;
    }
    res.status(200).json(tagsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
