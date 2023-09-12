const ProjectList=require('../models/projectModel');
const IssueList=require('../models/issue');


module.exports.createProject=function(req,res){
      return res.render('createproject',{
        title:"create project"
    })
}

// create project functions
module.exports.create= function(req,res){
    console.log("req.body",req.body)
    ProjectList.create(
        {
            project_name:req.body.project_name,
            project_creator:req.body.project_creator,
            project_description:req.body.project_description
        },function(err,project){
            if(err){
                console.log('error in creating',err);
                return;
            }
            console.log('project is created successfully',project);
            return res.redirect('/')
        }
    )
}

//create issue for project
module.exports.projectIssue= async function(req,res){
    console.log('req.query.projectid',req.query.projectid)
    //find clicked project id and print on console
    let project=await ProjectList.findById(req.query.projectid)
    //find  issues details of clicked project & print on console
    let issuePro = await IssueList.find({ projectRef: req.query.projectid });
    console.log("project",project)
    console.log("issuePro",issuePro)
    let uniqueArray=[];
    for(i of issuePro){
        for(j of i.labels){
            uniqueArray.push(j);
        }
    }
    let uniqueSet = [...new Set(uniqueArray)]
    console.log('uniqueSet',uniqueSet)
    return res.render('projectDetailsPage',{
        project:project,
        issue:issuePro,
        labelSet:uniqueSet,
        showIssue:true,
        title:'project details page'
    })
}
