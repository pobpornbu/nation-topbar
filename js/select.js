$(function() {

// Dropdown
$('select').each(function(){
    var $this = $(this), numberOfOptions = $(this).children('option').length;
  
    $this.addClass('select-hidden'); 
    $this.wrap('<div class="select__wrap"></div>');
    $this.after('<div class="select__selected"></div>');

    var $styledSelect = $this.next('div.select__selected');
    $styledSelect.text($this.children('option').eq(0).text());
  
    var $list = $('<ul />', {
        'class': 'select__options'
    }).insertAfter($styledSelect);
  
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val(),
            class: $this.children('option').eq(i).attr('class')
        }).appendTo($list);
    }
  
    var $listItems = $list.children('li').addClass('select__option');

	$styledSelect.on("click", function(e){
        e.stopPropagation();
        if($styledSelect.hasClass('active')){
            $styledSelect.removeClass('active');
            $list.hide();
        }else{
            $('.select__selected.active').each(function(){
                $(this).removeClass('active').next('ul.select__options').hide();
            });
            $(this).toggleClass('active').next('ul.select__options').toggle();
        }
	});

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        if(($listItems).hasClass('link')){
            window.location.href= $(this).attr('rel');             
        }else{
            $this.val($(this).attr('rel'));
            $list.hide();
            console.log($(this).attr('rel'));
        }

    });
  
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });

});

});