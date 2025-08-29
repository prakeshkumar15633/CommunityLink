const exp=require('express')
const app=exp()
require('dotenv').config()
const mongoClient=require('mongodb').MongoClient
const path=require('path')
const { config } = require('dotenv')

app.use(exp.static(path.join(__dirname,'../frontend/build')))
app.use(exp.json())

mongoClient.connect(process.env.DB_URL)
.then((client)=>{
    const db=client.db('communityDb')

    const usersCollection=db.collection('usersCollection')
    const comAdminCollection=db.collection('comAdminCollection')
    const adminCollection=db.collection('adminCollection')

    app.set('usersCollection',usersCollection)
    app.set('comAdminCollection',comAdminCollection)
    app.set('adminCollection',adminCollection)

    console.log('DB Connection success')
})
.catch((err)=>console.log('Error in db connection',err))

const userApp=require('./api/userApi')
const comAdminApp=require('./api/comAdminApi')
const adminApp=require('./api/adminApi')
let securityApp=require('./api/securityApi')

app.use('/user-api',userApp)
app.use('/com-admin-api',comAdminApp)
app.use('/admin-api',adminApp)
app.use('/security-api',securityApp)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})

app.use((err,req,res,next)=>{
    res.send({
        err:err
    }) 
})

app.listen(4000,()=>console.log("Server running on port 4000..."))
