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
	}

});