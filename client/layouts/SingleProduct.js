Template.singleProduct.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleProduct', id);
		self.subscribe('singleImage', id);
	});
});

Template.singleProduct.helpers({
	singleProduct: ()=> {
		var id = FlowRouter.getParam('id');
		return Products.findOne({_id: id});
	},
	productImage: function(){
		var id = FlowRouter.getParam('id');
		var prod = Products.findOne({_id: id});
		return Images.findOne({_id:prod.picture});
	}

});