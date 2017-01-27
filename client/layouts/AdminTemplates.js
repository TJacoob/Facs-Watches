/* NEEDS REFACTORING -> SEE SEARCH FILTERS BUTTONS FOR EXAMPLE */
Template.AdminHome.rendered = function(){
	var element = $("#navbarOp0");    
    element.addClass("active");
    element = $("#navbarOp1");    
    element.removeClass("active");
    element = $("#navbarOp2");    
    element.removeClass("active");
    element = $("#navbarOp3");    
    element.removeClass("active");
}

Template.AdminSeeAllProducts.rendered = function(){
    var element = $("#navbarOp0");    
    element.removeClass("active");
    element = $("#navbarOp1");    
    element.addClass("active");
    element = $("#navbarOp2");    
    element.removeClass("active");
    element = $("#navbarOp3");    
    element.removeClass("active");
}

Template.AdminSingleProductFull.rendered = function(){
    var element = $("#navbarOp0");    
    element.removeClass("active");
    element = $("#navbarOp1");    
    element.addClass("active");
    element = $("#navbarOp2");    
    element.removeClass("active");
    element = $("#navbarOp3");    
    element.removeClass("active");
}

Template.AdminAddProduct.rendered = function(){
    var element = $("#navbarOp0");    
    element.removeClass("active");
    element = $("#navbarOp1");    
    element.removeClass("active");
    element = $("#navbarOp2");    
    element.addClass("active");
    element = $("#navbarOp3");    
    element.removeClass("active");
}

AutoForm.hooks({

    insertProductForm: {
        onSuccess: function(){
            FlowRouter.go("/admin/product/all");
        }
    }
})