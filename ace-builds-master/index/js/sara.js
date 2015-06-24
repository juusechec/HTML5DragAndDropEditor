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
<<<<<<< HEAD
=======
  //console.log(data);
>>>>>>> 6067092e3174d5631ecafbc2b68a1ad1db5221ae
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

// $(".icon-config").click(function(){
	// //alert();
// 	
// });

<<<<<<< HEAD
$(".nested_with_no_drop .icon-config").each(function( index ) {
  console.log($(this).attr('value'));
});


$.getJSON("elements/campoBoton.json", function(result){
    console.log(result);
});

=======
function crearAtributos (elem,value){
	$.getJSON("elements/"+value+".json", function(result){
	    $(elem)[0].valores=result;
	    $(elem).click(function(){
	    	openDialog(elem);
	    });
	});	
}

/**
 * a partir de un tipo de elemento con valores, retorna el nodo con la estructura definida
 * @param {Object} elem
 */
function createConfigNode(elem){
	var table = $("<table>").addClass("table-striped");
	var thead = $("<thead>").html("<tr>"+
	    "<th>Atributo</th>"+
	    "<th>Valor</th>"+
	    "</tr>");
	var tbody = $("<tbody>");
	var arreglo = $(elem)[0].valores;
	$.each(arreglo.$atributos,function(key,value){
		var td1 = $("<td>").html(key);
		var input = $("<input>").addClass("form-control").attr("key",key).attr("value",value);
		var td2 = $("<td>").append(input);
		var tr = $("<tr>");
		tr.append(td1);
		tr.append(td2);
		tbody.append(tr);
	});
	table.append(thead);
	table.append(tbody);
	return table;
}

function saveDataInNode(){
	$("#myModal .modal-body input").each(function(){
		console.log($(this).attr('key'),$(this).attr('value'));
	});
}

function openDialog(elem){
	var tabla = createConfigNode(elem);
	$("#myModal .modal-body").empty();
	$("#myModal .modal-body").append(tabla);
	$('#myModal').modal('show');
}

$(".nested_with_no_drop .icon-config").each(function( index ) {
  crearAtributos(this,$(this).attr('value'));
});
>>>>>>> 6067092e3174d5631ecafbc2b68a1ad1db5221ae
