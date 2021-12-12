import express from 'express';
import itemsController from '../controllers/items';

const router = express.Router();

router.get('/', itemsController.getAll);
router.get('/search', itemsController.searchItem);
router.post('/', itemsController.createItem);
router.post('/update', itemsController.updateItem);
router.delete('/', itemsController.deleteItem);

export = router;
