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

Meteor.methods({
	deleteProduct: function(id){
		Products.remove(id);
	}
});

/* Collection Atributes */

PictureLink = new SimpleSchema({
	picture: {
	    type: String,
	    //optional: true,
	    autoform: {
		    afFieldInput: {
		        type: 'fileUpload',
		        collection: 'Images',
		        //uploadTemplate: 'uploadForm', // <- Optional
		        //previewTemplate: 'uploadedFiles', // <- Optional
		    }
	    }
  	}
});

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
	decade: {
		type: Number,
		label: "Decade"
	},
	type: {
		type: String,
		label: "Type"
	},
  	pictures: {
  		type: [PictureLink],
  	}
}); 

/*

ProductsSchema = new SimpleSchema({
	ref: {
		type: String,
		label: "Reference",
		unique: true,
	},
	name: {
		type: String,
		label: "Name",
	},
	brand: {
		type: String,
		label: "Name",
	},
	desc: {
		type: String,
		label: "Description",
	},
	type: {
		type: String,
		label: "Type",
	},



}); */

Products.attachSchema( ProductsSchema );

//class="form-control af-file-upload-capture"