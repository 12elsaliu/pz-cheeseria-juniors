import * as express from 'express';
const cheeses = require('./data/cheeses.json');


const router = express.Router();
router.use(express.json())

const purchases = [];

router.get('/api/cheeses', (req, res, next) => {
  res.json(cheeses);
});


router.post('/api/purchases',(req,res,next)=>{
  purchases.push({
    createdAt: new Date(),
    items: req.body
  });

  res.sendStatus(200)
})

router.get('/api/purchases',(req,res,next)=>{
  res.json(purchases)
})


export default router;