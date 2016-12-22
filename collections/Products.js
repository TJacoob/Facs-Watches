import { Meteor } from 'meteor/meteor'


Products = new Mongo.Collection('products');

/* Indexes the Collection for searches */
if ( Meteor.isServer ) {
  Products._ensureIndex( { name: 1, desc: 0, brand: 0, picture: 0} );
}

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