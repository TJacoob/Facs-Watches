var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

var fields = ['name', 'brand','type','decade'];
var filter = {name:"", brand:[], type:[] };

var emptyBrand = true ;
var emptyType = true ;

PackageSearch = new SearchSource('products', fields, options);


Template.productSearch.onRendered(function() {
    var self = this;

    self.autorun(function(){
        self.subscribe('products');
        self.subscribe('files.images.all');
        filter.brand = distinct(Products,"brand");
        filter.type = distinct(Products,"type");
        empty = true ;
        emptyType = true ;
    });
    PackageSearch.search("",filter);
});

Template.productSearch.helpers({

	productImage: function(){
	  var prod = Products.findOne({_id: this.p });
    if (typeof prod !== 'undefined')
    {
      return Images.findOne({_id:prod.picture});
    }
	},

	products: function() {
    return PackageSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  }, 

});


Template.productSearch.events({

  'keyup #search-box': _.throttle(function(e) {
    var text = $(e.target).val().trim();
    filter.name = text ;
    PackageSearch.search("-", filter);
  }, 200),

  'click #showBrandFilter': function(){
    
    /* Render do Template certo */
    if ( Session.get("currentFilter") == "Brand" )
    {
      BlazeLayout.render('productSearch', {main: ''});
      Session.set({
        currentFilter: null 
      });
    }
    else
    {
      BlazeLayout.render('productSearch', {main: 'filterBrand'});
      Session.set({
        currentFilter: "Brand"
      });
    }
  },

  'click #showTypeFilter': function(){
    if ( Session.get("currentFilter") == "Type" )
    {
      BlazeLayout.render('productSearch', {main: ''});
      Session.set({
        currentFilter: null 
      });
    }
    else
    {
      BlazeLayout.render('productSearch', {main: 'filterType'});
    }
  },

  'click .brandFilter': function(){

    /* Filtragem dos resultados */
    if ((filter.brand.indexOf(this.valueOf()) > -1)&&(!emptyBrand) ) {
    //In the array!
      filter.brand = deleteFrom(filter.brand, this.valueOf());
      if ( filter.brand.length == 0 )
      {
        emptyBrand = true ;
      }
    }

    // Not in the Array, but array is empty
    else if ((filter.brand.indexOf(this.valueOf()) > -1)&&(emptyBrand) )
    {
      filter.brand = [] ;
      filter.brand.push(this.valueOf());
      emptyBrand = false;  
    }

    // Not in the Array, but array is not empty
    else
    {
      filter.brand.push(this.valueOf());
      emptyBrand=false ;
    }

    // Array is empty, pushes all brands to the filter
    if (emptyBrand)
    {
      for (i=0; i<distinct(Products,"brand").length ; i++ )
      {
        filter.brand.push(distinct(Products,"brand")[i]);
      } 
      emptyBrand = true ;
    }

    PackageSearch.search("-", filter);
  },

  'click .typeFilter': function(){

    /* Filtragem dos resultados */
    if ((filter.type.indexOf(this.valueOf()) > -1)&&(!emptyType) ) {
    //In the array!
      filter.type = deleteFrom(filter.type, this.valueOf());
      if ( filter.type.length == 0 )
      {
        emptyType = true ;
      }
    }

    // Not in the Array, but array is empty
    else if ((filter.type.indexOf(this.valueOf()) > -1)&&(emptyType) )
    {
      filter.type = [] ;
      filter.type.push(this.valueOf());
      emptyType = false;  
    }

    // Not in the Array, but array is not empty
    else
    {
      filter.type.push(this.valueOf());
      emptyType=false ;
    }

    // Array is empty, pushes all brands to the filter
    if (emptyType)
    {
      for (i=0; i<distinct(Products,"type").length ; i++ )
      {
        filter.type.push(distinct(Products,"type")[i]);
      } 
      emptyType = true ;
    }

    PackageSearch.search("-", filter);
  },

});






/* Auxiliary Templates */

Template.filterBrand.helpers({
  brands: function() {
    return distinct(Products,"brand");
  }
});

Template.filterBrand.onRendered(function(){
  
  Session.set({
    currentFilter: "Brand"
  });

  if ( filter.brand.length != distinct(Products,"brand").length )
  {
    for (i=0; i<filter.brand.length ; i++ )
    {
      document.getElementById("f-"+filter.brand[i]).checked = true;
    }
  }
});

Template.filterType.helpers({
  types: function() {
    return distinct(Products,"type");
  }
});

Template.filterType.onRendered(function(){
  
  Session.set({
    currentFilter: "Type"
  });

  if ( filter.type.length != distinct(Products,"type").length )
  {
    for (i=0; i<filter.type.length ; i++ )
    {
      document.getElementById("f-"+filter.type[i]).checked = true;
    }
  }


});



/* Functions */

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