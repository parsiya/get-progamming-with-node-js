"use strict";

const cities = require("cities");
var zipcode = "20147";
var myCity = cities.zip_lookup(zipcode);
console.log(myCity);