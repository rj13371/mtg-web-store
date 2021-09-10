const Product = require('../models/Products');

module.exports.getProducts = async (req, res, next) =>{

    const foundProduct = await Product.find({name: new RegExp('.*'+req.query.name+'.*', "i")})
    
      res.send(foundProduct)

}

module.exports.postProduct = async (req, res, next) =>{
    const NewProduct = new Product(req.body);

    await NewProduct.save()

    res.send('success')

}