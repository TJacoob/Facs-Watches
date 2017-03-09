import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  	// Create Admin Account
	/*if ( Meteor.Users.find().count() === 0 ) {
	    var admin = Accounts.createUser({
	        username: 'admin',
	        email: "admin@admin.com",
	        password: 'admin',
	    });
	};
	Roles.addUsersToRoles(admin, 'admin', 'default-group');*/
});
