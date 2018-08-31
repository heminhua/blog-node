const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true });
var Schema=mongoose.Schema;
const topicSchema = new Schema({
   module: {
     type:String,
     require:true
   } ,
   title:{
     type:String,
     require:true
   },
   main:{
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
   
  });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));
module.exports=mongoose.model('Topic',topicSchema);