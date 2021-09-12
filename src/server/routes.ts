import * as express from 'express';
const cheeses = require('./data/cheeses.json');


const router = express.Router();
router.use(express.json())

type PurchaseType = {
  createdAt: Date;
  items: CartItemType[]
}

type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

//TODO: Instead of using variable, store the purchases in the database.
const purchases: PurchaseType[] = [];

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