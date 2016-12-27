import { Meteor } from 'meteor/meteor'


Products = new Mongo.Collection('products');

/* Allows clients to add entries */
Products.allow({
	insert: function(){
		return true ;
	},
	update: function(){
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
	},
	brand: {
		type: String,
		label: "Brand"
	},
	picture: {
	    type: String,
	    autoform: {
		    afFieldInput: {
		        type: 'fileUpload',
		        collection: 'Images',
		        //uploadTemplate: 'uploadField' // <- Optional
		        //previewTemplate: 'uploadPreview' // <- Optional
		    }
	    }
  	}
});

Products.attachSchema( ProductsSchema );