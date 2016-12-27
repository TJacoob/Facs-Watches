var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'brand'];

PackageSearch = new SearchSource('products', fields, options);