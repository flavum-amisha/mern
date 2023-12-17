const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    employee_id: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    department: {
        type: String, 
        default: 'not assigned yet' 
    }
});

const Employee = mongoose.model('Employee', employeeSchema); 
module.exports = Employee;
