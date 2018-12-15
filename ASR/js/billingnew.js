/* Shivving (IE8 is not supported, but at least it won't look as awful)
/* ========================================================================== */

(function (document) {
	// var
	// head = document.head = document.getElementsByTagName('head')[0] || document.documentElement,
	// elements = 'article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output picture progress section summary time video x'.split(' '),
	// elementsLength = elements.length,
	// elementsIndex = 0,
	// element;

	// while (elementsIndex < elementsLength) {
	// 	element = document.createElement(elements[++elementsIndex]);
	// }

	// element.innerHTML = 'x<style>' +
	// 	'article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
	// 	'audio[controls],canvas,video{display:inline-block}' +
	// 	'[hidden],audio{display:none}' +
	// 	'mark{background:#FF0;color:#000}' +
	// '</style>';

	document.querySelector('table.customerbill tbody').appendChild(generateTableRow());
	document.querySelector('table.customerbill tbody').appendChild(generateTableRow());
	document.querySelector('table.customerbill tbody').appendChild(generateTableRow());
	// document.querySelector('table.customerbill tbody').appendChild(generateTableRow());
	// document.querySelector('table.customerbill tbody').appendChild(generateTableRow());

	 document.getElementById("updatestock").removeEventListener('click', generateBillAndUpdateStock);
	 document.getElementById("updatestock").addEventListener('click', generateBillAndUpdateStock);


	// document.getElementById("updatestock").removeEventListener('click', generateBillAndUpdateStock);
	 document.getElementById("taxinvoice").addEventListener('click', generateBillAndUpdateStock);	 
	 document.getElementById("quotation").addEventListener('click', generateBillAndUpdateStock);	 

	// return head.insertBefore(element.lastChild, head.firstChild);

})(document);

/* Prototyping
/* ========================================================================== */

(function (window, ElementPrototype, ArrayPrototype, polyfill) {
	function NodeList() { [polyfill] }
	NodeList.prototype.length = ArrayPrototype.length;

	ElementPrototype.matchesSelector = ElementPrototype.matchesSelector ||
	ElementPrototype.mozMatchesSelector ||
	ElementPrototype.msMatchesSelector ||
	ElementPrototype.oMatchesSelector ||
	ElementPrototype.webkitMatchesSelector ||
	function matchesSelector(selector) {
		return ArrayPrototype.indexOf.call(this.parentNode.querySelectorAll(selector), this) > -1;
	};

	ElementPrototype.ancestorQuerySelectorAll = ElementPrototype.ancestorQuerySelectorAll ||
	ElementPrototype.mozAncestorQuerySelectorAll ||
	ElementPrototype.msAncestorQuerySelectorAll ||
	ElementPrototype.oAncestorQuerySelectorAll ||
	ElementPrototype.webkitAncestorQuerySelectorAll ||
	function ancestorQuerySelectorAll(selector) {
		for (var cite = this, newNodeList = new NodeList; cite = cite.parentElement;) {
			if (cite.matchesSelector(selector)) ArrayPrototype.push.call(newNodeList, cite);
		}

		return newNodeList;
	};

	ElementPrototype.ancestorQuerySelector = ElementPrototype.ancestorQuerySelector ||
	ElementPrototype.mozAncestorQuerySelector ||
	ElementPrototype.msAncestorQuerySelector ||
	ElementPrototype.oAncestorQuerySelector ||
	ElementPrototype.webkitAncestorQuerySelector ||
	function ancestorQuerySelector(selector) {
		return this.ancestorQuerySelectorAll(selector)[0] || null;
	};
})(this, Element.prototype, Array.prototype);

/* Helper Functions
/* ========================================================================== */
 function taxInvoice(){

  // generateBillAndUpdateStock();
  
}
function generateBillAndUpdateStock(event){
		console.log(event);
		var targetId = event.target.id;
		var totalLength = $(".itemcode").length;
		var billArray = [],billJSON={};
		for(var i =0 ;i < totalLength; i++){
			var jsonToAppend = {};
			jsonToAppend.product_code = parseInt($(".itemcode")[i].value);
			jsonToAppend.productcode = parseInt($(".itemcode")[i].value);
			jsonToAppend.quantity = parseInt($(".quantity")[i].value);
			jsonToAppend.price_per_unit = parseInt($(".unitprice")[i].value);
			jsonToAppend.gst = parseInt($(".gstbill")[i].value);
			jsonToAppend.total = parseInt($(".price")[i].value);
			jsonToAppend.productname = $(".productname")[i].value;
			
			
			if(!isNaN(jsonToAppend.product_code))	
			billArray.push(jsonToAppend);
		}
		billJSON.items = billArray;
		
		// billJSON.customer_name = $(".customer_name")[0].value;
		billJSON.customer_name = "";
		billJSON.totalprice = parseInt($(".totalprice")[0].value);
		billJSON.discountpercentage = parseInt($(".discountpercentage")[0].value);
		billJSON.priceforcustomer = parseInt($(".priceforcustomer")[0].value);
		
		console.log(billJSON)		
		localStorage['billJSON']	=  JSON.stringify(billJSON);
		if(targetId == "quotation"){
			
			window.location = "billinvoice.html?quotation=yes;"
		}else{
			$.ajax({
		      url: "http://localhost:8081/api/generateBill",
		      type:"POST",
		      contentType: "application/json",
		      data: JSON.stringify(billJSON),
		      cors: true,
		      success: function(resultData){
		         // $("#productName").val("");
		      	alert(resultData); 
				$.notify("Stock uploaded successfully", resultData);
				
				
				if(targetId == "taxinvoice")
					window.location = "billinvoice.html";
				else
					window.location = "customerBill.html";
				

		        
		      },
		      failure: function(resultData){
		      	console.log(resultData);
		      }
	      });	
		}
}

function generateTableRow() {
	var emptyColumn = document.createElement('tr');
	var sno = $(".customerbill tr").length;
	emptyColumn.innerHTML = '<td><button tabindex="-1" type="button" class="remove">remove</button></td>'+
		'<td><span ><input class="itemcode" type="text"></span></td>' +
		'<td><span><input class="productname" type="text"></span></td>' +
		'<td><span><input class="unitprice" type="text" disabled=true></span></td>' +
		'<td><span><input  class="quantity" type="text" value="1"></span></td>' +
		'<td><span><input  class="gstbill" type="text" disabled=true value="0"></td></span>' +
		'<td><span><input class="price" type="text" disabled=true></span></td>';

	// emptyColumn.innerHTML = '<td>1</td>'+
	// '<td><a class="cut">-</a>'+
	// 	'<span  class="itemcode"><input ></span></td>' +
	// 	'<td><span ><input ></span></td>' +
	// 	'<td><span data-prefix>$</span> <span><input value="0.00"></span></td>' +
	// 	'<td><span ><input value="0"></span></td>' +
	// 	'<td><span data-prefix>$</span><span><input value="0.00"></span></td>';

	return emptyColumn;
}

function parseFloatHTML(element) {
	return parseFloat(element.value.replace(/[^\d\.\-]+/g, '')) || 0;
}

function parsePrice(number) {
	return number.toFixed(2).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,');
}

/* Update Number
/* ========================================================================== */

function updateNumber(e) {
	var
	activeElement = document.activeElement,
	value = parseFloat(activeElement.innerHTML),
	wasPrice = activeElement.innerHTML == parsePrice(parseFloatHTML(activeElement));

	if (!isNaN(value) && (e.keyCode == 38 || e.keyCode == 40 || e.wheelDeltaY)) {
		e.preventDefault();

		value += e.keyCode == 38 ? 1 : e.keyCode == 40 ? -1 : Math.round(e.wheelDelta * 0.025);
		value = Math.max(value, 0);

		activeElement.innerHTML = wasPrice ? parsePrice(value) : value;
	}

	updateInvoice();
}

function associateEvents(){
	$(".itemcode").unbind();
	$(".quantity").unbind();
	$(".addRow").unbind();
	$(".remove").unbind();
	$(".discountpercentage").unbind();
	
	
	$(".addRow").bind("click", function(){
		document.querySelector('table.customerbill tbody').appendChild(generateTableRow());
    $('.productname').typeahead( { source:productNames } );
		associateEvents();
	});

	$(".discountpercentage").bind("keyup", function(){
		updateInvoice();
	});


	$(".remove").bind("click", function(){
		
		// if(document.querySelector('table.customerbill tbody tr').length != 1)
		this.parentElement.parentElement.remove();
		updateInvoice();
	});

	$(".quantity").bind("blur", function(){
		
		var quantity = parseInt(this.value);
		var price = parseInt(this.parentNode.parentNode.previousElementSibling.children[0].children[0].value);	
		var gst = parseInt(this.parentNode.parentNode.nextElementSibling.children[0].children[0].value);		
		var totalPriceElem = this.parentNode.parentNode.nextElementSibling.nextElementSibling.children[0].children[0];
		totalPriceElem.value = quantity * (price + ((price *gst) / 100));

		 // elementTotal.value = parseFloat((resultData[0].retail_rate)) + parseFloat( (resultData[0].retail_rate  * resultData[0].gst_type ) / 100 );  
		updateInvoice();

	});

	


	$(".productname").bind("blur", function(){

  		var rowId = $(this).closest("tr").index();
  		console.log(this.value)
  		this.value = this.value.split(" ||")[0];
  		var productId = productIds[this.value];
  		console.log(this.value)
  		
  		console.log(productId);	
  		updateRow(productId,rowId);
	});	
	$(".itemcode").bind("blur", function(){
  		var rowId = $(this).closest("tr").index();
  		var productId = this.value;

  		updateRow(productId,rowId);
	});


}

/* Update Invoice
/* ========================================================================== */

function updateRow(productId,rowId) {
       	
	
	var elemName = $('.productname')[rowId];
	var elemPrice = $('.unitprice')[rowId];
	var elementGst = $('.gstbill')[rowId];
	var elementTotal =$(".price")[rowId];
	var elementId =$(".itemcode")[rowId];
	// var elementGst = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
	
    	$.ajax({
      url: "http://localhost:8081/api/getAllProducts?id="+parseInt(productId),
      type:"POST",
      cors: true,
      success: function(resultData){
         // $("#productName").val("");
        if(resultData.length == 1){
         elemName.value = (resultData[0].product_name);  
         elemPrice.value = (resultData[0].retail_rate);  
         elementGst.value =  (resultData[0].gst_type + "%");
         elementId.value = productId;
         

         elementTotal.value = parseFloat((resultData[0].retail_rate)) + parseFloat( (resultData[0].retail_rate  * resultData[0].gst_type ) / 100 );  
         updateInvoice();
         	

        }else{
        	// alert("invalid Id");
        	elemName.value = "";  
         	elemPrice.value = 0;  
         	elementGst.value =  0; 
         	// elemPrice.innerText = 0;  
         	updateInvoice();
        }
        
      },
      failure: function(resultData){
        console.log(resultData) 
      }
      });
      
}
function updateInvoice() {
	
	var total = 0;
	var cells, price, total, a, i;

	// update inventory cells
	// ======================

	for (var a = document.querySelectorAll('table.customerbill tbody tr'), i = 0; a[i]; ++i) {
	// 	// get inventory row cells
		cells = a[i].querySelectorAll('input:last-child');

	// 	// set price as cell[2] * cell[3]
		price = parseFloatHTML(cells[2]) * parseFloatHTML(cells[3]);


	// 	// add gst 


		price  = price + ( price * parseFloat(cells[4].value) / 100 )
	// 	// add price to total

		total += price;
	// 	// set row total
	// 	cells[5].value = price;
	}

	// update balance cells
	// ====================

	// get balance cells
	cells = document.querySelectorAll('table.balance td:last-child input:last-child');

	// set total
	cells[0].value = total;

	// set balance and meta balance
	cells[2].value = parsePrice(total + ( total * ( parseFloatHTML(cells[1]) / 100 ) ) ) ;

	// update prefix formatting
	// ========================

	// var prefix = document.querySelector('#prefix').innerHTML;
	// for (a = document.querySelectorAll('[data-prefix]'), i = 0; a[i]; ++i) a[i].innerHTML = prefix;

	// update price formatting
	// =======================

	// for (a = document.querySelectorAll('span[data-prefix] + span'), i = 0; a[i]; ++i) if (document.activeElement != a[i]) a[i].innerHTML = parsePrice(parseFloatHTML(a[i]));
}

/* On Content Load
/* ========================================================================== */

function onContentLoad() {
	updateInvoice();

// 	var
// 	input = document.querySelector('input'),
// 	image = document.querySelector('img');

// 	function onClick(e) {
// 		var element = e.target.querySelector('[contenteditable]'), row;

// 		element && e.target != document.documentElement && e.target != document.body && element.focus();

// 		if (e.target.matchesSelector('.add')) {
// 			document.querySelector('table.inventory tbody').appendChild(generateTableRow());
// 		}
// 		else if (e.target.className == 'cut') {
// 			row = e.target.ancestorQuerySelector('tr');

// 			row.parentNode.removeChild(row);
// 		}

		updateInvoice();
		associateEvents();
// 	}

// 	function onEnterCancel(e) {
// 		e.preventDefault();

// 		image.classList.add('hover');
// 	}

// 	function onLeaveCancel(e) {

// 		e.preventDefault();

// 		image.classList.remove('hover');
// 	}

// 	function onFileInput(e) {
// 		image.classList.remove('hover');

// 		var
// 		reader = new FileReader(),
// 		files = e.dataTransfer ? e.dataTransfer.files : e.target.files,
// 		i = 0;

// 		reader.onload = onFileLoad;

// 		while (files[i]) reader.readAsDataURL(files[i++]);
// 	}

// 	function onFileLoad(e) {
// 		var data = e.target.result;

// 		image.src = data;
// 	}





// 	if (window.addEventListener) {
// 		document.addEventListener('click', onClick);

// 		document.addEventListener('mousewheel', updateNumber);
// 		document.addEventListener('keydown', updateNumber);

// 		document.addEventListener('keydown', updateInvoice);
// 		document.addEventListener('keyup', updateInvoice);
// if(input != null){
// 		input.addEventListener('focus', onEnterCancel);
// 		input.addEventListener('mouseover', onEnterCancel);
// 		input.addEventListener('dragover', onEnterCancel);
// 		input.addEventListener('dragenter', onEnterCancel);

// 		input.addEventListener('blur', onLeaveCancel);
// 		input.addEventListener('dragleave', onLeaveCancel);
// 		input.addEventListener('mouseout', onLeaveCancel);

// 		input.addEventListener('drop', onFileInput);
// 		input.addEventListener('change', onFileInput);
// 		}
// 	}
// var productName = new Bloodhound({
// 	  queryTokenizer: Bloodhound.tokenizers.whitespace('product_name'),
//   datumTokenizer: Bloodhound.tokenizers.whitespace,	
//   identify: function(obj) { return obj.product_name; },
//   prefetch: 'http://localhost:8081/api/getAllProductName'
// });


var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;

    // an array that will be populated with substring matches
    matches = [];

    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');

    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};

var states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
  'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
  'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];



function sampleFunc(q, sync) {
  if (q === '') {
    //sync(nflTeams.get('Detroit Lions', 'Green Bay Packers', 'Chicago Bears'));
  }

  else {
    productName.search(q, sync);
  }
}




 productNames = new Array();
productIds = new Object();
$.getJSON( 'http://localhost:8081/api/getAllProductName', null,
       function ( jsonData )
        {
            $.each( jsonData, function ( index, product )
            {
                productNames.push( product.product_name + " || " + product.company_name);
                productIds[product.product_name] = product.id;
            } );
            $('.typehead').unbind();
            $('.productname').typeahead( { source:productNames } );
       });




// $('.productname').typeahead({
//   hint: true,
//   highlight: true,
//   minLength: 1
// },
// {
//   name: 'productName',
//   source: sampleFunc
// });
// }
}
window.addEventListener && document.addEventListener('DOMContentLoaded', onContentLoad);
