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
  //console.log(data);
  editor.insert(data);
});

$("ol.nested_with_drop").sortable({
	group : 'nested',
	handle : 'i.icon-move',
	onDragStart : function(item, container, _super) {
		// console.log(container,_super);
		// Duplicate items of the no drop area
		// console.log(item);
		if (!container.options.drop) {
			var itemclone = item.clone(false,false);
			//itemclone.find('.icon-config')[0].valores = item.find('.icon-config')[0].valores;
			itemclone.insertAfter(item);
			var iconconfigclone = itemclone.find('.icon-config')[0];
			addClickEvent(iconconfigclone);
			var valores = JSON.parse(JSON.stringify(item.find('.icon-config')[0].valores));
			iconconfigclone.valores = valores;
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

function crearAtributos (elem,value){
	$.getJSON("elements/"+value+".json", function(result){
	    elem.valores=result.default;
	    addClickEvent(elem);
	});	
}

function addClickEvent(elem){
	$(elem).click(function(){
    	openDialog(elem);
    });
}

/**
 * a partir de un tipo de elemento con valores, retorna el nodo con la estructura definida
 * @param {Object} elem
 */

function createConfigNode(elem){
	var arreglo = elem.valores;
	
	var table1 = $("<table>").addClass("table-striped table1").css("width","100%");
	var thead = $("<thead>").html("<tr>"+
	    "<th>Atributo</th>"+
	    "<th>Valor</th>"+
	    "</tr>");
	var tbody = $("<tbody>");
	$.each(arreglo.$atributos,function(key,value){
		var td = crearTdKeyValue(key,value);
		var tr = $("<tr>");
		tr.append(td[0]);
		tr.append(td[1]);
		tbody.append(tr);
	});
	table1.append(thead);
	table1.append(tbody);
	
	var table2 = $("<table>").addClass("table-striped table2").css("width","100%");
	var thead = $("<thead>").html("<tr>"+
	    "<th>Atributo</th>"+
	    "<th>Valor</th>"+
	    "</tr>");
	var tbody = $("<tbody>");
	var attr = "$esteCampo";
	var tr = $("<tr>").append(crearTdKeyValue(attr,arreglo[attr]));
	tbody.append(tr);
	var attr = "header1";
	var tr = $("<tr>").append(crearTdTextAreaKeyValue(attr,arreglo[attr]));
	tbody.append(tr);
	var attr = "footer1";
	var tr = $("<tr>").append(crearTdTextAreaKeyValue(attr,arreglo[attr]));
	tbody.append(tr);
	var attr = "footer2";
	if(arreglo[attr]){
		var tr = $("<tr>").append(crearTdTextAreaKeyValue(attr,arreglo[attr]));
		tbody.append(tr);	
	}
	table2.append(thead);
	table2.append(tbody);
	
	var div = $('<div>').append(table1).append(table2);
	return div;
}

function crearTdKeyValue(key,value){
	var td1 = $("<td>").html(key);
	var input = $("<input>").addClass("form-control").attr("key",key).attr("value",value);
	var td2 = $("<td>").append(input);
	return [td1,td2];
}

function crearTdTextAreaKeyValue(key,arreglo){
	var valor = new String();
	$.each(arreglo,function(i,v){
		valor += v + "\n";
	});
	var td1 = $("<td>").html(key);
	var input = $("<textarea>")
		.addClass("form-control")
		.attr("key",key)
		.attr("rows",arreglo.length)
		.html(valor);
	var td2 = $("<td>").append(input);
	return [td1,td2];
}

function saveDataInNode(){
	$(".table1 tr>td:nth-child(2)").children().each(function(i,v){
		var key = $(v).attr("key");
		var valor = new String();
		if(v.tagName=="INPUT"){
			valor = v.value;
		} else if(v.tagName=="TEXTAREA"){
			valor = $(v).html().split('\n');
		}
		elementoActual.valores.$atributos[key] = valor;
	});
	$(".table2 tr>td:nth-child(2)").children().each(function(i,v){
		var key = $(v).attr("key");
		var valor = new String();
		if(v.tagName=="INPUT"){
			valor = v.value;
		} else if(v.tagName=="TEXTAREA"){
			valor = $(v).html().split('\n');
		}
		// console.log(key,valor);
		elementoActual.valores[key] = valor;
	});
	$('#myModal').modal('hide');
}

function openDialog(elem){
	elementoActual = elem;
	var tabla = createConfigNode(elem);
	$("#myModal .modal-body").empty();
	$("#myModal .modal-body").append(tabla);
	$('#myModal').modal('show');
}

$(".nested_with_no_drop .icon-config").each(function( index ) {
  crearAtributos(this,$(this).attr('value'));
});


function updateCode(){
	var contenido = $('#contenidoFormulario').children();
	var texto = searchChildComponents(contenido);
	editor.gotoLine(53);
	editor.insert(texto);
}

function searchChildComponents(contenido){
	var texto = new String();
	$.each(contenido,function(i,v){
		texto = convertirJSON2PHP(v);
	});
	return texto;
}

function convertirJSON2PHP(contenidonodo){
	var nodo = $(contenidonodo).find('.icon-config')[0];
	var valores = nodo.valores;
	var texto = new String();
	$.each(valores.header1,function(i,v){
		texto += v + "\n";
	});
	texto += "$esteCampo = " + valores.$esteCampo + "\n";;
	$.each(valores.$atributos,function(i,v){
		texto += "$atributos ['" + i + "'] = " + v + "\n";
	});
	$.each(valores.footer1,function(i,v){
		texto += v + "\n";
	});
	if(valores.content==true){
		var contenido = $(contenidonodo).children("ol").children();
		console.log(contenido);
		$.each(contenido,function(i,v){
			texto += convertirJSON2PHP(v);
		});		
	}
	if(valores.footer2){
		$.each(valores.footer2,function(i,v){
			texto += v + "\n";
		});
	}
	return texto;
}
