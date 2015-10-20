
module.exports = function (wr, key) {
  var pass = wr.lock(key);
  return $("<input>")
    .addClass("web-recall-color-setter")
    .prop("type", "color")
    .val(wr.get(key) || "#FFFFFF")
    .change(function () { pass.set($(this).val()); })
    .on("remove", pass.unlock);
};
