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

module.exports.editProduct = async (req,res, next)=>{
    const {id} = req.params;

    const editedProduct = await Product.findByIdAndUpdate(id, {...req.body})

    await editedProduct.save();

    res.send(editedProduct)
}


module.exports.deleteProduct = async (req, res, next) =>{
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    console.log (id)

    res.send('success')

}