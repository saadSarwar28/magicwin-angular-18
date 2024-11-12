$(".dropdown-trigger").dropdown();



$(document).ready(function(){
    $('.tabs').tabs();
    $('.modal').modal();
  });

document.documentElement.classList.add("js");

addEventListener(
	"input",
	(e) => {
		let _t = e.target;

		_t.parentNode.style.setProperty(`--${_t.id}`, +_t.value);
	},
	false
);


$(document).ready(function(){
    $('.collapsible').collapsible();
});



jQuery(document).ready(function($) {
    $('.place_bet').click(function() {
        $(this).toggleClass('open');
		$('.place_bet_box').slideToggle();
    });
});
