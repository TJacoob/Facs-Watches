import { Meteor } from 'meteor/meteor'

/* Receiving Products list from server */
//Meteor.subscribe('products');

Template.AdminSeeAllProducts.onCreated(function() {
	var self = this;
	self.autorun(function(){
		self.subscribe('products');
	});
});

Template.AdminSeeAllProducts.helpers({
	products: ()=> {
		return Products.find();
	}
});