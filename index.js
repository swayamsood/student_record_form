const fs = require("fs");
const bodyPrser = require("body-parser");
const express = require("express");
const app = express();

app.use(bodyPrser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/form.html");
});
var myObj;
app.post("/data1", (req, res) => {
  var s_Id = req.body.s_id;
  var s_name = req.body.fname;
  var s1_name = req.body.lname;
  var address = req.body.tarea;
  var WD = parseInt(req.body.WD);
  var NALR = parseInt(req.body.NALR);
  var BEE = parseInt(req.body.BEE);
  var CPP = parseInt(req.body.CPP);
  var JAVA = parseInt(req.body.JAVA);

  var total = parseInt(WD + NALR + BEE + CPP + JAVA);
  var average = parseInt(total / 5);
  var grade;
  if (average >= 90 && average<=100) 
  {
    grade = "A";
  }
  else if (average >= 80 && average<90) 
  {
    grade = "B";
  }
  else if (average >= 70 && average<80) 
  {
    grade = "C";
  }
  else if (average >= 60 && average<70) 
  {
    grade = "D";
  }
  else if (average >= 34 && average < 60) 
  {
    grade = "E";
  }
  else if (average < 34) 
  {
    grade = "F";
  }

   let obj={
    StudentId : parseInt(`${s_Id}`),
    StudentFName : `${s_name}` ,
    StudentLName : `${s1_name}` ,
    Address : `${address}` ,
    Total_Marks_Obtained : parseInt(`${total}`) ,
    Average : parseInt(`${average}`) , 
    Grade : `${grade}` 
   }
   
   var data=fs.readFileSync("data.json");
   myObj=JSON.parse(data);
   myObj.push(obj);



   var updatedData=JSON.stringify(myObj);

   fs.writeFile("data.json",updatedData,(err)=>{
    if(err){
      console.log(err);
    }

    else {
      console.log("New Data added");
    }
   })


   fs.readFile("data.json",(err)=>{
    if(err){
      console.log(err);
    }

    else {
      console.log(fs.readFileSync("data.json").toString());
    }
   })

   return res.json({"Student Record : ":obj});
});

   
app.get("/get/all",(req,res)=>{
  return res.json({"Student Record : ":records});
} )


app.listen(3000);
