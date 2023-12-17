const Employee  = require('../model/employee')
const bcrypt = require('bcrypt');
const setEmployeeToken = require('../auth/userAuth');

const createEmployee = async (req, res) => {
    console.log("New Employee", req.body);

    const { name, address, position, employee_id, department, password } = req.body;

    console.log(req.body);

    if (!(name && address && position && employee_id  && password)) {
        return res.status(400).send("Provide All the Data");
    }

    try {
        const existingEmployee = await Employee.findOne({ employee_id });
        console.log(existingEmployee)
        if (existingEmployee) {
            console.log("Employee ID already present in our database");
            return res.status(400).json({ message: "Employee ID already exists in our database" });
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newEmployee = new Employee({
            name: name,
            employee_id: employee_id,
            password: hashedpassword,
            address: address,
            position: position,
            department: department
        });

        await newEmployee.save();

        res.status(201).json({
            message: "Employee created successfully",
            data: newEmployee,
            success: true,
            isLoggedin: false
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

const logInEmployee = async (req, res) => {
    const { employee_id, password } = req.body;

    try {
        const employee = await Employee.findOne({ employee_id });

        if (!employee) {
            return res.status(404).json({ message: "Employee not found", success: false });
        }

        const isMatched = await bcrypt.compare(password, employee.password);

        if (isMatched) {
            const token = setEmployeeToken(employee);
            res.cookie('Employee', token, { maxAge: 3700000, httpOnly: false });
            return res.json({ message: "employee", employee, isLoggedin: true });
        } else {
            return res.status(401).json({ message: "Invaid Credentials" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const GetEmployees = async (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 

    try {
        const totalEmployees = await Employee.countDocuments();
        const totalPages = Math.ceil(totalEmployees / limit);

        const employees = await Employee.find({})
            .skip((page - 1) * limit) 
            .limit(limit);

        if (employees.length > 0) {
            return res.json({
                message: "All employees fetched",
                success: true,
                employees,
                currentPage: page,
                totalPages
            });
        } else {
            return res.status(404).json({ message: "Employees not found", success: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


const GetEmployeeByEmployeeId = async (req, res) => {
    const { employee_id } = req.params;

    try {
        const employee = await Employee.findOne({ employee_id });

        if (employee) {
            return res.json({ message: "Employee fetched", success: true, employee });
        } else {
            return res.status(404).json({ message: "Employee not found", success: false });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const updateEmployeeDetails = async (req, res) => {
    const { employeeId } = req.params;

    try {
        const updatedEmployee = await Employee.findOneAndUpdate(
            { employee_id:employeeId },
            { $set: req.body },
            { new: true }
        );

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json(updatedEmployee);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const deleteEmployee = async (req, res) => {
    const { employeeId } = req.params;

    try {
        const deletedEmployee = await Employee.findOneAndDelete({ employee_id:employeeId });

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        return res.status(200).json({ message: 'Employee deleted successfully', deletedEmployee });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const sortByLocation = async(req,res)=>{
    try {
        const employees = await Employee.find().sort({ address: 1 });

        return res.status(200).json({ message: 'Employee sorted successfully', employees });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const sortByName = async (req,res)=>{
    try{
        const { sortOrder } = req.query;
        let sortOption = 1; 
      
        if (sortOrder === 'desc') {
          sortOption = -1;
        }
      
        const employees = await Employee.find().sort({ name: sortOption });

        return res.status(200).json({ message: 'Employee sorted successfully', employees });

    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
const assignDepartmentToEmployee = async (req, res) => {
    try {
        const { employeeId, department } = req.body;

        const employee = await Employee.findOne({ employee_id: employeeId });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        employee.department = department;
        await employee.save();

        const updatedEmployee = await Employee.findOne({ employee_id: employeeId });

        res.json({ message: 'Department assigned to employee successfully', employee: updatedEmployee });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};










module.exports = {
    createEmployee,
    logInEmployee,
    GetEmployees,
    GetEmployeeByEmployeeId,
    updateEmployeeDetails,
    deleteEmployee,
    sortByLocation,
    sortByName,
    assignDepartmentToEmployee

};
