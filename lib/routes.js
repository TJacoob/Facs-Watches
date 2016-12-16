/* Regular path routes */

FlowRouter.route('/',{
	name: 'home',
	action() {
		BlazeLayout.render('HomePage')
	}
});

FlowRouter.route('/admin',{
	name: 'admin',
	action() {
		BlazeLayout.render('AdminPage', {main: 'AdminHome'});
	}
});

FlowRouter.route('/admin/addProduct',{
	name: 'AdminAddProduct',
	action() {
		BlazeLayout.render('AdminPage', {main: 'AdminAddProduct'});
	}
});