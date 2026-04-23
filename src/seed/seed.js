const mongoose = require('mongoose');
require('dotenv').config();

//const { v7: uuidv7 } = require("uuid");
const fs = require("fs");
const Profile = require("../models/profile.models");

async function seed() {

 const {v7: uuidv7} = await import ('uuid');
 try {
    await mongoose.connect("mongodb+srv://adetotounadebowale_db_user:QFbnHPqZqBrbSo7i@cluster0.xnbqdby.mongodb.net/profileSystemDB");
    console.log("Script connected to database ")
 } catch (error) {
    console.error("script not connecting to database", error)
 }

 const data = JSON.parse(fs.readFileSync("../seed/seed_profiles.json"));

 for (let profile of data.profiles) {
   const exists = await Profile.findOne({ name: profile.name });

   if (!exists) {
     await Profile.create({
       id: uuidv7(), // generates UUID v7
       ...profile
     });
   }
 }

 console.log("Seeding complete");
 process.exit();
}


seed();
