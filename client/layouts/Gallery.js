Template.gallery.onRendered(function() {
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleProduct', id);
		self.subscribe('files.images.multiple', id);
	});
});

Template.gallery.helpers({
	productImages: function(){
		return Images.find().map( 
			function(obj){
				//Isto tá martelado
				return "/files/images/Images/" + String(obj._id) + "/original/" + String(obj._id) + String(obj.extensionWithDot) ;
			 }) ;
	}

});