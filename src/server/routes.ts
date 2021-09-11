import * as express from 'express';
const cheeses = require('./data/cheeses.json');

const router = express.Router();

const purchasedItems = [];

router.get('/api/cheeses', (req, res, next) => {

    res.json(cheeses);
});


router.post('/api/purchase',(req,res,next)=>{
    purchasedItems.push(...req.body);
    res.sendStatus(200)
})

export default router;