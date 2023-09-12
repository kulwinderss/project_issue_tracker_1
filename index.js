const express=require('express');
const bodyParser=require('body-parser');
const app= express();
const port=3000;
const ejsexpresslayout=require('express-ejs-layouts');
const sassMiddlWare=require('node-sass-middleware')
app.use(express.urlencoded());
const mongoose=require('mongoose');


//database connection
mongoose.connect("mongodb+srv://kulwinderskvbrgh:kulwinderskvbrgh@cluster0.y9kdwg9.mongodb.net/project_issue_tracker?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



// node-sass-middleware configuration
app.use(
    sassMiddlWare({
        src: "./assets/scss",
        dest: "./assets/css",
        debug: true,
        outputStyle: "extended",
        prefix: "/css",
    })
);
    
    //loading layouts
app.use(express.static('./assets'));
app.use(ejsexpresslayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

const router=require('./routes/index');
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',router);
app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log('error in running: ',err);
    }
    console.log('server is running on the port',port)
})
