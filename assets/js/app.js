$(document).ready(() => {
  $('#inputImage').on('keypress', function (event){
    if(event.which === 13){
       // Replace the subscriptionKey string value with your valid subscription key.
      var subscriptionKey = "3036b6f658f0410b84189d33f3122508";

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
      function showInfo(data){
        $('.holo').empty();
        if(data.length > 0){
          data.forEach(el => {
            var faceAtrr = el.faceAttributes;
            console.log(faceAtrr);

            var gender = faceAtrr.gender;
            if (gender === 'male'){
              gender = 'Masculino'
            }else{
              gender = 'Femenino'
            };
            var age = faceAtrr.age;
            var smile = faceAtrr.smile;
            // --------------------------------------------Maquillaje
            var makeUp = faceAtrr.makeup;
            var eyeMakeUp = makeUp.eyeMakeup;
            if (eyeMakeUp === true) {
              eyeMakeUp = 'si'
            }else{
              eyeMakeUp = 'no'
            };
            var lipMakeup = makeUp.lipMakeup;
            if (lipMakeup === true) {
            lipMakeup = 'si'
            }else{
              lipMakeup = 'no'
            };
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
              <div class="skillbar clearfix " data-percent="${disgust*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Disgusto</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${disgust*100}%</div></div>`);
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
              <div class="skillbar clearfix " data-percent="${surprise*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Sorpresa</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${surprise*100}%</div></div>`);
          });

          $('.skillbar').each(function(){
            $(this).find('.skillbar-bar').animate({
              width:$(this).attr('data-percent')
            },1000);
          });

        }else {
          alert("No se detecta una cara");
        }
      }
      
    } // end if event
  });  // end on key press 
});//end document ready 

// FIREBASE Y CARGA IMAGEN DESDE ORDENADOR
var config = {
    apiKey: "AIzaSyBxBzfeZiZ8iPELu3uU5T8Wb7-AoZ-YmMQ",
    authDomain: "emotion-api-7ffc6.firebaseapp.com",
    databaseURL: "https://emotion-api-7ffc6.firebaseio.com",
    projectId: "emotion-api-7ffc6",
    storageBucket: "emotion-api-7ffc6.appspot.com",
    messagingSenderId: "501726786283"
  };

  firebase.initializeApp(config);
  /*var provider = new firebase.auth.GoogleAuthProvider();

// SIGN UP WITH FIREBASE
 function signIn(){
 firebase.auth().signInWithPopup(provider).then(function(result) {
  // This gives you a Google Access Token. You can use it to access the Google API.
  var token = result.credential.accessToken;
  // The signed-in user info.
  var user = result.user;
  console.log(user.displayName);
  //$('.user_name').append('<h5> Hi ' + user.displayName + '!</h5>');
  $('#section_one').removeClass('hidden');
  $('#section_two').removeClass('hidden');
  $('#section_three').removeClass('hidden');
  $('#google-sign').addClass('hidden');
  
  // ...
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});
}
*/


  window.onload = inicializar;

  //rescatar url desde firebase
  database = firebase.database();
  var ref = database.ref('faceImg');
  ref.on('value', gotData, errData);

  function gotData(data) {
  //console.log(data.val());
    var inforImg = data.val();
    var keys = Object.keys(inforImg);
    //console.log(keys);
    for(var i = 0; i< keys.length; i++){
      var k = keys[i];
      var name = inforImg[k].name;
      var urlFire = inforImg[k].url;

      sessionStorage.setItem('urlFire',inforImg[k].url);
    }
    console.log(urlFire);

  }
  function errData(err){
    console.log('errooooor')
  }

  var fichero;
  var storageRef;
  var faceImgRef;

  function inicializar(){
    fichero = document.getElementById('fichero');
    fichero.addEventListener('change', subirImagenAFirebase, false);
    storageRef = firebase.storage().ref();
    faceImgRef = firebase.database().ref().child('faceImg');
    mostrarImagenesDeFirebase();
    var desertRef = firebase.database().ref('faceImg');
  }

  function mostrarImagenesDeFirebase(){
    faceImgRef.on("value", function(snapshot){
      var datos = snapshot.val();
      var result = "";
      for(var key in datos){
        result += '<img width="200" src="' + datos[key].url + '"/>';
      }
      document.getElementById("img-container").innerHTML = result;
    })
  }

  function subirImagenAFirebase(){
    var imagenASubir = fichero.files[0];

    var uploadTask = storageRef.child('faces/' + imagenASubir.name).put(imagenASubir);

    uploadTask.on('state_changed', 
      function(snapshot){
      // se va mostrando el progreso de la subido de la imagen
    
    }, function(error) {
      // Gestionar el error si se produce
      alert('hubo un error');
    }, function() {
      // Cunado se ha subido exitosamente la imagen
      
    var downloadURL = uploadTask.snapshot.downloadURL;
    crearNodoEnBDFirebase(imagenASubir.name, downloadURL) 
    });
  }

  function crearNodoEnBDFirebase(nombreImagen, downloadURL){
    faceImgRef.push({nombre: nombreImagen, url: downloadURL})
  }

   //limpiar al hacer click 
  $('#fichero').on('click', function(){
    $('.holo').empty();
    $('#sourceImage').empty();

      // Create a reference to the file to delete
    var desertRef = firebase.database().ref('faceImg');

    // Delete the file
    desertRef.remove()
    .then(function() {
   // console.log('exito')
    }).catch(function(error) {
    //  console.log('falló')
    });
    $('#img-container').empty();

  })

  // cargar imagen al hacer click
  function processImage() {
    var subscriptionKey = "3036b6f658f0410b84189d33f3122508";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

      // Request parameters.
      var params = {
        "returnFaceId": "true",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise",
      };
      // Display the image.
      var urlFire = sessionStorage.getItem('urlFire');
      document.querySelector("#img-container").src = urlFire;


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
        data: '{"url": ' + '"' + urlFire + '"}',
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
                <div class="skillbar clearfix " data-percent="${disgust*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Disgusto</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${disgust*100}%</div></div>`);
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
                <div class="skillbar clearfix " data-percent="${surprise*100}%"><div class="skillbar-title" style="background: #c88d08;"><span>Sorpresa</span></div><div class="skillbar-bar" style="background: #d2e078;"></div><div class="skill-bar-percent">${surprise*100}%</div></div>`);
          });

          $('.skillbar').each(function(){
            $(this).find('.skillbar-bar').animate({
              width:$(this).attr('data-percent')
            },1000);
          });

        }else {
          alert("No se detecta una cara");
        }
      }
 
}; 