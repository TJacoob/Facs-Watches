SearchSource.defineSource('products', function(searchText, options) {

  var filter = options ;

  console.log(filter);

  var brands = [];
  var types = [];

  for (i=0; i<filter.brand.length ; i++ )
  {
    brands.push(buildRegExp(filter.brand[i]));
  } 
  for (i=0; i<filter.type.length ; i++ )
  {
    types.push(buildRegExp(filter.type[i]));
  } 

  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(searchText) {

    var selector2 = {$and:[
      {name: buildRegExp(filter.name)},
      {brand: { $in: brands } },
      {type: { $in: types } },
      //{$cond: { if: { $in: brands }, then: {  }, else: {  } }
    ]};

    return Products.find(selector2, options).fetch();
  } else {
    return Products.find({}, options).fetch();
  }
});

function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}