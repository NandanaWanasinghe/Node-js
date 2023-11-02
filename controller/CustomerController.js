const db = require('../database/DatabaseConnection');
const bcrypt = require('bcrypt');


const createCustomer= async (req,resp)=>{
    const hashPassword=await encrypt(req.body.password);
    const customer ={
        nic:req.body.nic,
        name:req.body.name,
        address:req.body.address,
        password:hashPassword,
        salary:req.body.salary
    }
    const createQuery = 'INSERT INTO customer(nic,name,address,password,salary) VALUES (?,?,?,?,?)';
    db.query(createQuery,[
        customer.nic,customer.name,customer.address,customer.password,customer.salary
    ],(err,result)=>{
        if (err) {
            console.log(err);
            return resp.status(500).json({error:'something went wrong'});
        }
        return resp.status(201).json({message:'customer was saved'});
            
    });
}
async function encrypt(password){
    return bcrypt.hash(password,10);
}


const findCustomer= async (req,resp)=>{
    const nic = req.params.nic;
    const createQuery = 'SELECT * FROM customer WHERE nic=?';
    db.query(createQuery,[nic],(err,result)=>{
        if (err) {
            console.log(err);
            return resp.status(500).json({error:'something went wrong'});
        }
        return resp.status(200).json({data:result});
            
    });
}

const updateCustomer=(req,resp)=>{
    const password=req.params.password;
        const createFetchQuery= 'SELECT * FROM customer WHERE nic=?';
        db.query(createFetchQuery,[req.body.nic],(err,selectedCustomer)=>{
            if(err){
                console.log(err);
                return resp.status(500).json({error:'something went wrong!'});
            }

            bcrypt.compare(password, selectedCustomer[0].password, function(err, result) {
                if(result){
                   
                    const customer={
                        nic:req.body.nic,
                        name:req.body.name,
                        address:req.body.address,
                        salary:req.body.salary
                    };
                    const updateQuery= 'UPDATE customer SET name=?,address=?,salary=? WHERE nic=?';
                    db.query(updateQuery,[
                        customer.name,customer.address,customer.salary,customer.nic
                    ],(error,updatedRecord)=>{
                        if(error){
                            console.log(error);
                            return resp.status(500).json({error:'something went wrong'});
                        }
                        return resp.status(201).json({message:'customer was updated!'});
                    });
                
                }else{
                    return resp.status(403).json({error:'Wrong password!'});
                }
            }); 
        });
}

const deleteCustomer=(req,resp)=>{
    const nic = req.params.nic;

    const deleteQuery = 'DELETE FROM customer WHERE nic=?';
    db.query(deleteQuery,[nic],(err,result)=>{
        if(err){
            console.log(err);
            return resp.status(500).json({error:'something went wrong'});
        }
        return resp.status(204).json({error:'customer deleted'});
    });
}

const findAllCustomers=(req,resp)=>{
    const findQuery = 'SELECT * FROM customer';
    db.query(findQuery,(err,result)=>{
        if(err){
            console.log(err);
            return resp.status(500).json({error:'something went wrong'});
        }
        return resp.status(200).json({data:result});
    });
}
module.exports={
    createCustomer,
    updateCustomer,
    findCustomer,
    findAllCustomers,
    deleteCustomer
}
