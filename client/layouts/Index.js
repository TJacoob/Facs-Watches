Template.index.onRendered(function() {
    var self = this;

    self.autorun(function(){
        self.subscribe('products');
        self.subscribe('files.images.all');
    });
});

Template.index.helpers({

    spotlight: function() {
        return Products.find({}, {limit: 3});
        /* Should be fixed to display spotlighted only */
  	},

  	productImage: function(){
		var prod = Products.findOne({_id: this.p });
		return Images.findOne({_id:prod.picture});
	},

	brands: function() {
  		return distinct(Products,"brand");
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
  
});