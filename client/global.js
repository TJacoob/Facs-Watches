import { Meteor } from 'meteor/meteor'

import 'bootstrap';

AutoForm.hooks({

    insertProductForm: {
        onSuccess: function(){
            FlowRouter.go("/admin/product/all");
        }
    },
})

AutoForm.addHooks(null, {
  before: {
    update: function(doc) {
      _.each(doc.$set, function(value, setter) {
        if (_.isArray(value)) {
          var newValue = _.compact(value);
          doc.$set[setter] = newValue;
        }
      });
      return doc;
    }
  }
});