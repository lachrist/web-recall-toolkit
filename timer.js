
var dhms = [
  {value: 1*60*60*24, name: "d"},
  {value: 1*60*60,    name: "h"},
  {value: 1*60,       name: "m"},
  {value: 1,          name: "s"}
];

function print (sec) {
  return dhms.reduce(function (str, fac) {
    var rest = sec % fac.value;
    var div = (sec-rest) / fac.value;
    sec = rest;
    return div ? (str+div+fac.name) : str;
  }, "") || "0s";
}

module.exports = function (wr, key, step) {
  var pass = wr.lock(key);
  var sec = wr.get(key) || 0;
  var interval = null;
  function update () {
    pass.set(sec = sec + step);
    button.html(print(sec));
  }
  function start () {
    interval = setInterval(update, 1000*step);
    button.css("background-color", "red");
    button.off("click", start);
    button.on("click", stop);
  }
  function stop () {
    clearInterval(interval);
    button.css("background-color", "green");
    button.off("click", stop);
    button.on("click", start);
  }
  var button = $("<button>")
    .addClass("web-recall-timer")
    .html(print(sec))
    .on("remove", function () {
      pass.unlock();
      clearInterval(interval);
    });
  stop();
  return button;
};
