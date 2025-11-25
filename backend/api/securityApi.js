const exp=require('express')
const securityApp=exp.Router()
const bcryptjs=require('bcryptjs')
// const multer=require('multer')
// const image=multer({
//     limits:{
//         fileSize:1000000
//     },
//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
//             return cb(new Error('File format is wrong'))
//         }
//         else{
//             return cb(undefined,true)
//         }
//     }
// })

let usersCollection
let comAdminCollection
let adminCollection

securityApp.use((req,res,next)=>{
    usersCollection=req.app.get('usersCollection')
    comAdminCollection=req.app.get('comAdminCollection')
    adminCollection=req.app.get('adminCollection')
    next()
})

securityApp.use(exp.json())

{//Example for multer
    // const multer = require('multer')
    // const upload = multer({
    //     dest: "upload",
    //     limits: {
    //         fileSize: 1000000
    //     },
    //     fileFilter: (req, file, err) => {
    //         if (file.originalname.endsWith('jpg') || file.originalname.endsWith('jpeg') || file.originalname.endsWith('png')) {
    //             return err(undefined, true)
    //         }
    //         else {
    //             return err(new Error('File format is incorrect'))
    //         }
    //     }
    // })

    // securityApppost('/image', upload.single('upload'), (req, res) => {
    //     res.send()
    // }, (err, req, res, next) => {
    //     res.status(404).send({
    //         error: err.message
    //     })
    // });
}

// securityApp.post('/lost',image.single('image'),async(req,res)=>{
//     let lostObj=req.body
//     let resObj=await comAdminCollection.updateOne({id:lostObj.id},{$addToSet:{lostItems:{
//         file:req.file.buffer,
//         ...req.body
//     }}})
//     if(resObj==null){
//         res.send({
//             message:"Error occurred"
//         })
//     }
//     else{
//         res.send({
//             message:"Uploaded successfully"
//         })
//     }
// })

// securityApp.post('/lost-items',async(req,res)=>{
//     let lostObj=req.body
//     let resObj=await comAdminCollection.findOne({id:lostObj.id})
//     if(resObj==null){
//         res.send({
//             message:"Community id does'nt exist"
//         })
//     }
//     else{
//         res.send({
//             message:"Lost and found",
//             payload:resObj.lostItems
//         })
//     }
// })

securityApp.put('/community/security', async (req, res) => {
    let secComObj = req.body
    let resObj1 = await usersCollection.findOne({ username: secComObj.username })
    if (resObj1 == null) {
        res.send({
            message: 'Invalid username'
        })
    }
    else {
        let resObj2 = await comAdminCollection.findOne({ id: secComObj.id })
        if (resObj2 == null) {
            res.send({
                message: "Invalid community id"
            })
        }
        else {
            let comHashObj = await bcryptjs.compare(secComObj.passwordSecurity, resObj2.passwordSecurity)
            if (comHashObj) {
                if (resObj1.community.includes(secComObj.id)) {
                    res.send({
                        message:"Community already joined"
                    })
                }
                else {
                    let searchObj = resObj2.security.find((obj) => obj.username == secComObj.username)
                    if (searchObj==null) {
                        res.send({
                            message: "Community already joined"
                        })
                    }
                    else {
                        let resObj3 = await usersCollection.updateOne({ username: secComObj.username }, { $addToSet: { community: secComObj.id } })
                        let resObj4 = await comAdminCollection.updateOne({ id: secComObj.id }, { $addToSet: { security:secComObj.username } })
                        if (resObj3 == null || resObj4 == null) {
                            res.send({
                                message: "Error occurred"
                            })
                        }
                        else {
                            res.send({
                                message: "Community joined successfully"
                            })
                        }
                    }
                }
            }
            else {
                res.send({
                    message: 'Invalid password'
                })
            }
        }
    }
})

securityApp.put('/visitor',async(req,res)=>{
    let visitorObj=req.body
    let resObj1=await comAdminCollection.findOne({id:visitorObj.id})
    if(resObj1!=null){
        let residents=resObj1.residents
        residents=residents.filter((obj)=>obj.houseNo==visitorObj.houseNo)
        residents=residents.map((obj)=>obj.username)
        if(residents.length!=0){
            let resObj2=await usersCollection.updateMany({username:{$in:residents}},{$addToSet:{visitor:{name:visitorObj.name,phno:visitorObj.phno}}})
            if(resObj2!=null){
                let resObj3=await comAdminCollection.updateOne({id:visitorObj.id},{$addToSet:{visitor:{name:visitorObj.name,phno:visitorObj.phno,houseNo:visitorObj.houseNo,status:0}}})
                if(resObj3.modifiedCount>0){
                    res.send({
                        message:"Visitor request sent"
                    })
                }
                else{
                    let resObj4=await usersCollection.updateMany({username:{$in:residents}},{$set:{visitor:{}}})
                    res.send({
                        message:"Error occurred"
                    })
                }
            }
            else{
                res.send({
                    message:"error occurred"
                })
            }
        }
        else{
            res.send({
                message:"Invalid house number"
            })
        }
    }
    else{
        res.send({
            message:"Invalid community id"
        })
    }
})

securityApp.put('/visitor/delete',async(req,res)=>{
    let visitorObj=req.body
    let resObj1=await comAdminCollection.findOne({id:visitorObj.id})
    if(resObj1!=null){
        let visitor=resObj1.visitor
        visitor=resObj1.visitor.filter((obj)=>(visitor.houseNo==visitorObj.houseNo)&&(visitor.status!=0))
        let resObj2=await comAdminCollection.updateOne({id:visitorObj.id},{$set:{visitor:visitor}})
        if(resObj2!=null){
            res.send({
                message:"Message accepted"
            })
        }
        else{
            res.send({
                message:"error occurred"
            })
        }
    }
    else{
        res.send({
            message:"Invalid community id"
        })
    }
})

module.exports=securityApp