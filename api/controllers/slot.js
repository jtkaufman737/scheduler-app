const Model = require('../models/index');
const { Appointment, Slot} = Model;

const slotController = {
  all (req,res){
    // returns all slots
    Slot.find({}).exec((err,slots)=> res.json(slots))
  }
};
