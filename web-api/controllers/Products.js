const Product = require('../models/Products');
const MtgCard = require('../models/MtgCard')

module.exports.searchAllMtgCardsAndProducts = async (req, res, next) =>{



    const foundProduct = await Product.find({productName: new RegExp('.*'+req.query.productName+'.*', "i")}).sort({'stock': 'desc'})
            console.log(foundProduct)
        if (foundProduct.length>=1){
          return res.send(foundProduct)
        }


        const foundCard = await MtgCard.find({name: new RegExp('.*'+req.query.productName+'.*', "i")}).sort({'stock': 'desc'})
           if (foundCard){
            return res.send(foundCard)
           } 

           if (!foundProduct && !foundProduct){
               return res.json({message:'no products found'})
           }

        


    

}

module.exports.searchProductsByName = async (req, res, next) =>{

    const foundProduct = await Product.find({productName: new RegExp('.*'+req.query.productName+'.*', "i")}).sort({'stock': 'desc'})
    
      res.send(foundProduct)

}

module.exports.postProduct = async (req, res, next) =>{

    try {
    const NewProduct = new Product(req.body);
    await NewProduct.save()

    res.json({ message:NewProduct })
    }catch(e){
        res.json({ message: e })
    }

}

module.exports.getProductsById = async (req, res, next)=>{
    const {id} = req.params //THIS HAS TO BE EXACT PARAM NAME IN ROUTE
    const foundProduct = await Product.findById(id).sort({'stock': 'desc'})

    console.log (foundProduct)
    if (!foundProduct) {
    res.send('not found!')}

    res.send(foundProduct)
}

module.exports.getProductsByCatagoryName = async (req, res, next)=>{
    const {catagoryName} = req.params //THIS HAS TO BE EXACT PARAM NAME IN ROUTE
    const foundProducts = await Product.find({ productCategory: catagoryName}).sort({'stock': 'desc'})

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