 const express = require("express");
 const bodyParser = require("body-parser");
 const request = require("request");

 const app = express();
 app.use(bodyParser.urlencoded({
    extended: true
 }));
 app.use(express.static("public"));

 app.post("/", function (req, res) {
    //  console.log(req.body);
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us{{x}}.api.mailchimp.com/3.0/lists/{{list-id}}",
        method: "POST",
        headers: {
        "Authorization": "{{name}} {{API-keys}}"
        },
        body: jsonData
    };

    request(options, function (error, response, body) {
        if(error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                // res.send("<h1>All clear.</h1>");
                res.sendFile(__dirname + "/success.html");
            } else {
                // res.send("<h1>Something wrong!</h1>");
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
 });

 app.post("/failure", function (req, res) {
    res.redirect("/");
 });

 app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
 });

 app.listen(process.env.PORT || 8080, function () {
    console.log("The server is running on port 8080.");
 });

