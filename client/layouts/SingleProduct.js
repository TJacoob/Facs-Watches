Template.singleProduct.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleProduct', id);
		self.subscribe('files.images.multiple', id);
	});
});

Template.singleProduct.helpers({
	singleProduct: ()=> {
		var id = FlowRouter.getParam('id');
		return Products.findOne({_id: id});
	},
	productImages: function(){
		return Images.find().map( 
			function(obj){
				return "/files/images/Images/" + String(obj._id) + "/original/" + String(obj._id) + String(obj.extensionWithDot) ;
			 }) ;
	}

});