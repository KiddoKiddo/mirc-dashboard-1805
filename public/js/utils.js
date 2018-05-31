$.utils = {};
$.utils.urlParam = (name) => {
  const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
  return results[1] || 0;
};

$.utils.print_filter = (filter) => {
	var f=eval(filter);
	if (typeof(f.length) != "undefined") {}else{}
	if (typeof(f.top) != "undefined") {f=f.top(Infinity);}else{}
	if (typeof(f.dimension) != "undefined") {f=f.dimension(function(d) { return "";}).top(Infinity);}else{}
	console.log(filter+"("+f.length+") = "+JSON.stringify(f).replace("[","[\n\t").replace(/}\,/g,"},\n\t").replace("]","\n]"));
}

$.util.colors = () = {
  return {
    'color-1': [],
    'color-2': [],
    'color-3': [],
    'color-1-mix': [],
    'color-2-mix': [],
    'color-3-mix': [],
  }
}
