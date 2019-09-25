var Array = require("node-array");

var a = [];

// Prepare 1000 items for testing
for (var i = 0; i < 1000; i++) {
  a.push(i + 1);
}

// Make 50 workers to process all items of array in parallel
a.parallel(
  30,
  function(element, index, arr, complete) {
    setTimeout(function() {
      console.log(element);
      complete();
    }, Math.round(1000));
  },
  function() {
    console.log("complete");
  }
);
