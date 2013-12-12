var $window = $(window); 
var velocity = 0.4; 
function update(){ 
	var pos = $window.scrollTop(); 
	$('.container').each(function() { 
		var $element = $(this); 
		var height = $element.height(); 
		$(this).css('backgroundPosition', '50% ' + Math.round((height - pos) * velocity) + 'px');
	}); 
}; 
$window.bind('scroll', update);
