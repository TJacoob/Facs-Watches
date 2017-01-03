var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'brand'];

PackageSearch = new SearchSource('products', fields, options);

Template.searchTest.helpers({
  /*products: function() {
    return PackageSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },*/
  products: function(){
  	return Products;
  },

  isLoading: function() {
    return PackageSearch.getStatus().loading;
  },

  brands: function(){
  	/*return _.uniq(Products.find({}, {fields: {'brand':1}})).fetch();*/
  	/*return Products.find({}).map( function(x) {return x.brand;})*/ 
  	return _.uniq(Products.find({}, {fields: {brand: true}}).map(function(x) {return x.brand;}), true);
  },

  settings: function () {
        return {
            rowsPerPage: 10,
            showFilter: true,
            fields: [
            { key: 'name', label:"Name"},
            { key: 'brand', label: "Brand"}
            ]
        };
    }
});

Template.searchTest.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    PackageSearch.search(text);
  }, 200)
});

Template.searchTest.onCreated(function() {
    var self = this;
    self.autorun(function(){
        self.subscribe('products');
    });
    PackageSearch.search("");
});


/* ************************************************* */

Template.show.onCreated(function() {
    var self = this;
    self.autorun(function(){
        self.subscribe('products');
    });
});

Template.show.helpers({
	productsV3: function(){
  		return Products.find({name: "Apple"});
  	}
});

Template.control.onCreated(function() {
    var self = this;
    self.autorun(function(){
        self.subscribe('products');
    });
});

Template.control.helpers({
	brands: function(){
  		return distinct(Products,"brand");
  	}
});

Template.control.events({
	'click #searchOp' : function(){
		console.log(this.valueOf());
	}
});

function distinct(collection, field) {
  return _.uniq(collection.find({}, {
    sort: {[field]: 1}, fields: {[field]: 1}
  }).map(x => x[field]), true);
}