const { Router } = require('express');
const router = Router();

const { getRestaurantPlates, getPlates, getIngredients,getPlatesType, createPlate, createIngredient, updatePlate, updateIngredient, deletePlate, deleteIngredient} = require('../controllers/index.controller')

router.get('/plates', getPlates)
router.get('/plates/:id', getRestaurantPlates);
router.get('/ingredients', getIngredients);
router.get('/plates/type/:id', getPlatesType);

router.post('/plate', createPlate);
router.post('/ingredient', createIngredient);

router.put('/plate/:id', updatePlate);
router.put('/ingredient/:id', updateIngredient);
router.put('/delete/plate/:id', deletePlate);
router.put('/delete/ingredient/:id', deleteIngredient);


module.exports = router;