var House = require('../models/house')

module.exports = {
  create: function(req,res){
    var newHouse = new House({
      seller: req.body.seller,
      address:req.body.address,
      price: req.body.price,
      image: req.body.image,
      createdAt: new Date(),
      longitude: req.body.longitude,
      latitude: req.body.latitude
    })

    newHouse.save(function(err){
      if(err){
        res.send(err)
      }
      else{
        res.json(newHouse)
      }
    })
  },
  update: function(req,res){
    House.findOne({_id:req.params.id},function(err,result){
      console.log(result);
      if(err){
        res.send(err)
      }
      else{
        result.seller = req.body.seller
        result.address = req.body.address
        result.price = req.body.price
        result.image = req.body.image
        result.longitude = req.body.longitude
        result.latitude = req.body.latitude

        result.save(function(err){
          if(err){
            res.send(err)
          }
          else{
            res.json(result)
          }
        })

      }
    })
  },
  delete: function(req,res){
    House.findOneAndRemove({_id:req.params.id},function(err){
      if(err){
        res.send(err)
      }
      else{
        res.send('success to delete')
      }
    })
  },
  showAll: function(req,res){
    House.find({},function(err,result){
      if(err){
        res.send(err)
      }
      else{
        res.json(result)
      }
    })
  },
  show: function(req,res){
    House.findOne({_id:req.params.id},function(err,result){
      if(err){
        res.send(err)
      }
      else{
        res.json(result)
      }
    })
  }
}
