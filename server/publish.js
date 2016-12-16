/* Anounces to clients the collections available */
/* Can be limited to specific entries in the collection */

Meteor.publish('products', function(){
	return Products.find();
});

Meteor.publish('singleProduct', function(id){
	check(id, String);
	return Products.find({_id: id});
});