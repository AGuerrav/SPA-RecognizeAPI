
function processImage() {
  // **********************************************
  // *** Update or verify the following values. ***
  // **********************************************

  // Replace the subscriptionKey string value with your valid subscription key.
  var subscriptionKey = "3036b6f658f0410b84189d33f3122508";

  // Replace or verify the region.
  //
  // You must use the same region in your REST API call as you used to obtain your subscription keys.
  // For example, if you obtained your subscription keys from the westus region, replace
  // "westcentralus" in the URI below with "westus".
  //
  // NOTE: Free trial subscription keys are generated in the westcentralus region, so if you are using
  // a free trial subscription key, you should not need to change this region.
  var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

  // Request parameters.
  var params = {
    "returnFaceId": "true",
    "returnFaceLandmarks": "false",
    "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
  };
  // Display the image.
  var sourceImageUrl = document.getElementById("inputImage").value;
  document.querySelector("#sourceImage").src = sourceImageUrl;

  // Perform the REST API call.
  $.ajax({
    url: uriBase + "?" + $.param(params),
    // Request headers.
    beforeSend: function(xhrObj) {
      xhrObj.setRequestHeader("Content-Type","application/json");
      xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
    },
    type: "POST",
    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  })
    .done(function(data) {
    // Show formatted JSON on webpage.
      $('#responseTextArea').val(JSON.stringify(data, null, 2));
      console.log(data);
      // console.log(data[0].faceId);
      showInfo(data);
    })

    .fail(function(jqXHR, textStatus, errorThrown) {
    // Display error message.
      var errorString = (errorThrown === "") ? "Error. " : errorThrown + " (" + jqXHR.status + "): ";
      errorString += (jqXHR.responseText === "") ? "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
        jQuery.parseJSON(jqXHR.responseText).message : jQuery.parseJSON(jqXHR.responseText).error.message;
      alert(errorString);
    });
  function showInfo(resp) {
    if (resp.length = 1) {
      var faceAtrr = resp[0].faceAttributes;
      console.log(faceAtrr);
      var smile = faceAtrr.smile;
      // console.log(smile);
      var gender = faceAtrr.gender;
      var age = faceAtrr.age;
      var glasses = faceAtrr.glasses;
      console.log(glasses);
      // --------------------------------------------Maquillaje
      var makeUp = faceAtrr.makeup;
      // console.log(makeUp);
      var eyeMakeUp = makeUp.eyeMakeup;
      // console.log(eyeMakeUp);
      var lipMakeup = makeUp.lipMakeup;
      // console.log(lipMakeup);
      // ------------------------------------------------vello facial
      var facialHair = faceAtrr.facialHair;
      // console.log(facialHair);
      var moustache = facialHair.moustache;
      // console.log(moustache);
      var beard = facialHair.beard;
      var sideburns = facialHair.sideburns;
      // console.log(sideburns);
      // ----------------------------------------------------Emociones
      var emotion = faceAtrr.emotion;
      //  console.log(emotion);
      var anger = emotion.anger; // ira
      //  console.log(anger);
      var contempt = emotion.contempt; // desprecio
      var disgust = emotion.disgust; // disgusto
      var fear = emotion.fear; // miedo
      var happiness = emotion.happiness; // felicidad
      var neutral = emotion.neutral;
      var sadness = emotion.sadness; // tristeza   var surprise = emotion.surprise; //sorpresa
      //  console.log(contempt, disgust, fear, happiness, neutral, sadness, surprise);
      // -------------------------------------------------------------Accesorios
      var accessories = faceAtrr.accessories;
      var headwear = accessories.headwear;
      var glasses = accessories.glasses;
      var mask = accessories.mask;
      console.log(headwear, glasses, mask);

      var found = resp.find(function (el) {
        return el = faceAtrr;

      })
      console.log(found);

      // var len = resp.length;
      // console.log(len);

    } else {
      console.log("no se encuentra imagen");
    }
    // var faceId= resp[0].faceId;
    // console.log(faceId);

  }
};
