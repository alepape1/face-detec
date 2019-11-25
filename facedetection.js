'use strict';

const request = require('request');
const fs = require('fs');

// Replace <Subscription Key> with your valid subscription key.
const subscriptionKey = '32b7edaf9e1c4c21a571b0f8a03a3e67';

// You must use the same location in your REST call as you used to get your
// subscription keys. For example, if you got your subscription keys from
// westus, replace "westcentralus" in the URL below with "westus".
const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';

const imageUrl = 'mayte3.jpg'
    // 'https://upload.wikimedia.org/wikipedia/commons/3/37/Dagestani_man_and_woman.jpg';

// Request parameters.
const params = {
    'returnFaceId': 'true',
    'returnFaceLandmarks': 'false',
    'returnFaceAttributes': 'age,gender,headPose,smile,facialHair,glasses,' +
        'emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
};

const options = {
    uri: uriBase,
    qs: params,
    // body: '{"url": ' + '"' + imageUrl + '"}',
    body: fs.readFileSync('mayte1.jpg'),
    headers: {
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
};

request.post(options, (error, response, body) => {
  if (error) {
    console.log('Error: ', error);
    return;
  }
  let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
  // console.log('JSON Response\n');
  // console.log(jsonResponse);
  var obj=JSON.parse(response.body)
  console.log("Hay " + obj.length + " personas en la foto")
  console.log(obj)
  console.log(obj[0].faceAttributes.emotion)
  if(obj.length>1){
  console.log(obj[1].faceAttributes.emotion)
  }
  console.log("The person number 1 is " + obj[0].faceAttributes.age + " and is " + obj[0].faceAttributes.gender)
  if(obj[0].faceAttributes.smile>0.5){
    console.log("This persona is smiling" )
  }else{
    console.log("This is not smilling")
  }

//aa9f9624-8545-4556-8128-b2396bd9d69b
  // console.log(obj[0].faceId)
  // console.log(obj[0].faceAttributes.gender)

});
