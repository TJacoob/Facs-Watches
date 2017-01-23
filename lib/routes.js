/* Regular path routes */

FlowRouter.route('/dev',{
	name: 'dev',
	action(){
		BlazeLayout.render('');		//Testing Area
	}
});

FlowRouter.route('/',{
	name: 'home',
	action() {
		BlazeLayout.render('index')
	}
});

FlowRouter.route('/admin',{
	name: 'admin',
	action() {
		BlazeLayout.render('AdminSplash', {main: 'AdminHome'});
	}
});

FlowRouter.route('/admin/product/add',{
	name: 'AdminAddProduct',
	action() {
		BlazeLayout.render('AdminSplash', {main: 'AdminAddProduct'});
	}
});

FlowRouter.route('/admin/product/all',{
	name: 'AdminAllProduct',
	action() {
		BlazeLayout.render('AdminSplash', {main: 'AdminSeeAllProducts'});
	}
});

/* Single Product Admin Route */

FlowRouter.route('/admin/product/:id',{
	name: 'AdminSingleProductFull',
	action() {
		BlazeLayout.render('AdminSplash', {main: 'AdminSingleProductFull'});
	}
});

/* Single Product Route */

FlowRouter.route('/product/:id',{
	name: 'single',
	action() {
		BlazeLayout.render('singleProduct');
	}
});

/* Search Test */

FlowRouter.route('/search',{
	name: 'search',
	action() {
		BlazeLayout.render('productSearch')
	}
});