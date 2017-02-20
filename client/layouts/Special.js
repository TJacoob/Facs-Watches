Template.special.onCreated(function(){
	var self = this;
    self.autorun(function(){
        self.subscribe('products');
    });
});

Template.special.helpers({
  	products: function() {
  		// Mostrar apenas os especiais
    	return Products.find();
	},
});