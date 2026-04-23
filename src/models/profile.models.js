const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
 id: {
   type: String,
   required: true,
   unique: true
 },
 name: {
   type: String,
   unique: true
 },
 gender: String,
 gender_probability: Number,
 age: Number,
 age_group: String,
 country_id: String,
 country_name: String,
 country_probability: Number,
 created_at: {
   type: Date,
   default: () => new Date()
 }
});


const Profile = mongoose.model("Profile", profileSchema);

module.exports = Profile;
