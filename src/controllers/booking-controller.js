const {bookingService}=require('../services/index');
const bookingservice=new bookingService();
const create=async (req,res)=>{
    try{
        const response =await bookingservice.createBooking(req.body);
       return res.status(201).json({
        message :"Successfully diliverd",
        success:true,
        data:response,
        err:{}
       })
     }
     catch(error){
        console.log(error);
        return res.status(500).json({
            message:'Something went wrong',
            data:{},
            success:false,
            err:error
        })
     }
}
module.exports={create}