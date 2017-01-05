/* Anounces to clients the collections available */
/* Can be limited to specific entries in the collection */

/*Meteor.publish('products', function(){
	return Products.find();
});*/

Meteor.publish('singleProduct', function(id){
	check(id, String);
	return Products.find({_id: id});
});

/* Image Testing */
Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
});

Meteor.publish('singleImage', function(id){
	check(id, String);
  var p = Products.findOne({_id: id});
	return Images.find({_id:p.picture}).cursor;
});

/* Search Testing */
Meteor.publish( 'products', function( search ) {
  check( search, Match.OneOf( String, null, undefined ) );

  let query      = {},
      projection = { limit: 10, sort: { name: 1 } };

  if ( search ) {
    let regex = new RegExp( search, 'i' );

    query = {
      $or: [
        { name: regex },
        { brand: regex }
      ]
    };

    projection.limit = 100;
  }

  return Products.find( query, projection );
});