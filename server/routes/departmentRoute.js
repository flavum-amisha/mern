const express = require('express')
const route = express.Router()
const  {deleteDepartment,updateDepartment,createDepartment,getDepartments} = require("../controller/departmentController")

route.post('/create',createDepartment)
route.get('/get',getDepartments)
route.put('/update/:id',updateDepartment)
route.delete('/delete/:id',deleteDepartment)





module.exports=route