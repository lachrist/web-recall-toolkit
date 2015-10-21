
module.exports = function (wr, key) {
  var pass = wr.lock(key);
  return $("<textarea>")
    .addClass("web-recall-text-setter")
    .val(wr.get(key))
    .change(function () { pass.set($(this).val()) })
    .on("remove", pass.unlock);
};
