/* Regular path routes */

FlowRouter.route('/dev',{
	name: 'dev',
	action(){
		BlazeLayout.render('gallery');		//Testing Area
	}
});

FlowRouter.route('/',{
	name: 'home',
	action() {
		FlowRouter.go('index')
	}
});

FlowRouter.route('/index',{
	name: 'index',
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

FlowRouter.route('/search',{
	name: 'search',
	action() {
		BlazeLayout.render('productSearch')
	}
});

FlowRouter.route('/special',{
	name: 'special',
	action() {
		BlazeLayout.render('special')
	}
});