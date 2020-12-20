const router = require ('express').Router()
const Article = require('../models/article.model')
const Cart = require('../models/cart.model')

router.route('/').get((req, res) => {
    Cart.find()
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json('Error' + err))
})
  
router.route('/:id').get((req, res) => {
    Cart.find( { user : req.params.id })
    .then(cart => res.json(cart))
    .catch(err => res.status(400).json('Error' + err))
})

router.route('/add').post((req, res) => {
    const user = req.body.user
    
    const articleId = req.body.articleId
    console.log('art id' + articleId);
    const newCart = new Cart ({ user, articleId })

    newCart.save()
    .then(()=> res.json('Article added to cart' ))
    .catch(err => res.status(400).json('Error ' + err))

})

module.exports = router