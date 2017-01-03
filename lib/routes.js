/* Regular path routes */

FlowRouter.route('/dev',{
	name: 'dev',
	action(){
		BlazeLayout.render('searchdev');		//Testing Area
	}
});

FlowRouter.route('/',{
	name: 'home',
	action() {
		BlazeLayout.render('HomePage')
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
	name: 'AdminAddProduct',
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

/* Images Test */

FlowRouter.route('/images',{
	name: 'images',
	action() {
		BlazeLayout.render('uploadForm')
	}
});

FlowRouter.route('/images/show',{
	name: 'imagesAll',
	action() {
		BlazeLayout.render('imagesShow')
	}
});

/* Search Test */

FlowRouter.route('/search',{
	name: 'search',
	action() {
		BlazeLayout.render('searchTest')
	}
});