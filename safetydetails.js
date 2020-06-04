const mongoose = require("mongoose")
mongoose.model("safetydetails", {
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true

    },
    mobile: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    nomember: {
        type: Number,
        require: true
    },
    remark: {
        type: String,
        require: true
    },
    issafe: {
        type: String,
        require: true
    },
    iscovidaroud: {
        type: String,
        require: false
    },
    shetuapp: {
        type: String,
        require: false
    },
    logdate:{
        type:Date
    },
    dt:{
        type:String
    }
})