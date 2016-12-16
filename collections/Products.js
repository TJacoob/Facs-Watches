import { Meteor } from 'meteor/meteor'


Products = new Mongo.Collection('products');

/* Allows clients to add entries */
Products.allow({
	insert: function(){
		return true ;
	}
});

/* Collection Atributes */
ProductsSchema = new SimpleSchema({
	name: { 
		type: String,
		label: "Name"
	},
	desc: {
		type: String,
		label: "Description"
	}
});

Products.attachSchema( ProductsSchema );