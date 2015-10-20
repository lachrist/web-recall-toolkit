
function identity (x) { return x };

module.exports = function (wr, key, guard, constructor) {

  constructor = constructor || identity;

  var pass = wr.lock(key);

  var select = $("<select>")
    .addClass("web-recall-reference-setter")
    .change(function () { pass.set($("option:selected", select).prop("value")) })
    .on("remove", function () {
      pass.unlock();
      wr.off(guard);
    });

  function append (res) {
    select.append($("<option>")
      .prop("value", res[0])
      .append(constructor(res)));
  }

  function remove (res) {
    select.children().each(function () {
      var option = $(this);
      if (option.prop("value") === res[0]) {
        if (option.prop("selected"))
          $(cont.children().get(0)).prop("selected", true);
        option.remove();
      }
    })
  }

  $("<option>").prop("value", null).appendTo(select);
  wr.select(guard, append);
  wr.on(guard, function (res, old, val) {
    if (old === undefined)
      append(res);
    if (val === undefined)
      remove(res);
  });
  (function (val) {
    for (var i = select.children().length-1; i>=0; i--) {
      var option = $(select.children().get(i));
      if (i === 0 || option.prop("value") === val) {
        option.prop("selected", true);
        break;
      }
    }
  } (wr.get(key)));

  return select;

}
