
module.exports = function (wr, guard, constructor) {

  var lis = Object.create(null);
  var ul = $("<ul>")
    .addClass("web-recall-lister")
    .on("remove", wr.off.bind(wr, handler));

  function handler (res, old, val) {
    if (val === undefined) {
      lis[res[0]].remove();
    } else if (old === undefined) {
      var elem = constructor(res);
      if (elem)
        lis[res[0]] = $("<li>")
          .data("key", res[0])
          .append(elem)
          .appendTo(ul);
    }
  }

  wr.on(guard, handler);
  wr.select(guard, function (res, val) { handler(res, undefined, val) });

  return ul;

}
