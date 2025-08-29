const exp = require('express')
const userApp = exp.Router()
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

let usersCollection
let comAdminCollection
let adminCollection

userApp.use((req, res, next) => {
    usersCollection = req.app.get('usersCollection')
    comAdminCollection = req.app.get('comAdminCollection')
    adminCollection = req.app.get('adminCollection')
    next()
})

function remove(obj, st) {
    let keys = Object.keys(obj)
    keys = keys.filter(obj => obj != st)
    let newObj = {}
    keys.map((key) => {

        newObj[key] = obj[key]
    })

    return newObj
}

userApp.use(exp.json())

userApp.post('/user', async (req, res) => {
    let userObj = req.body
    let resObj = await usersCollection.findOne({ username: userObj.username })
    if (resObj == null) {
        let hashedPassword = await bcryptjs.hash(userObj.password, 6)
        userObj.password = hashedPassword
        let resObj2 = await usersCollection.insertOne(userObj)
        res.send({
            message: 'User created'
        })
    }
    else {
        res.send({
            message: 'Username already exists'
        })
    }
});

userApp.post('/login', async (req, res) => {
    let userObj = req.body
    let resObj = await usersCollection.findOne({ username: userObj.username })
    if (resObj == null) {
        res.send({
            message: 'Invalid username'
        })
    }
    else {
        let hashObj = await bcryptjs.compare(userObj.password, resObj.password)
        if (hashObj) {
            let signedToken = jwt.sign({ username: userObj.username }, process.env.SECRET_KEY, { expiresIn: 20 })
            res.send({
                message: 'Login successful',
                token: signedToken,
                payload: resObj
            })
        }
        else {
            res.send({
                message: 'Invalid password'
            })
        }
    }
})

userApp.put('/community/resident', async (req, res) => {
    let userComObj = req.body
    let resObj1 = await usersCollection.findOne({ username: userComObj.username })
    if (resObj1 == null) {
        res.send({
            message: 'Invalid username'
        })
    }
    else {
        let resObj2 = await comAdminCollection.findOne({ id: userComObj.id })
        if (resObj2 == null) {
            res.send({
                message: "Invalid community id"
            })
        }
        else {
            let comHashObj = await bcryptjs.compare(userComObj.passwordResident, resObj2.passwordResident)
            if (comHashObj) {
                if (resObj1.community.includes(userComObj.id)) {
                    res.send("Community already joined")
                }
                else {
                    let searchObj = resObj2.residents.find((obj) => obj.username == userComObj.username)
                    if (searchObj) {
                        res.send({
                            message: "Community already joined"
                        })
                    }
                    else {
                        let resObj3 = await usersCollection.updateOne({ username: userComObj.username }, { $addToSet: { community: userComObj.id } })
                        let resObj4 = await comAdminCollection.updateOne({ id: userComObj.id }, { $addToSet: { residents: { username: userComObj.username, houseNo: userComObj.houseNo } } })
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

userApp.put('/discussion-forum/comment', async (req, res) => {
    let discussionForumObj = req.body
    let resObj1 = await comAdminCollection.findOne({ id: discussionForumObj.cid })
    if (resObj1 == null) {
        res.send({
            message: "Invalid community id"
        })
    }
    else {
        let index = resObj1.disforum.findIndex((obj) => {
            return obj.id == discussionForumObj.id
        })
        if (index != -1) {
            let resObj2 = await comAdminCollection.updateOne({ id: discussionForumObj.cid, "disforum.id": discussionForumObj.id }, { $addToSet: { "disforum.$.comments": { username: discussionForumObj.username, userType: discussionForumObj.userType, comment: discussionForumObj.comment, time: discussionForumObj.time } } })
            if (resObj2 == null) {
                res.send({
                    message: "Error Occurred"
                })
            }
            else {
                res.send({
                    message: "Comment added successfully"
                })
            }
        }
        else {
            res.send({
                message: "Invalid discussion forum id"
            })
        }
    }
});

userApp.put('/poll', async (req, res) => {
    let pollObj = req.body
    let resObj1 = await comAdminCollection.findOne({ id: pollObj.cid })
    if (resObj1 != null) {
        let index
        let poll = resObj1.poll.filter((ele,ind) => {
            if(ele.id == pollObj.id){
                index=ind
            }
            return ele.id == pollObj.id
        })
        if (poll.length > 0) {
            poll=poll[0]
            if (Object.keys(poll.options).filter((ele) => {
                return ele == pollObj.option
            }).length > 0) {
                if(!poll.voted.includes(pollObj.username)){
                    poll.options[pollObj.option]+=1
                    poll.voted.push(pollObj.username)
                    resObj1.poll[index]=poll
                    let resObj2=await comAdminCollection.updateOne({id:pollObj.cid},{$set:{poll:resObj1.poll}})
                    if(resObj2.modifiedCount>0){
                        res.send({
                            message:"Voted in poll successfully"
                        })
                    }
                    else{
                        res.send({
                            message:"Error occurred"
                        })
                    }
                }
                else{
                    res.send({
                        message:"Already voted"
                    })
                }
            }
            else {
                res.send({
                    message: "Invalid option"
                })
            }
        }
        else {
            res.send({
                message: "Invalid poll id"
            })
        }
    }
})

userApp.put('/volunteer', async (req, res) => {
    let volunteerObj = req.body
    let resObj1 = await comAdminCollection.findOne({ id: volunteerObj.cid })
    if (resObj1 != null) {
        let arr = resObj1.event.filter((obj) => obj.id == volunteerObj.id)
        let volunteer = arr[0].volunteer
        if (volunteer.includes(volunteerObj.username)) {
            res.send({
                message: "Already applied for volunteering"
            })
        }
        else {
            volunteer.push(volunteerObj.username)
            let resObj2 = await comAdminCollection.updateOne({ id: volunteerObj.cid, "event.id": volunteerObj.id }, { $set: { "event.$.volunteer": volunteer } })
            if (resObj2.modifiedCount > 0) {
                res.send({
                    message: "Registered for volunteering successfully"
                })
            }
            else {
                res.send({
                    message: "Error occurred"
                })
            }
        }
    }
    else {
        res.send({
            message: "Invalid community id"
        })
    }
})

userApp.put('/feedback', async (req, res) => {
    let feedbackObj = req.body
    let resObj1 = await comAdminCollection.findOne({ id: feedbackObj.id })
    if (resObj1 != null) {
        let resObj2 = await comAdminCollection.updateOne({ id: feedbackObj.id }, { $addToSet: { feedback: { username: feedbackObj.username, comment: feedbackObj.comment, time: feedbackObj.time } } })
        if (resObj2.modifiedCount > 0) {
            res.send({
                message: "Feedback updated successfully"
            })
        }
        else {
            res.send({
                message: "Error occurred"
            })
        }
    }
    else {
        res.send({
            message: "invalid community id"
        })
    }
})

userApp.get('/visitor/:username',async(req,res)=>{
    let resObj=await usersCollection.findOne({username:req.params.username})
    if(resObj!=null){
        res.send({
            message:"Visitor Information",
            payload:resObj
        })
    }
    else{
        res.send({
            message:"Invalid username"
        })
    }
})

userApp.put('/visitor', async (req, res) => {
    let visitorObj = req.body
    let resObj1 = await comAdminCollection.findOne({ id: visitorObj.id })
    if(resObj1!=null){
        let visitorPrev=resObj1.visitor
        let username=resObj1.residents.map((ele,ind)=>{
            if(ele.houseNo==visitorObj.houseNo){
                return ele.username
            }
        }).filter((ele)=>ele!=undefined)
        if(username.length>0){
            let visitor=resObj1.visitor.filter((ele)=>ele.houseNo==visitorObj.houseNo&&ele.name==visitorObj.name&&ele.phno==visitorObj.phno)
            if(visitor.length>0){
                visitor=resObj1.visitor.map((ele)=>{
                    if(ele.houseNo==visitorObj.houseNo&&ele.name==visitorObj.name&&ele.phno==visitorObj.phno){
                        return {
                            ...ele,
                            status:visitorObj.status
                        }
                    }
                })
                let resObj2=await comAdminCollection.updateOne({id:visitorObj.id},{$set:{visitor:visitor}})
                if(resObj2.modifiedCount!=null){
                    let resObj3=username.filter(async (ele)=>{
                        let resObj4=await usersCollection.findOne({username:ele})
                        resObj4.visitor=resObj4.visitor.filter((ele2)=>{
                            if(ele2.phno!=visitorObj.phno){
                                return ele2
                            }
                        })
                        let resObj5=await usersCollection.updateOne({username:ele},{$set:{visitor:resObj4.visitor}})
                        if(resObj5.modifiedCount>0){
                            return true
                        }
                        else{
                            return false
                        }
                    })
                    if(resObj3.length==username.length){
                        res.send({
                            message:"Message sent successfully"
                        })
                    }
                    else{
                        res.send({
                            message:"Error occurred"
                        })
                    }
                }
                else{
                    res.send({
                        message:"Error occurred"
                    })
                }
            }
            else{
                res.send({
                    message:"Invalid house no2"
                })
            }
        }
        else{
            res.send({
                message:"Invalid house no1"
            })
        }
    }
    else{
        res.send({
            message:"Invalid Community id"
        })
    }
})

userApp.put('/book-slot', async (req, res) => {
    let slotObj = req.body
    let resObj1 = await comAdminCollection.findOne({ id: slotObj.cid })
    if (resObj1 != null) {
        let sportObj = resObj1.sports
        sportObj = sportObj.filter(obj => obj.id == slotObj.id)
        sportObj = sportObj[0]
        let slots = sportObj.slots
        let arrFiltered = slots.filter(ele => {
            if (ele.date == slotObj.details.date) {
                if (ele.username == slotObj.details.username) {
                    return true
                }
                else {
                    if (ele.slot == slotObj.details.slot) {
                        return true
                    }
                }
            }
        })
        if (arrFiltered.length >= sportObj.noOfCourts) {
            res.send({
                message: "Slot already reserved"
            })
        }
        else {
            let resObj2 = await comAdminCollection.updateOne({ id: slotObj.cid, "sports.id": slotObj.id }, { $addToSet: { "sports.$.slots": slotObj.details } })
            if (resObj2.modifiedCount > 0) {
                res.send({
                    message: "Slot booked successfully"
                })
            }
            else {
                res.send({
                    message: "Error occurred"
                })
            }
        }
    }
    else {
        res.send({
            message: "Invalid community id"
        })
    }
})

module.exports = userApp