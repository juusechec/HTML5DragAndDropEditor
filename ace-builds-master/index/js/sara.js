/**
 * @author Jorge Ulises Useche Cuellar
 */
$("ol.nested_with_drop").sortable({
	group : 'nested',
	handle : 'i.icon-move',
	onDragStart : function(item, container, _super) {
		console.log(container,_super);
		// Duplicate items of the no drop area
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
