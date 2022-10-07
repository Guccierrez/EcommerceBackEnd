const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: [{ model: Product,},],
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
try {
  const categories = await Category.findByPk(req.params.id,{
    include: [{ model: Product,},],
  });

  res.json(categories);
} catch (error) {
  res.status(500).json(error);
}
});

router.post('/', async (req, res) => {
  try {
    const categories = await Category.create(req.body);
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', async (req, res) => {
 
//  refer back to activity 20,routes,api, userRoutes.js
  try {
    const updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(updatedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});
 

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy( {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
