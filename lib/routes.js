/* Regular path routes */
import { FlowRouter } from 'meteor/kadira:flow-router';

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
		if (Roles.userIsInRole(Meteor.userId(), 'admin', 'admin'))
		{
			// Substituir por página com estatisticas
			BlazeLayout.render('AdminSplash', {main: 'AdminHome'});
		}
		else
		{
			BlazeLayout.render('AdminSplash', {main: 'AdminHome'});	
		}
		
	}
});

FlowRouter.route('/admin/product/add',{
	name: 'AdminAddProduct',
	action() {
		if (Roles.userIsInRole(Meteor.userId(), 'admin', 'admin'))
		{
			BlazeLayout.render('AdminSplash', {main: 'AdminAddProduct'});	
		}
		else
		{
			alert("Sem permissão para aceder a esta página.");
			FlowRouter.go('admin');	
		}
	}
});

FlowRouter.route('/admin/product/all',{
	name: 'AdminAllProduct',
	action() {
		if (Roles.userIsInRole(Meteor.userId(), 'admin', 'admin'))
		{
			BlazeLayout.render('AdminSplash', {main: 'AdminSeeAllProducts'});
		}
		else
		{
			alert("Sem permissão para aceder a esta página.");
			FlowRouter.go('admin');
		}
	}
});

/* Single Product Admin Route */

FlowRouter.route('/admin/product/:id',{
	name: 'AdminSingleProductFull',
	action() {
		if ( Roles.userIsInRole(Meteor.userId(), 'admin', 'admin') )
		{
			BlazeLayout.render('AdminSplash', {main: 'AdminSingleProductFull'});
		}
		else
		{
			alert("Sem permissão para aceder a esta página.");
			FlowRouter.go('admin');
		}
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
		BlazeLayout.render('productSearch');
		$('html, body').animate({
        scrollTop: $("#productSearchTop").offset().top
    	}, 0);
	}
});

FlowRouter.route('/special',{
	name: 'special',
	action() {
		BlazeLayout.render('special')
	}
});

//Roles.userIsInRole(ad, 'admin', 'admin')

