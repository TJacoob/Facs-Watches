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

Template.AdminSeeAllProducts.onCreated(function() {
    var self = this;
    self.autorun(function(){
        self.subscribe('products');
    });
    PackageSearch.search("");
});

Template.AdminSeeAllProducts.helpers({
  products: function() {
    return PackageSearch.getData({
      transform: function(matchText, regExp) {
        return matchText.replace(regExp, "<b>$&</b>")
      },
      sort: {isoScore: -1}
    });
  },
  
  isLoading: function() {
    return PackageSearch.getStatus().loading;
  },
});

Template.AdminSeeAllProducts.events({
  "keyup #search-box": _.throttle(function(e) {
    var text = $(e.target).val().trim();
    PackageSearch.search(text);
  }, 200)
});


