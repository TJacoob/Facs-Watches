Template.special.onCreated(function(){
	var self = this;
    self.autorun(function(){
        self.subscribe('products');
        self.subscribe('files.images.all');
    });
});

Template.special.helpers({
  	products: function() {
  		// Mostrar apenas os especiais
    	return Products.find({special:true});
	},

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
});