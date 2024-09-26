import express, { Router } from 'express';
import { addBeeper, getAllBeepers, getBeeperById, editBeeperById, deleteBeeperById} from '../controllers/beeperController.js';


const router: Router = express.Router();


router.route('/beepers').post(addBeeper);
router.route('/beepers').get(getAllBeepers);
router.route('/beepers/:id').get(getBeeperById);
router.route('/beepers/:id/status').put(editBeeperById);
router.route('/beepers/:id').delete(deleteBeeperById);
// router.route('/beepers/:status/:status').get(getBeepersByStatus);


export default router;