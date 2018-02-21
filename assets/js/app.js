
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
      xhrObj.setRequestHeader('Content-Type', 'application/json');
      xhrObj.setRequestHeader('Ocp-Apim-Subscription-Key', subscriptionKey);
    },
    type: "POST",
    // Request body.
    data: '{"url": ' + '"' + sourceImageUrl + '"}',
  })
    .done(function(data) {
    // Show formatted JSON on webpage.
      // $('#responseTextArea').val(JSON.stringify(data, null, 2));
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
    var idPin = 0;
  function showInfo(data) {
    if (data.length > 0) {
      data.forEach(el => {
        var faceAtrr = el.faceAttributes;
        console.log(faceAtrr);

        var gender = faceAtrr.gender;
        var age = faceAtrr.age;
        var smile = faceAtrr.smile;
        // --------------------------------------------Maquillaje
        var makeUp = faceAtrr.makeup;
        var eyeMakeUp = makeUp.eyeMakeup;
        var lipMakeup = makeUp.lipMakeup;
        // ------------------------------------------------vello facial
        var facialHair = faceAtrr.facialHair;
        var moustache = facialHair.moustache;
        var beard = facialHair.beard;
        var sideburns = facialHair.sideburns;
        // ----------------------------------------------------Emociones
        var emotion = faceAtrr.emotion;
        var anger = emotion.anger; // ira
        //  console.log(anger);
        var contempt = emotion.contempt; // desprecio
        var disgust = emotion.disgust; // disgusto
        var fear = emotion.fear; // miedo
        var happiness = emotion.happiness; // felicidad
        var neutral = emotion.neutral;
        var sadness = emotion.sadness; // tristeza
        var surprise = emotion.surprise; // sorpresa
        console.log(contempt, disgust, fear, happiness, neutral, sadness, surprise);
        // ----------------Genero
        $('.holo').append(`<div class="row container"><div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${gender}"><div class="skillbar-title" style="background: #22ab06;"><span>Genero</span></div><div class="skillbar-bar" style="background: #7be066;"></div><div class="skill-bar-percent">${gender}</div>`);
          // ----------------Edad
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${age}"><div class="skillbar-title" style="background: #124e8c;"><span>Edad</span></div><div class="skillbar-bar" style="background: #4288d0;"></div><div class="skill-bar-percent">${age}</div>`);
          // ----------------Smile
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${smile*100}%"><div class="skillbar-title" style="background: #124e8c;"><span>Sonrisa</span></div><div class="skillbar-bar" style="background: #4288d0;"></div><div class="skill-bar-percent">${smile*100}%</div>`);
        // ----------------eyeMakeup
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${eyeMakeUp}"><div class="skillbar-title" style="background: #124e8c;"><span>EyeMakeup</span></div><div class="skillbar-bar" style="background: #4288d0;"></div><div class="skill-bar-percent">${eyeMakeUp}</div>`);
        // ----------------lipMakeup
        $('.holo').append(`<div class=""><div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${lipMakeup}"><div class="skillbar-title" style="background: #124e8c;"><span>LipMakeup</span></div><div class="skillbar-bar" style="background: #4288d0;"></div><div class="skill-bar-percent">${lipMakeup}</div></div>`);
        // ----------------moustache
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${moustache*100}%"><div class="skillbar-title" style="background: #124e8c;"><span>Bigote</span></div><div class="skillbar-bar" style="background: #4288d0;"></div><div class="skill-bar-percent">${moustache*100}%</div>`);
        // ----------------beard
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${beard*100}%"><div class="skillbar-title" style="background: #124e8c;"><span>Barba</span></div><div class="skillbar-bar" style="background: #4288d0;"></div><div class="skill-bar-percent">${beard*100}%</div>`);
        // ----------------sideburns
        $('.holo').append(`<div class="col-lg-offset-3 col-lg-pull-3 col-xs-3 col-sm-3 col-md-3 col-lg-3 ">
          <div class="skillbar clearfix " data-percent="${sideburns*100}%"><div class="skillbar-title" style="background: #124e8c;"><span>Patillas</span></div><div class="skillbar-bar" style="background: #4288d0;"></div><div class="skill-bar-percent">${sideburns*100}%</div>`);
        $('.holo').append(`<div class="row container"><div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent=""><div class="skillbar-title" style="background: #c88d08;"><span>Emociones</span></div><div class="skillbar-bar" style="background: #4288d0;"></div><div class="skill-bar-percent"></div>`);
        // ----------------anger
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${anger*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Ira</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${anger*100}%</div>`);
        // ----------------contempt
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${contempt*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Desprecio</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${contempt*100}%</div>`);
        // ----------------fear
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${fear*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Miedo</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${fear*100}%</div>`);
        // ----------------disgust
        $('.holo').append(`<div class=""><div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${disgust*100}$"><div class="skillbar-title" style="background: #c88d08;"><span>Disgusto</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${disgust*100}$</div></div>`);
        // ------------------happiness
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${happiness*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Felicidad</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${happiness*100}%</div>`);
        // ----------------neutral
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${neutral*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Neutral</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${neutral*100}%</div>`);
        // ----------------sadness
        $('.holo').append(`<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${sadness*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Tristeza</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${sadness*100}%</div>`);
        // ----------------disgust
        $('.holo').append(`<div class=""><div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
          <div class="skillbar clearfix " data-percent="${surprise*100}$"><div class="skillbar-title" style="background: #c88d08;"><span>Sorpresa</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${surprise*100}$</div></div>`);

      });


      // var faceAtrr = data[0].faceAttributes;
      // console.log(faceAtrr);
      // console.log(smile);
      // var glasses = faceAtrr.glasses;
      // console.log(glasses);
      // -------------------------------------------------------------Accesorios
      // var accessories = faceAtrr.accessories;
      // var headwear = accessories.headwear;
      // var glasses = accessories.glasses;
      // var mask = accessories.mask;
      // console.log(headwear, glasses, mask);
      // move(age);
      $('.skillbar').each(function(){
    		$(this).find('.skillbar-bar').animate({
    			width:$(this).attr('data-percent')
    		},1000);
    	});


      // var found = resp.find(function (el) {
      //   return el = faceAtrr;
      //
      // })
      // console.log(found);
      // var len = resp.length;
      // console.log(len);
    } else {
      console.log("No se detecta una cara");
    }
    // var faceId= resp[0].faceId;
    // console.log(faceId);
  }
};
function move(pepa) {
  var elem = document.getElementById("myBar_${idPin}");
  var width = 1;
  var id = setInterval(frame, 10);
  function frame() {
    if (width >= pepa) {
      clearInterval(id);
    } else {
      width++;
      elem.style.width = width + '%';
    }
  }
}
// $(document).ready(function(){

// });
