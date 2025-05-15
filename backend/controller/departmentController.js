// import Department from "../models/departmentModel.js";

// const createDepartment = async (req, res) => {
//     try {
//         const { name } = req.body;
//         if (!name) {
//             return res.status(400).json({ error: "Department name is required" });
//         }
//         const newDept = new Department({ name });
//         await newDept.save();
//         res.status(201).json(newDept);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };


// const getDepartments = async (req, res) => {
//     try {
//         const departments = await Department.find();
//         res.status(200).json(departments);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };


// const deleteDepartment = async (req, res) => {
//     try {
//         await Department.findByIdAndDelete(req.params.id);
//         res.json({ message: "Department deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };



// export { createDepartment, getDepartments, deleteDepartment };

// import Department from "../models/departmentModel.js";

// // Create Department
// const createDepartment = async (req, res) => {
//     try {
//         const { name, specialization, image } = req.body;

//         // Validate required fields
//         if (!name || !specialization || !image) {
//             return res.status(400).json({ error: "All fields (name, specialization, image) are required" });
//         }

//         const newDept = new Department({
//             name,
//             specialization,
//             image,
//         });

//         await newDept.save();
//         res.status(201).json(newDept);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // Get all Departments
// const getDepartments = async (req, res) => {
//     try {
//         const departments = await Department.find();
//         res.status(200).json(departments);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // Get a specific department by ID
// const getDepartmentById = async (req, res) => {
//     try {
//         const department = await Department.findById(req.params.id);
//         if (!department) {
//             return res.status(404).json({ message: "Department not found" });
//         }
//         res.status(200).json(department);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // Update Department
// const updateDepartment = async (req, res) => {
//     try {
//         const { name, specialization, image } = req.body;

//         // Ensure at least one field is provided
//         if (!name && !specialization && !image) {
//             return res.status(400).json({ error: "At least one field (name, specialization, or image) must be provided to update" });
//         }

//         const updatedDept = await Department.findByIdAndUpdate(
//             req.params.id,
//             { name, specialization, image },
//             { new: true } // Returns the updated department
//         );

//         if (!updatedDept) {
//             return res.status(404).json({ message: "Department not found" });
//         }

//         res.status(200).json(updatedDept);
//     } catch (err) {
//         res.status(400).json({ error: err.message });
//     }
// };

// // Delete Department
// const deleteDepartment = async (req, res) => {
//     try {
//         const deletedDept = await Department.findByIdAndDelete(req.params.id);

//         if (!deletedDept) {
//             return res.status(404).json({ message: "Department not found" });
//         }

//         res.json({ message: "Department deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// export { createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment };



import Department from "../models/departmentModel.js";
import fs from "fs";

const createDepartment = async (req, res) => {
    try {
        const { name, specialization } = req.body;
        const image = req.file?.path || req.file?.secure_url || null;

        if (!name || !specialization || !image) {
            return res.status(400).json({ error: "All fields (name, specialization, image) are required" });
        }

        const newDept = new Department({
            name,
            specialization,
            image,
        });

        await newDept.save();
        res.status(201).json(newDept);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all Departments
const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.status(200).json(departments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get a specific department by ID
const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update Department
const updateDepartment = async (req, res) => {
    try {
        const { name, specialization } = req.body;
        const image = req.file?.path || req.file?.secure_url || null;

        if (!name && !specialization && !image) {
            return res.status(400).json({ error: "At least one field (name, specialization, or image) must be provided to update" });
        }

        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        if (image && department.image) {
            // Remove the old image file from the server
            fs.unlink(`uploads/${department.image}`, () => { });
        }

        // Update the department fields
        department.name = name || department.name;
        department.specialization = specialization || department.specialization;
        if (image) department.image = image;

        await department.save();
        res.status(200).json(department);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete Department
const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        if (department.image) {
            // Remove the image file from the server
            fs.unlink(`uploads/${department.image}`, () => { });
        }

        await department.deleteOne();
        res.json({ message: "Department deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export {  createDepartment, getDepartments, getDepartmentById, updateDepartment, deleteDepartment };