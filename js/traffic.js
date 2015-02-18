
// Robert Vets
// Feb 11, 2015
// CodeFellows Homework #3
// making a traffic model using objects
// this version has all of the diagnostic console log messages removed

  var timeStep = 1, timeTotal = 300, distance = 50;
  var firstCar = 0, lastCar = 0, clock = 0; newCarPob = 0.9;
  var cars = [];
  var road = [];
  
  function Vehicle(carNumber,leadCar, timeStart) {
    this.number = carNumber;
    this.speed = 1 + 2 * Math.random();
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
  console.log(road);
  var sum = 0;
  for (var i = 0 ; i <= road.length-1; i++){
    sum += road[i];
  };
  var total = sum/road.length;
  console.log('average speed: ' + Math.floor(total*60) + ' mph, for ' + road.length + ' cars');


