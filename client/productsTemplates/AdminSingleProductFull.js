import { Meteor } from 'meteor/meteor'

Template.AdminSingleProductFull.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleProduct', id);
		self.subscribe('singleImage', id);
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
	}

});

Template.AdminSingleProductFull.events({
	'click .fa-pencil' : function(){
		Session.set('editMode', !Session.get('editMode'))
	},
	'click .fa-arrow-left' : function(){
		Session.set('editMode', false)
	},
	'click .fa-check' : function(){
		Session.set('editMode', !Session.get('editMode'))
	},
	'click .fa-trash' : function(){
		let id = FlowRouter.getParam('id') ;
		var prod = Products.findOne({_id: id});

		if (confirm('Are you sure you want to delete ' + prod.name + '?'))
			{
				Meteor.call('deleteProduct', id);
				FlowRouter.go('AdminAllProduct');
			}
	}
});

Template.AdminSeeAllProducts.events({
	'click .fa-pencil' : function(){
		Session.set('editMode', !Session.get('editMode'))
	},
	'click .fa-search' : function(){
		Session.set('editMode', false )
	}
});