const mongoose=require('mongoose');

// acquire the connection to check if it is successfully
const db=mongoose.connection;

// message on error
db.on('error',console.error.bind(console,'error connecting to db'));

// up and running the print the msg
db.once('open',function(){
    console.log('Successfully connected to a database');
})

