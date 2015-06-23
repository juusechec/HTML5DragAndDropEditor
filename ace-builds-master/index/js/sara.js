/**
 * @author Jorge Ulises Useche Cuellar
 */

var editor = ace.edit("editor");
editor.setTheme("ace/theme/eclipse");
editor.getSession().setMode("ace/mode/php");

$.ajax({
  url: "code/form.php.txt",
  beforeSend: function( xhr ) {
    xhr.overrideMimeType( "text/plain; charset=x-user-defined" );
  }
})
.done(function( data ) {
  console.log(data);
  editor.insert(data);
});

$("ol.nested_with_drop").sortable({
	group : 'nested',
	handle : 'i.icon-move',
	onDragStart : function(item, container, _super) {
		console.log(container,_super);
		// Duplicate items of the no drop area
		console.log(container);
		if (!container.options.drop) {
			item.clone().insertAfter(item);
			//alert();
		}
		_super(item);
	}
});

$("ol.nested_with_no_drop").sortable({
	group : 'nested',
	drop : false
});

$(".icon-config").click(function(){alert();});

$.getJSON("elements/campoBoton.json", function(result){
    alert(result);
    console.log(result);
});

$(".nested_with_no_drop .icon-config").each(function( index ) {
  console.log($(this).attr('value'));
});
