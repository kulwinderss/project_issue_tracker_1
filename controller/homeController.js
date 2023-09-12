const ProjectList=require('../models/projectModel');
// controller for home page project details
module.exports.home=function(req,res){
    ProjectList.find({},function(err,projectDet){
        if(err){
            console.log('error in finding project list',err);
            return;
        } 
        return res.render('home',{
            project11:projectDet,
            title:'home page'
        })
    })
}