
module.exports = function (wr, guard, constructor) {

  var setters = new WeakMap();

  var ol = $("<ul>")
    .sortable({
      deactivate: commit,
      cursor: "move",
      placeholder: "sortable-placeholder"
    })
    .disableSelection();
  var ul = $("<ul>")
    .sortable({
      deactivate: commit,
      cursor: "move",
      placeholder: "sortable-placeholder"
    })
    .disableSelection();

  function commit () {
    ol.children().each(function (idx) { setters.get(this)(idx) });
    ul.children().each(function (idx) { setters.get(this)(null) }); 
  }

  ol.sortable("option", "connectWith", ul);
  ul.sortable("option", "connectWith", ol);

  function update (res, old, val) {
    if (old === undefined)
      append(res, val);
  }

  function append (res, val) {
    var pass = wr.lock(res[0]);
    var li = $("<li>")
      .on("remove", pass.unlock)
      .append(constructor(res));
    setters.set(li.get(0), pass.set);
    if (val === null)
      return ul.append(li);
    if (ol.children().get(val))
      return $(ol.children().get(val)).before(li);
    ol.append(li);
 }

  wr.select(guard, append);
  wr.on(guard, update);

  return $("<div>")
    .addClass("web-recall-sorter")
    .on("remove", wr.off.bind(wr, update))
    .append(ol)
    .append(ul);

}
