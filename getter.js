
function identity (x) { return x }

module.exports = function (wr, key, constructor) {
  constructor = constructor || identity;
  function update (key, old, val) { cont.empty().append(constructor(val)) }
  wr.on(key, update);
  var cont = $("<div>")
    .addClass("web-recall-getter")
    .append(constructor(wr.get(key)))
    .on("remove", wr.off.bind(wr, update));
  return cont;
};
