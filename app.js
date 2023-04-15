const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const host = '0.0.0.0';
const port = process.env.PORT || 3000
app.listen(port,host,()=>console.log("Server has started"))
app.get("/",function(req,res){
    
    res.sendFile(__dirname+"/signup.html")
})
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}))
app.post("/",function(req,res){
    var firstName = req.body.fName
    var lastName = req.body.lName
    var email = req.body.email
    console.log(req.body)
    var data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }

        ]
    }
    var jsonData = JSON.stringify(data);
    const url="https://us13.api.mailchimp.com/3.0/lists/45c1ab9ab6";
    const options={
        method:"POST",
        auth:"muthu:c4b9b8338c4ce235f9ba5d2ebc72b35f-us13"
    }
    const request = https.request(url,options,function(response)
    {   
        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html")
        }else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data)
        {
            console.log(JSON.parse(data));
        })
    })
    //request.write(jsonData);
    request.end()
})
app.post("/failure",function(req,res){
    res.redirect("/");
})
//API KEY:c4b9b8338c4ce235f9ba5d2ebc72b35f-us13
//list id:45c1ab9ab6