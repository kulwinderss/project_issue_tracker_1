const IssueList=require('../models/issue');
const ProjectList=require('../models/projectModel');

// issue page controller
module.exports.issuepage=function(req,res){
    ProjectList.findById(req.params.projectId,function(err,projectDetail){
        console.log(req.params,"pp")
        return res.render('issuePage',{
            title:'create issue',
            projectId:req.params.projectId,
            projectDet:projectDetail
        })
    })
}

// create issue 
module.exports.create= async function(req,res){
    console.log('issue req.body',req.body)
    let newIssue = await IssueList.create({
        title:req.body.title,
        description:req.body.description,
        reported_by:req.body.reported_by,
        projectRef: req.body.projectRef,
        labels:req.body.labels
    })
    let project = await ProjectList.findById(req.body.projectRef);
    newIssue.save();
    project.issue.push(newIssue);
    project.save();
    console.log('issue is created successfully',newIssue);
    return res.redirect("/");
}

// filter the issues using search by
module.exports.filterIssue= async function(req,res){
    console.log(req.body,"req.body")
    let projectData= await ProjectList.findById(req.body.projectId).populate('issue')
    console.log("projectData",projectData);
    console.log('project_data',projectData.issue);
    let filterdata = new Set();
    console.log('filter_data',filterdata);

    //reported_by
    if(req.body.search_reported_by){
        for(i of projectData.issue){
            if(i.reported_by === req.body.search_reported_by){
                filterdata.add(i)
            }
        }
    }
    
    // title Or description
    else if(req.body.searchTitleDesc){
        for(i of projectData.issue){
            if(i.title === req.body.searchTitleDesc || i.description === req.body.searchTitleDesc){
                filterdata.add(i)
            }
        }
    }

    //by labels 2 no.
    else{
        for(i of projectData.issue){
            for(j of i.labels){
                console.log(j,"error")
                if(j === req.body.label1 || j === req.body.label2){
                    filterdata.add(i)
                }
            }
        }
    }
    let issueRleToPro= await IssueList.find({projectRef: req.body.projectId})
    console.log('lkk',issueRleToPro)
    return res.render('projectDetailsPage',{
        title:'filter issue',
        showIssue:false,
        filterdata:filterdata,
    })
}