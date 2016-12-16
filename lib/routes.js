FlowRouter.route('/',{
	name: 'home',
	action() {
		BlazeLayout.render('HomePage')
	}
});

FlowRouter.route('/admin',{
	name: 'admin',
	action() {
		BlazeLayout.render('AdminPage', {main: 'Test'});
	}
});