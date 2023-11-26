const mongoose = require("mongoose");

const plantsSchema = mongoose.Schema({
  plantId: { type: String, required: true },
  commonName: { type: String, required: true},
  scientificName: Array,
  otherName: Array,
  watering: String,
  images: Array,
  cycle: String,
  sunLight: Array
});

const PlansModel = mongoose.model("plants", plantsSchema);
module.exports = PlansModel;