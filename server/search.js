SearchSource.defineSource('products', function(searchText, options) {

  console.log(options);

  var filter = options ;

  var brands = [];
  var types = [];
  var seasons = [];

  for (i=0; i<filter.brand.length ; i++ )
  {
    brands.push(buildRegExp(filter.brand[i]));
  } 
  for (i=0; i<filter.type.length ; i++ )
  {
    console.log(buildRegExp(filter.type[i]));
    console.log(altRegExp(filter.type[i]));
    types.push(altRegExp(filter.type[i]));
  } 
  for (i=0; i<filter.season.length ; i++ )
  {
    seasons.push((filter.season[i]));
  } 

  var options = {sort: {isoScore: -1}, limit: 20};
  
  if(searchText) {

    var selector2 = {$and:[
      {name: buildRegExp(filter.name)},
      {brand: { $in: brands } },
      {type: { $in: types } },
      {season: { $in: seasons } },
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

function altRegExp(searchText) {
  // this is a dumb implementation
  //var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp(searchText, "ig");
}