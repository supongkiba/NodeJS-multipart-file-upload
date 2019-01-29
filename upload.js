#!/usr/bin/env node 
  
var fs= require('fs'); 
var request = require('request'); 

//Path of the file to be uploaded. 
var upfile = ' ';

//Endpoint
var url = ' ';


fs.readFile(upfile, function(err, content){
    if(err){
        console.error(err);
    }



    var boundary = "------------------------";
    var data = "";
    data += "--" + boundary + "\r\n";
    data += "Content-Disposition: form-data; name=\"file\"; filename=\"" + upfile + "\"\r\n";
    data += "Content-Type:application/octet-stream\r\n\r\n";
    var payload = Buffer.concat([
            Buffer.from(data, "utf8"),
            new Buffer(content, 'binary'),
            Buffer.from("\r\n--" + boundary + "\r\n", "utf8"),
    ]);
    var options = {
        method: 'post',
        url: url,
        headers: {"Content-Type": "multipart/form-data; boundary=" + boundary},
        body: payload,
    };
    console.log("Started Uploading.....")
    var start_time= Math.round((new Date()).getTime());

    request(options, function(error, response, body) {
    console.log(body);
    var end_time= Math.round((new Date()).getTime());
    var time_diff=end_time-start_time;
    console.log("''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''");
    console.log("Time to upload: "+time_diff+"ms");

 
    }); 
}); 

