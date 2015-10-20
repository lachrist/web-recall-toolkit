
module.exports = function (wr, key) {
  var pass = wr.lock(key);
  return $("<input>")
    .addClass("web-recall-color-setter")
    .prop("type", "checkbox")
    .val(wr.get(key))
    .change(function () { pass.set($(this).val()) })
    .on("remove", pass.unlock);
};
