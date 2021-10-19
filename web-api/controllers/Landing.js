const Landing = require('../models/Landing')
const { LANDING_ID } = require('../config')


module.exports.getLanding = async (req, res, next) =>{

    const landing = await Landing.find({})
    
      res.send(landing)

}

module.exports.editLanding = async (req, res, next) =>{

    if(req.body.authorizationLevel !== '1') {
        res.send('error, not authorized')
    }


    const editedLanding = await Landing.findById(LANDING_ID)

    editedLanding.Images = req.body.Images
    editedLanding.Texts = req.body.Texts
    editedLanding.Links = req.body.Links

    await editedLanding.save()
    
      res.send(editedLanding)

}

