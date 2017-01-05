var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'brand'];
var filter = {name:"", brand:[]};

PackageSearch = new SearchSource('products', fields, options);

Template.search.onCreated(function() {
    var self = this;
    self.autorun(function(){
        self.subscribe('products');
    });
    PackageSearch.search("");
});

Template.search.helpers({
  products: function() {
    return PackageSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return PackageSearch.getStatus().loading;
  },

  brands: function() {
  	return distinct(Products,"brand");
  }
});

Template.search.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    filter.name = text ;
    PackageSearch.search("Anything", filter);
  }, 200),
  "click #searchOP": function(){
  	
  	if (filter.brand.indexOf(this.valueOf()) > -1) {
    //In the array!
    	filter.brand = deleteFrom(filter.brand, this.valueOf());
	} else {
    	filter.brand.push(this.valueOf());
	}
  	PackageSearch.search("Anything", filter);
  },
});

function distinct(collection, field) {
  return _.uniq(collection.find({}, {
    sort: {[field]: 1}, fields: {[field]: 1}
  }).map(x => x[field]), true);
}


function deleteFrom(array, search_term){
	for (var i=array.length-1; i>=0; i--) {
    if (array[i] === search_term) {
        array.splice(i, 1);
        // break;       //<-- Uncomment  if only the first term has to be removed
    }
	}

	return array ;
}