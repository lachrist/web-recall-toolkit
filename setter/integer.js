
module.exports = function (wr, key, min, max) {
  var pass = wr.lock(key);
  return $("<input>")
    .addClass("web-recall-integer-setter")
    .prop("type", "number")
    .prop("min", min)
    .prop("max", max)
    .val(wr.get(key))
    .change(function () { pass.set($(this).val()) })
    .on("remove", pass.unlock);
};
