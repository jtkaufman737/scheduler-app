var Model = require("../models/index");
const { Appointment, Slot } = Model;
const Nexmo = require('nexmo');

const AppointmentController = {
  all(req,res) {
    // returns all appointments
    Appointment.find({}).exec((err,appointments) => res.json(appointments));
  },
  create(req,res){
    var requestBody = req.body;

    var newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newslot.save();

    var newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id
    });

    const nexmo = new Nexmo({
      apiKey: 'b7aff4ef',
      apiSecret: 'FJnoAS03PxVKt41Q',
    });

    let msg =
      requestBody.name + " " + "this message is to confirm your appointment at" + " " + requestBody.appointment;

    newappointment.save((err,saved) => {
      Appointment.find({_id: saved._id}).populate("slots").exec((err,appointment)=> res.json(appointment));

      const from = VIRTUAL_NUMBER;
      const to = RECIPIENT_NUMBER;

      nexmo.message.sendSms(from, to, msg, (err, responseData)=>{
        if (err) {
          console.log(err);
        } else {
          console.dir(responseData);
        }
      });
    });
  }
};
