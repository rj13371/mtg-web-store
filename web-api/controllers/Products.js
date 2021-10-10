const Product = require('../models/Product');

module.exports.searchProductsByName = async (req, res, next) =>{

    const foundProduct = await Product.find({productName: new RegExp('.*'+req.query.name+'.*', "i")})
    
      res.send(foundProduct)

}

module.exports.postProduct = async (req, res, next) =>{
    const NewProduct = new Product(req.body);
    await NewProduct.save()

    res.send('success')

}

module.exports.getProductsById = async (req, res, next)=>{
    const {id} = req.params //THIS HAS TO BE EXACT PARAM NAME IN ROUTE
    const foundProduct = await Product.findById(id)

    console.log (foundProduct)
    if (!foundProduct) {
    res.send('not found!')}

    res.send(foundProduct)
}

module.exports.getProductsByCatagoryName = async (req, res, next)=>{
    const {catagoryName} = req.params //THIS HAS TO BE EXACT PARAM NAME IN ROUTE
    const foundProducts = await Product.find({ productCategory: catagoryName})

    console.log (foundProducts)
    if (!foundProducts) {
    res.send('not found!')}

    res.send(foundProducts)
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