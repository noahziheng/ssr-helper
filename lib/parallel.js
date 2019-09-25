let nextTick = process.nextTick;
nextTick = function(func) {
  setTimeout(func, 0);
};

var parallel = function(workerNumber, callback, complete) {
  if (!callback) return;

  var self = this;
  var completed = 0;
  var total = self.length;
  var workerCount = 0;
  var currentIndex = 0;

  if (total == 0) {
    if (complete) complete();

    return;
  }

  function _complete() {
    completed++;
    workerCount--;

    if (workerCount == 0 && completed >= total) {
      if (complete) complete();
    } else {
      // Next item
      nextTick(function() {
        currentIndex++;

        _parallel(currentIndex);
      });
    }
  }

  function _parallel(index) {
    if (index >= total) return;

    if (workerCount < workerNumber) {
      workerCount++;

      if (workerCount < workerNumber) {
        // New worker
        nextTick(function() {
          currentIndex++;
          _parallel(currentIndex);
        });
      }

      // Customized callback function
      callback(self[index], index, self, _complete);
    } else {
      nextTick(function() {
        _parallel(index);
      });
    }
  }

  _parallel(currentIndex);
};

module.exports = parallel;
