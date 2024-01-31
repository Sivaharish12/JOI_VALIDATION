const express=require('express');
const app=express();
const Joi=require('joi');

app.use(express.json());

const signup_schema=Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(5).max(16).required(),
    confirmpassword:Joi.ref("password"),
    address:{
        state:Joi.string().length(2).required(),
    },
    DOB:Joi.date().greater(new Date("2012-01-01")).required(),
    referred:Joi.boolean().required(),
    refferedDetails:Joi.string().when("referred",{
        is:true,
        then:Joi.string().required().min(3).max(50),
        otherwise:Joi.string().optional(),
    }),
    hobbies: Joi.array().items(Joi.string()),
    acceptTos:Joi.boolean().truthy("yes").valid(true).required()
});



app.post('/signup',(req,res,next)=>{
    const {error,value}=signup_schema.validate(req.body);
    if(error){
        console.log(error);
        res.send(`The resulting error is ${error}`);
    }
    else{
        res.send("The signup sucessfull");
    }
    res.send('sucessfully signed up');
});

app.listen(5000,()=>{
    console.log("The server is listening on the port number 5000");
});


// -----------------------------------------------------------------------------------------------------------------------------------------------

// // THE API INPUT FOR THE VALIDATION USING JOI

// {
//     "email":"harish@gmail.com",
//     "password":"123456",
//     "confirmpassword":"123456",
//     "address":{
//         "state":"IN"
//     },
//     "DOB":"2024-01-30",
//     "referred":true,
//     "refferedDetails":"i am a referal",
//     "hobbies":["music","movies","reading books"],
//     "acceptTos":"yes"
// }
