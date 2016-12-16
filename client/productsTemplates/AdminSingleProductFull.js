import { Meteor } from 'meteor/meteor'

Template.AdminSingleProductFull.onCreated(function() {
	console.log("Call");
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleProduct', id);
	});
});

Template.AdminSingleProductFull.helpers({
	singleProduct: ()=> {
		var id = FlowRouter.getParam('id');
		return Products.findOne({_id: id});
	}
});