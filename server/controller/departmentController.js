const Department = require('../model/departmentModel');

const createDepartment = async (req, res) => {
    try {
        const { name } = req.body;
        const department = new Department({ name });
        await department.save();
        res.status(201).json({ message: 'Department created successfully', department });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json({ message: 'All departments fetched', departments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id,"=====================")
        const { name } = req.body;
        console.log(name,"=====================")
        const updatedDepartment = await Department.findByIdAndUpdate(id, { name }, { new: true });

        console.log(updatedDepartment,"=====================")

        if (!updatedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.json({ message: 'Department updated successfully', updatedDepartment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDepartment = await Department.findByIdAndDelete(id);

        if (!deletedDepartment) {
            return res.status(404).json({ message: 'Department not found' });
        }

        res.json({ message: 'Department deleted successfully', deletedDepartment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports={deleteDepartment,updateDepartment,createDepartment,getDepartments}