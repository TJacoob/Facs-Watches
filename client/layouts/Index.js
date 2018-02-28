Template.index.onRendered(function() {
    var self = this;

    self.autorun(function(){
        self.subscribe('products');
        //self.subscribe('files.images.all');
    });
});

Template.index.helpers({

  /*
  spotlight: function() {
      return Products.find({spotlight:true}, {limit: 3});
      // Should be fixed to display spotlighted only
	}, */

  productImage: function(){
    var prod = Products.findOne({_id: this.p });
    if (typeof prod !== 'undefined')
    {
      //Mais martelado era dificil 
      return Images.find({_id:prod.pictures[0].picture}).map( 
        function(obj){
          return "/files/images/Images/" + String(obj._id) + "/original/" + String(obj._id) + String(obj.extensionWithDot) ;
         }) ;
    }
  },

	brands: function() {
  		return distinct(Products,"brand");
	},
});

Template.index.events({

  "click .jumpSearch": function(event){
    Session.set("prevBrand",event.currentTarget.id);
    FlowRouter.go('/search');
  },

});

function distinct(collection, field) {
  return _.uniq(collection.find({}, {
    sort: {[field]: 1}, fields: {[field]: 1}
  }).map(x => x[field]), true);
}

Template.IndexNavbar.events({

  "click #navIndex": function(){
    FlowRouter.go('/index');
    $('html, body').animate({
        scrollTop: $("#indexTop").offset().top
    }, 1000);
  },
  "click #navSearch": function(){
    FlowRouter.go('/search');
    $('html, body').animate({
        scrollTop: $("#productSearchTop").offset().top
    }, 0);
  },
  "click #navSpecial": function(){
    FlowRouter.go('/special');
    $('html, body').animate({
        scrollTop: $("#productSearchTop").offset().top
    }, 0);
  },
  "click #navAbout": function(){
    FlowRouter.go('/index');
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 2000);
  },
  "click #navContacts": function(){
    FlowRouter.go('/index');
    $('html, body').animate({
        scrollTop: $("#contacts").offset().top
    }, 1000);
  },
  "click #langPT": function(){
    TAPi18n.setLanguage("pt") ;
  },
  "click #langUS": function(){
    TAPi18n.setLanguage("en");
  },
  "click #langIT": function(){
    TAPi18n.setLanguage("it");
  },

});

Template.IndexNavbarMobile.events({

  "click #navIndex": function(){
    FlowRouter.go('/index');
    $('html, body').animate({
        scrollTop: $("#indexTop").offset().top
    }, 1000);
  },
  "click #navSearch": function(){
    FlowRouter.go('/search');
    $('html, body').animate({
        scrollTop: $("#productSearchTop").offset().top
    }, 0);
  },
  "click #navSpecial": function(){
    FlowRouter.go('/special');
    $('html, body').animate({
        scrollTop: $("#productSearchTop").offset().top
    }, 0);
  },
  "click #navAbout": function(){
    FlowRouter.go('/index');
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 2000);
  },
  "click #navContacts": function(){
    FlowRouter.go('/index');
    $('html, body').animate({
        scrollTop: $("#contacts").offset().top
    }, 2000);
  },
  "click #langPT": function(){
    TAPi18n.setLanguage("pt") ;
  },
  "click #langUS": function(){
    TAPi18n.setLanguage("en");
  },
  "click #langIT": function(){
    TAPi18n.setLanguage("it");
  },
  
});