const mongoose = require('mongoose')
const departmentSchema= mongoose.Schema({
    name: { type: String, required: true },
    
})

const Department = mongoose.model("department",departmentSchema)

module.exports =Department