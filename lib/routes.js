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

FlowRouter.route('/admin/product/add',{
	name: 'AdminAddProduct',
	action() {
		BlazeLayout.render('AdminPage', {main: 'AdminAddProduct'});
	}
});

FlowRouter.route('/admin/product/all',{
	name: 'AdminAddProduct',
	action() {
		BlazeLayout.render('AdminPage', {main: 'AdminSeeAllProducts'});
	}
});

/* Single Product Admin Route */

FlowRouter.route('/admin/product/:id',{
	name: 'AdminSingleProductFull',
	action() {
		BlazeLayout.render('AdminPage', {main: 'AdminSingleProductFull'});
	}
});

/* Images Test */

FlowRouter.route('/images',{
	name: 'images',
	action() {
		BlazeLayout.render('uploadForm')
	}
});

FlowRouter.route('/images/show',{
	name: 'images',
	action() {
		BlazeLayout.render('imagesShow')
	}
});