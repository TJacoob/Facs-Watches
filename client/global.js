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

getUserLanguage = function () {
  // Put here the logic for determining the user language
  return "pt";
};

if (Meteor.isClient) {
  Meteor.startup(function () {
    Session.set("showLoadingIndicator", true);

    TAPi18n.setLanguage(getUserLanguage())
      .done(function () {
        Session.set("showLoadingIndicator", false);
      })
      .fail(function (error_message) {
        // Handle the situation
        console.log(error_message);
      });
  });
}

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});