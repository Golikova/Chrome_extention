$(function() { 
	$("input:checkbox[name='source']").each(function(){
		if(getLocalStorage($(this).val()) == 1) {
			$(this).prop("checked", true)
		} else {
			$(this).prop("checked", false)
		}
	});

	$(".sourceCheckbox").change(function() {
		if(this.checked) {
			setLocalStorage($(this).val(), 1);
		} else {
			setLocalStorage($(this).val(), 0);
		}
	});

});