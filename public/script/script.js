$(function() {
	$('.button-collapse').sideNav({
	      menuWidth: 300, // Default is 240
	      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
	    }
	  );
	  $('.collapsible').collapsible();
});