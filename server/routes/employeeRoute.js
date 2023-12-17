const express = require('express')
const route = express.Router()
const  {createEmployee,logInEmployee,GetEmployees,updateEmployeeDetails,deleteEmployee,sortByLocation,sortByName,assignDepartmentToEmployee} = require("../controller/employeeController")

route.post('/register',createEmployee)
route.post('/login',logInEmployee)
route.get('/employee',GetEmployees)
route.get('/sort-by-location',sortByLocation)
route.get('/sort-by-name',sortByName)
route.put('/update/:employeeId',updateEmployeeDetails)
route.delete('/delete/:employeeId',deleteEmployee)
route.put('/assign-department/',assignDepartmentToEmployee)




module.exports=route