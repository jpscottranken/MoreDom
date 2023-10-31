/*
 *
 *	Body mass index (a.k.a. BMI) is a measure
 * 	of body fat. It is commonly used within the
 *	health industry to determine whether your
 *	weight is healthy for your height.
 *
 *	The BMI formula (inches and pounds is):
 *	BMI = (weight_in_lbs / (height * height)) * 703
 *
 *  For this program, we are assuming the following:
 *
 *  min height: 12 inches   max height:  96 inches
 *  min weight:  1 pound    max weight: 777 pounds
 *
 *	The BMI weight status chart is shown below:
 *
 *	BMI						Weight Status
 *	=====================================
 *	<  18.5					    Underweight
 *	>= 18.5 && < 25.0		Optimal Weight
 *	>= 25.0 && < 30.0		Overweight
 *	>= 30.0					    Obese
 *
 *	An out-of-range height and/or weight are
 *	given an associated error message to the
 *	right of the associated field.
 *
 *	If an in-range height and an in-range
 *	weight are inputted, both the BMI and the
 *	BMI status (underweight, optimal weight,
 *	overweight, or obese) are output.
 *
 */

"use strict";

const $ = (selector) => document.querySelector(selector);

//  Declare and initialize program constants
const MINHEIGHT = 12;
const MAXHEIGHT = 96;
const MINWEIGHT = 1;
const MAXWEIGHT = 777;
const MINOPTIMAL = 18.5;
const MINOVER = 25.0;
const MINOBESE = 30.0;
const HOOR = "Height OOR";
const WOOR = "Weight OOR";

//  Declare and initialize program variables
let isValid = true;
let theStatus = "";
let theResult = "";
let elem = "";
let height = 0;
let weight = 0;

const calculate = () => {
  //  Declare a timer
  let timer = null;

  //  Read in height
  height = parseInt($("#height").value);

  //  Read in weight
  weight = parseInt($("#weight").value);

  //  Validate height
  isValid = validateHeight();

  //  Validate weight
  if (isValid) {
    //  if (isValid === true)
    isValid = validateWeight();
  } else {
    return; //  Invalid height inputted
  }

  //  This means a valid height and a
  //  valid weight were both inputted.
  //  Now calculate the BMI and then
  //  the BMI status.
  if (isValid) {
    //  Call routine to calcuate BMI
    let bmi = calculateTheBMI();

    //  Set BMI textbox value
    $("#result").value = bmi;

    setTheBMIStatus(bmi);

    setTheBMIPicture();

    timer = setTimeout(clearAll, 5000);
  } else {
    return; //  Invalid weight inputted
  }
};

const validateHeight = () => {
  //  Return value
  let retVal = true;
  let timer = null;

  //  isNaN and range check on height
  if (isNaN(height) || height < MINHEIGHT || height > MAXHEIGHT) {
    //  Set height out-of-range message
    $("#height").nextElementSibling.textContent = HOOR;

    //  Set a timer to go off in 5 seconds
    timer = setTimeout(clearAll, 5000);

    retVal = false;
  } else {
    //  Set height out-of-range message area to blank
    $("#height").nextElementSibling.textContent = "";
  }

  return retVal;
};

const validateWeight = () => {
  //  Return value
  let retVal = true;
  let timer = null;

  //  isNaN and range check on weight
  if (isNaN(weight) || weight < MINWEIGHT || weight > MAXWEIGHT) {
    //  Set weight out-of-range message
    $("#weight").nextElementSibling.textContent = WOOR;

    //  Set a timer to go off in 5 seconds
    timer = setTimeout(clearAll, 5000);

    retVal = false;
  } else {
    //  Set weight out-of-range message area to blank
    $("#weight").nextElementSibling.textContent = "";
  }

  return retVal;
};

//  Return the calculated BMI
const calculateTheBMI = () => ((weight * 703) / Math.pow(height, 2)).toFixed(2);

//  Set BMI status to either:
//  Underweight, Optimal weight,
//  Overweight, or Obese
const setTheBMIStatus = (bmi) => {
  if (bmi < MINOPTIMAL) {
    //  BMI is < 18.5
    theStatus = "Underweight";
  } else if (bmi >= MINOPTIMAL && bmi < MINOVER) {
    //  BMI >= 18.5 < 25.0
    theStatus = "Optimal weight";
  } else if (bmi >= MINOVER && bmi < MINOBESE) {
    //  BMI >= 25.0 < 30.0
    theStatus = "Overweight";
  } else {
    theStatus = "Obese";
  }

  //  Place status value in associated textbox
  $("#status").value = theStatus;
};

//  Set associated BMI picture
const setTheBMIPicture = () => {
  //  Create a new image element
  elem = document.createElement("img");

  //  Clear out existing image <div> area
  $("#weightStatusPicture").value = "";

  switch (theStatus) {
    case "Underweight":
      elem.setAttribute("src", "images/underweight.jpg");
      break;

    case "Optimal weight":
      elem.setAttribute("src", "images/optimalweight.jpg");
      break;

    case "Overweight":
      elem.setAttribute("src", "images/overweight.jpg");
      break;

    case "Obese":
      elem.setAttribute("src", "images/obese.jpg");
      break;

    default:
      elem.setAttribute("src", "images/na.jpg");
      break;
  }

  //  Put the picture in the <div> area
  document.getElementById("weightStatusPicture").appendChild(elem);
};

//  Clear routine
const clearAll = () => {
  //  Clear out picture <div> area
  $("#weightStatusPicture").textContent = "";

  //  Rest global variables
  weight = 0;
  height = 0;
  theResult = "";
  theStatus = "";

  //  Clear out all textboxes
  $("#height").value = "";
  $("#weight").value = "";
  $("#result").value = "";
  $("#status").value = "";

  //  Add the "*" to the right
  //  of height and weight textboxes
  $("#height").nextElementSibling.textContent = "*";
  $("#weight").nextElementSibling.textContent = "*";

  //  Set the focus to the height textbox
  $("#height").focus();
};

//  Add the eventListeners
document.addEventListener("DOMContentLoaded", () => {
  $("#calculate").addEventListener("click", calculate);
  $("#clear").addEventListener("click", clearAll);
});
