
// Robert Vets
// Feb 22, 2015
// CodeFellows Homework #5
// making a traffic model using objects
// this version has all of the diagnostic console log messages removed
// this version adds jQuery...note the actual calculations need some work to be realistic
// the simulation performs just fine, but the time steps are too large for the results to be really useful
// working that is beyond the scope of this exercise so will be deferred


$(document).ready(function(){ 
  $('#launchBttn2').on('click', function(){

    var userData = $("input[name='rate']:checked").val(); // this was friggn hard to find
    var userRate = parseFloat(userData);
    console.log(userData);
    console.log(userRate);

    var timeStep = 1, timeTotal = 300;        // minute 
    var distance = 20;                        // miles
    var firstCar = 0, lastCar = 0;            // global variables
    var sum = 0, clock = 0;                   // global variables
    var newCarPob = userRate;
    var cars = [];
    var road = [];                            // array of average speeds
    
    function Vehicle(carNumber,leadCar, timeStart) {
      this.number = carNumber;
      this.speed = (1 + Math.random());        //speed 1 to 2 miles/min (60-120mph)
      this.enRoute = true;
      this.position = 1;
      this.behind = leadCar;
      this.startTime = timeStart;
      this.endTime = 0;
      this.averageSpeed = 0;
      this.updatePosition = function(){
        this.position += (this.speed * timeStep);
        if (this.position > distance && this.enRoute === true){
          this.averageSpeed = this.position/(clock - this.startTime);
          road.push(this.averageSpeed);    
          this.enRoute = false;
        }
      }
    }

    function newTraffic(initialTime) {
      if (Math.random() > newCarPob){
        var totalCars = cars.length
        var transfer = new Vehicle(totalCars, totalCars-1, initialTime);
        cars.push(transfer);
        return lastCar = totalCars-1;
      } 
      else {
      };
    }

    function moveTraffic(lastCar){
      for (var N = 0; N <= lastCar; N ++ ){
        checkSpeed(N);
        cars[N].updatePosition(); 
      };
    }

    function checkSpeed(N){
      var distanceCheck = (cars[N].speed * timeStep) + cars[N].position;
      var leadCar = cars[N].behind
      if (N != firstCar){
        if (distanceCheck > cars[leadCar].position - 0.05){
          cars[N].speed = cars[leadCar].speed;
        };
      };
    }

    for (var time = 0; time <= timeTotal; time++){
      clock = time;
      lastCar = cars.length - 1;
      if (cars.length > 1){
        moveTraffic(lastCar); 
      };
      newTraffic(time);
    };

    console.log('number of cars ' + cars.length);

    for (var i = 0 ; i <= road.length-1; i++){
      sum += road[i];
    };

    var aveSpeedTotal = (Math.floor((sum/road.length)*60));
    var aveSpeedTotalString = aveSpeedTotal.toString();
    var completedTravel = road.length;
    var completedTravelString = completedTravel.toString();
    console.log('average speed: ' + aveSpeedTotal + ' mph, for ' + completedTravel + ' cars');
    console.log(aveSpeedTotalString + " "+ completedTravelString);
    $('#carsResults').replaceWith(function(){
      return '<em>' + completedTravelString + '</em>';
    });
    $('#speedResults').replaceWith(function(){
      return '<em>' + aveSpeedTotalString + '</em>' + ' mph';
    });
    $('#selectionstuff').hide();
    $('#results').css('visibility','visible');

  });
});


