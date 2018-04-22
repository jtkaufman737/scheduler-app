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
  }
}
