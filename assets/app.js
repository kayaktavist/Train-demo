// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDh6cHdVXDCMqTHOsikrJoX7R7ydM0XxHQ",
    authDomain: "train-demo.firebaseapp.com",
    databaseURL: "https://train-demo.firebaseio.com",
    projectId: "train-demo",
    storageBucket: "train-demo.appspot.com",
    messagingSenderId: "603586887939"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  // 2. Button for adding train
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var dest = $("#dest-input").val().trim();
    // v
    var first = $("#start-input").val().trim();
    var freq = $("#rate-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      tdest: dest,
      firstT: first,
      tFreq: freq
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.tdest);
    console.log(newTrain.firstT);
    console.log(newTrain.tFrequency);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#dest-input").val("");
    $("#start-input").val("");
    $("#rate-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var dest = childSnapshot.val().tdest;
    var first = childSnapshot.val().firstT;
    var freq = childSnapshot.val().tFreq;
  
    // Train Info
    console.log(trainName);
    console.log(dest);
    console.log(first);
    console.log(freq);

   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(first, "HH:mm").subtract(1, "years");
   console.log(firstTimeConverted);

   // Current Time
   var currentTime = moment();
   console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

   // Difference between the times
   var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
   console.log("DIFFERENCE IN TIME: " + diffTime);

   // Time apart (remainder)
   var tRemainder = diffTime % freq;
   console.log(tRemainder);

   // Minute Until Train
   var tMinutesTillTrain = freq - tRemainder;
   console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
   var nextTrain = moment().add(tMinutesTillTrain, "minutes").format('hh:mm');
   console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  
    // Create the new row
    var newRow = $("<tr>").append(
        
      $("<th>").text(trainName).attr("scope", "col"),
      $("<th>").text(dest),
      $("<th>").text(freq),
      $("<th>").text(nextTrain),
      $("<th>").text(tMinutesTillTrain),
    );
  
    // Append the new row to the table
    $("tbody").append(newRow);
  });
  
   