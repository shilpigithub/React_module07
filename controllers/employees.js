import Employee from '../models/Employee.js'

const getAllEmployees = async (req, res) => {
    try{
        const employees = await Employee.find({})
        res.status(200).json( { employees, count: employees.length })
        //res.status(200).json({ employees })
        //res.send('Get all employees')

    }catch(err){
        res.status(500).json({msg: err})
    }
}

const getEmployee = async (req, res) => {
    try{
        //cast id property to be employeeId alias here . Since id is very generic in routes we 
        //are also sending it as id we need to cast or create alias of id here to send
       // let id = req.params doesn't work

       let {id:employeeId} = req.params
        const employee = await Employee.findOne({ _id: employeeId})
        if (!employee){
            return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
        }

        res.status(200).json( { employee })
        //res.send('Get a single employee')

    }catch(err){
        res.status(500).json({msg: err})
    }
}

const createEmployee = async (req, res) => {
    try{
        const employee = await Employee.create(req.body)
       res.status(201).json({employee})
        // res.status(201).json({ msg: 'Employee added successfully' })
        //res.status(201).json({employee})
        //res.send('Create a new employee')

    }catch(err){
        res.status(500).json({msg: err})
    }
}

const updateEmployee = async (req, res) => {
    try {
        let {id: employeeId} = req.params

        //if we not set new: true  means update the document and also return the newly updated document
        //runValidators: true means also run validation on this update
        const employee = await Employee.findOneAndUpdate({ _id: employeeId}, req.body,{
            new: true,
            runValidators: true
        })
        if(!employee){
            return res.status(404).json({msg: 'No employee with id ${employeeId} found.'})
        }
        res.status(200).json({msg: 'successfully updated employee'})
        //res.send('Update an existing employee')
    } catch (err) {
        res.status(500).json({ msg: err})
    }

    
}

const deleteEmployee = async (req, res) => {
    try{
        //cast id property to be employeeId alias here . Since id is very generic in routes we 
        //are also sending it as id we need to cast or create alias of id here to send
       // let id = req.params doesn't work

       let {id:employeeId} = req.params
        const employee = await Employee.findOneAndDelete({ _id: employeeId})
        if (!employee){
            return res.status(404).json({msg: `No employee with ID ${employeeId} found.`})
        }

        res.status(200).json( { msg: 'Employee successfully deleted' })
        //res.send('Delete an employee')

    }catch(err){
        res.status(500).json({msg: err})
    }
    
}

export {
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
}