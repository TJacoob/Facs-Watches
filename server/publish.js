/* Anounces to clients the collections available */
/* Can be limited to specific entries in the collection */

Meteor.publish('products', function(){
	return Products.find();
});

