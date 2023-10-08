const axios=require('axios');

const {bookingRepostory}=require('../repository/index');


class BookingService{
    constructor(){
        this.bookingrepository=new bookingRepostory()
    }
    async createBooking(data){
        try{
          const flightId=data.flightId;
          let filghtUrl=process.env.Flight_Url+"/flight/"+flightId;
          const filght=await axios.get(filghtUrl);
          const responce=filght.data.data;
          const flightPrice=responce.price;
          
          if(data.noOfSeats>responce.totalSeats)
          {
            throw {error:"Not Enough Seats"}
          }
          const totalCost=flightPrice*data.noOfSeats;
          console.log(totalCost+"  "+flightPrice+" "+data.noOfSeats)
          const bookingPayload={...data,totalCost};
          const booking=await this.bookingrepository.create(bookingPayload);
          const updateFlightUrl=process.env.Flight_Url+"/flight/"+flightId;
          await axios.patch(updateFlightUrl,{totalSeats:responce.totalSeats-booking.noOfSeats});
          const fianlbooking =await this.bookingrepository.update(booking.id,{status:"Booked"});
          return fianlbooking;
        }
        catch(error){
            console.log("An error in service in booking");
            throw error;
        }
    }
}
module.exports=BookingService;