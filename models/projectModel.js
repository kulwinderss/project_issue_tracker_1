const mongoose =require('mongoose');
// project list schema
const projectSchema= new mongoose.Schema(
    {
        project_name:{
            type:String,
            required:true
        },
        project_description:{
            type:String,    
            required:true
        },
        project_creator:{
            type:String,
            required:true
        },
        issue:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'issueSchema'
            },
        ],

    },
    {
        timestamps:true
    }
)

const ProjectList=mongoose.model('ProjectList',projectSchema);
module.exports=ProjectList;