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
/*
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
*/


ProductsSchema = new SimpleSchema({
	ref: {
		type: String,
		label: "Referência",
		unique: true,
	},
	name: {
		type: String,
		label: "Nome",
	},
	brand: {
		type: String,
		label: "Marca",
	},
	desc: {
		type: String,
		label: "Descrição",
	},
	type: {
		type: String,
		label: "Tipo",
	},
	gender: {
		type: String,
		label: "Género",
		allowedValues: ['Male', 'Female', 'Both'],
	},
	season: {
		type: String,
		label: "Anos",
		//min: 0,
	},
	spotlight: {
		type: Boolean,
		label: "Em destaque",
	},
	special: {
		type: Boolean,
		label: "Projeto Pessoal",
	},
	available: {
		type: Boolean,
		label: "Disponível" ,
		//defaultValue: true ,
	},
	pictures: {
  		type: [PictureLink],
  	},




});

Products.attachSchema( ProductsSchema );

//class="form-control af-file-upload-capture"