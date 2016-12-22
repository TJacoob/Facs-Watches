import { Meteor } from 'meteor/meteor'

Template.AdminSingleProductFull.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleProduct', id);
		self.subscribe('files.images.all');
	});
});

Template.AdminSingleProductFull.helpers({
	singleProduct: ()=> {
		var id = FlowRouter.getParam('id');
		return Products.findOne({_id: id});
	},
	updateProductId: function(){
		var id = FlowRouter.getParam('id');
		return id ;
	},
	productImage: function(){
		var id = FlowRouter.getParam('id');
		var prod = Products.findOne({_id: id});
		return Images.findOne({_id:prod.picture});
		//return Images.findOne();
	}

});

Template.AdminSingleProductFull.events({
	'click .fa-pencil' : function(){
		Session.set('editMode', !Session.get('editMode'))
	}
});