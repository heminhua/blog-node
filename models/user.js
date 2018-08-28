const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
var Schema=mongoose.Schema;
const uerSchema = new Schema({
   name: {
     type:String,
     require:true
   } ,
   password:{
     type:String,
     require:true
   },
   email:{
     type:String,
     require:true
   },
   create_time:{
     type:Date,
     default:Date.now()
   },
   avator:{
     type:String,
     default:'/public/img/avatar-default.png'
   },
   bio:{
     type:String,
     default:''
   },
   birthday:{
    type:Number,
   }
  });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
module.exports=mongoose.model('User',uerSchema);