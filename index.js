const express = require("express")
const app = express()

const mongoose = require("mongoose")
const bodyParser = require("body-parser")
app.use(bodyParser.json())

require("./safetydetails")
const safetydetails = mongoose.model("safetydetails")
//enabling cors
var cors = require('cors')
app.use(cors())
//mongodb+srv://bookservice:bookservice@cluster0-rskzn.mongodb.net/customerservices
//mongodb://localhost:27017/
mongoose.connect("mongodb://localhost:27017/Safety",
 { useNewUrlParser: true , useUnifiedTopology: true },
 () => {
    console.log("Connected to database...");
})
app.get("/", (req, res) => {
    res.send("This is punching service.")
})
app.post("/LogData", (req, res) => {
    var month =new Date().getMonth().toString().length =1 ?'0' + new Date().getMonth() :new Date().getMonth();
    var day =new Date().getDate().toString().length =1 ?'0' + new Date().getDate() :new Date().getDate();

    var newUser = {
        name: req.body.name,
        email: req.body.email,
        mobile: req.body.mobile,
        location: req.body.location,
        nomember: req.body.familycount,
        remark:req.body.remarks,
        issafe:req.body.locality,
        shetuapp:req.body.aarogya,
        iscovidaroud:req.body.covid,
        logdate:new Date(),
        dt:new Date().toLocaleDateString()
    }
    var us = new safetydetails(newUser);
    us.save().then(() => {
        console.log("A new user is created.")
        res.send("1");
    }).catch(err => {
        if(err){
            res.send('0');
            throw err
        }
    })
})
app.post("/getuserdetails", (req, res) => {
    console.log(req.body.logdate);
    var query = {
        dt: req.body.logdate,
        };


        safetydetails.aggregate(
            [
                {"$match":query},
            { "$project": {
            "_id": 0,
            "name": "$name",
            "mobile":"$mobile",
            "location":"$location",
            "email":"$email",
            "familycount": "$nomember",
            "covid":"$iscovidaroud",
            "locality":"$locality",
            "aarogya":"$shetuapp",
            "remarks":"$remark",
            }}
            ]).then((userObj) => {
                    res.json(userObj)
                }).catch(err => {
                    if(err){
                        throw err
                    }
                });
        
    // safetydetails.find(query).then((userObj) => {
    //     res.json(userObj)
    // }).catch(err => {
    //     if(err){
    //         throw err
    //     }
    // })
})

 var server = app.listen(3005, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
 })
