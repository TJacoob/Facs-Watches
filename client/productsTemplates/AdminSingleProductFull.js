import { Meteor } from 'meteor/meteor'

Template.AdminSingleProductFull.onCreated(function() {
	var self = this;
	self.autorun(function(){
		var id = FlowRouter.getParam('id');
		self.subscribe('singleProduct', id);
		self.subscribe('files.images.all');
		//self.subscribe('files.images.multiple', id);
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
	productImages: function(){
		var id = FlowRouter.getParam('id');
		var prod = Products.findOne({_id: id});
		var imgs = [] ;
		for (i=0; i<prod.pictures.length ; i++ )
		{
			imgs.push(prod.pictures[i].picture );
		} 
		console.log(imgs );
		//console.log(prod.pictures[0]);
		// {_id:prod.pictures[0].picture} 
		return Images.find({_id: { $in: imgs }}).map( 
			function(obj){
				return "/files/images/Images/" + String(obj._id) + "/original/" + String(obj._id) + String(obj.extensionWithDot) ;
			 }) ;
		//return Images.find({}).map( function(obj){ return{"imgLink": Images.find({id: obj._id}) }; } );
		//console.log( Images.find({}) );
		//return Images.find({});
		/*var imageArray = [];
		for ( i=0 ; i<prod.pictures.length; i++ )
		{
			imageArray.push(prod.pictures[i].picture);
		};
		
		console.log(Images.find({"_id": { "$in": imageArray }}).cursor);

		return Images.find({"_id": { "$in": imageArray }}).cursor; */
	},
});

Template.AdminSingleProductFull.events({
	'click .fa-pencil' : function(){
		Session.set('editMode', !Session.get('editMode'))
	},
	'click .fa-arrow-left' : function(){
		Session.set('editMode', false)
	},
	'click .fa-times' : function(){
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
	},
	"click .submitEditRedirect" : function(){
		Session.set('editMode', !Session.get('editMode'))
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