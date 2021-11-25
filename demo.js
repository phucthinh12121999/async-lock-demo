var AsyncLock = require("async-lock");
var lock = new AsyncLock();

function operation(id) {
  console.log(id + " calling operation");
  lock.acquire(
    id,
    function (done) {
      console.log(id + " Running operation");
      setTimeout(function () {
        console.log(id + " Finishing operation");
        done();
      }, 3000);
    },
    function (err, ret) {
      console.log(id + " Freeing lock", ret);
    },
    {}
  );
}

operation("key1"); // will Run
operation("key1"); // will Wait the 1st
operation("key2"); // will Run Paralell with the 1st
