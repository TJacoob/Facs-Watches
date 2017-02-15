var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};

var fields = ['name', 'brand','type','season'];
var filter = {name:"", brand:[], type:[], season:[] };

var emptyBrand = true ;
var emptyType = true ;
var emptySeason = true ;

PackageSearch = new SearchSource('products', fields, options);


Template.productSearch.onRendered(function() {
    var self = this;

    self.autorun(function(){
        self.subscribe('products');
        self.subscribe('files.images.all');
        filter.brand = distinct(Products,"brand");
        filter.type = distinct(Products,"type");
        filter.season = distinct(Products, "season");
        emptyBrand = true ;
        emptyType = true ;
        emptySeason = true ;
    });
    PackageSearch.search("",filter);

    /* jQuery para alterar estilos da barra de navegação */
    jQuery('.jq-searchbar').click(function(){

      jQuery('.css-searchbar').not(this).toggleClass('hvr-shutter-out-horizontal css-searchbar');

      /*jQuery('.jq-searchbar').not(this).addClass('hvr-shutter-out-horizontal');
      jQuery('.jq-searchbar').not(this).removeClass('css-searchbar'); */

      if (jQuery(this).hasClass('css-searchbar'))
      {
        jQuery(this).addClass('hvr-shutter-out-horizontal');
        jQuery(this).removeClass('css-searchbar');
      }
      else
      {
        jQuery(this).removeClass('hvr-shutter-out-horizontal');
        jQuery(this).addClass('css-searchbar');
      }

      /*jQuery('.jq-searchbar').addClass('hvr-shutter-out-horizontal');
      jQuery('.jq-searchbar').removeClass('css-searchbar');
      
      jQuery(this).toggleClass('hvr-shutter-out-horizontal css-searchbar');*/
    });

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

  isLoading: function() {
    return PackageSearch.getStatus().loading;
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

  'click #showSeasonFilter': function(){
    if ( Session.get("currentFilter") == "Season" )
    {
      BlazeLayout.render('productSearch', {main: ''});
      Session.set({
        currentFilter: null 
      });
    }
    else
    {
      BlazeLayout.render('productSearch', {main: 'filterSeason'});
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

  'click .seasonFilter': function(){

    /* Filtragem dos resultados */
    if ((filter.season.indexOf(this.valueOf()) > -1)&&(!emptySeason) ) {
    //In the array!
      filter.season = deleteFrom(filter.season, this.valueOf());
      if ( filter.season.length == 0 )
      {
        emptySeason = true ;
      }
    }

    // Not in the Array, but array is empty
    else if ((filter.season.indexOf(this.valueOf()) > -1)&&(emptySeason) )
    {
      filter.season = [] ;
      filter.season.push(this.valueOf());
      emptySeason = false;  
    }

    // Not in the Array, but array is not empty
    else
    {
      filter.season.push(this.valueOf());
      emptySeason=false ;
    }

    // Array is empty, pushes all brands to the filter
    if (emptySeason)
    {
      for (i=0; i<distinct(Products,"season").length ; i++ )
      {
        filter.season.push(distinct(Products,"season")[i]);
      } 
      emptySeason = true ;
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

Template.filterSeason.helpers({
  seasons: function() {
    return distinct(Products,"season");
  }
});

Template.filterSeason.onRendered(function(){
  
  Session.set({
    currentFilter: "Season"
  });

  if ( filter.season.length != distinct(Products,"season").length )
  {
    for (i=0; i<filter.season.length ; i++ )
    {
      document.getElementById("f-"+filter.season[i]).checked = true;
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
