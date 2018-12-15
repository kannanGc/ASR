/* Shivving (IE8 is not supported, but at least it won't look as awful)
/* ========================================================================== */

(function (document) {
	var
	head = document.head = document.getElementsByTagName('head')[0] || document.documentElement,
	elements = 'article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output picture progress section summary time video x'.split(' '),
	elementsLength = elements.length,
	elementsIndex = 0,
	element;

	while (elementsIndex < elementsLength) {
		element = document.createElement(elements[++elementsIndex]);
	}

	element.innerHTML = 'x<style>' +
		'article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
		'audio[controls],canvas,video{display:inline-block}' +
		'[hidden],audio{display:none}' +
		'mark{background:#FF0;color:#000}' +
	'</style>';

	document.querySelector('table.inventory tbody').appendChild(generateTableRow());
	document.querySelector('table.inventory tbody').appendChild(generateTableRow());
	document.querySelector('table.inventory tbody').appendChild(generateTableRow());
	document.querySelector('table.inventory tbody').appendChild(generateTableRow());
	document.querySelector('table.inventory tbody').appendChild(generateTableRow());

	document.getElementById("updatestock").removeEventListener('click', generateBillAndUpdateStock);
	document.getElementById("updatestock").addEventListener('click', generateBillAndUpdateStock);

	return head.insertBefore(element.lastChild, head.firstChild);

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

function generateBillAndUpdateStock(event){
		console.log("hai33");
		debugger;
		var totalLength = $(".itemcode").length;
		var billArray = [],billJSON={};
		for(var i =0 ;i < totalLength; i++){
			var jsonToAppend = {};
			jsonToAppend.product_code = $(".itemcode")[i].innerText;
			jsonToAppend.productcode = $(".itemcode")[i].innerText;
			jsonToAppend.quantity = $(".quantity")[i].innerText;
			jsonToAppend.price_per_unit = $(".unitprice")[i].innerText;
			jsonToAppend.gst = $(".gst")[i].innerText;
			jsonToAppend.total = $(".price")[i].innerText;
			
			if(jsonToAppend.product_code.trim() != "")
			billArray.push(jsonToAppend);
		}
		billJSON.items = billArray;
		billJSON.totalprice = $(".totalprice")[0].innerText;
		billJSON.discountpercentage = $(".discountpercentage")[0].innerText;
		billJSON.priceforcustomer = $(".priceforcustomer")[0].innerText;
		
	console.log(billJSON)		
		$.ajax({
	      url: "http://localhost:8081/api/generateBill",
	      type:"POST",
	      contentType: "application/json",
	      data: JSON.stringify(billJSON),
	      cors: true,
	      success: function(resultData){
	         // $("#productName").val("");
	      	console.log(resultData); 
			 $.notify("Stock uploaded successfully",resultData);
	      	 	
	        
	      },
	      failure: function(resultData){
	      	console.log(resultData);
	      }
      });
      
		

}
function generateTableRow() {
}
function generateTableRow1() {
	var emptyColumn = document.createElement('tr');
	var sno = $(".inventory tr").length;
	emptyColumn.innerHTML = '<td>'+sno+'</td>'+
	'<td><a class="cut">-</a>'+
		'<span contenteditable class="itemcode"></span></td>' +
		'<td><span contenteditable class="productname"></span></td>' +
		'<td><span data-prefix>$</span><span contenteditable class="unitprice">0.00</span></td>' +
		'<td><span contenteditable class="quantity">1</span></td>' +
		'<td><span contenteditable class="gst">1</span></td>' +
		'<td><span data-prefix>$</span><span class="price">0.00</span></td>';

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
	return parseFloat(element.innerHTML.replace(/[^\d\.\-]+/g, '')) || 0;
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
	$(".itemcode").bind("blur", function(){
		debugger;
	var elemName = this.parentElement.nextElementSibling.children[0];	
	var elemPrice = this.parentElement.nextElementSibling.nextElementSibling.children[1];
	var elementGst = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
	// var elementGst = this.parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.children[0];
	var productId = this.innerText;
    	$.ajax({
      url: "http://localhost:8081/api/getAllProducts?id="+parseInt(productId),
      type:"POST",
      cors: true,
      success: function(resultData){
         // $("#productName").val("");
        if(resultData.length == 1){
         elemName.innerText = (resultData[0].product_name);  
         elemPrice.innerText = (resultData[0].retail_rate);  
         elementGst.innerText =  (resultData[0].gst_type + "%"); 
        }else{
        	alert("invalid Id");
        	elemName.innerText = "";  
         	elemPrice.innerText = 0;  
         	elementGst.gst_type =  0; 
         	// elemPrice.innerText = 0;  
         	updateInvoice();
        }
        
      },
      failure: function(resultData){
        console.log(resultData) 
      }
      });
      
	});
}

/* Update Invoice
/* ========================================================================== */


function updateInvoice() {
	var total = 0;
	var cells, price, total, a, i;

	// update inventory cells
	// ======================

	for (var a = document.querySelectorAll('table.inventory tbody tr'), i = 0; a[i]; ++i) {
		// get inventory row cells
		cells = a[i].querySelectorAll('span:last-child');

		// set price as cell[2] * cell[3]
		price = parseFloatHTML(cells[2]) * parseFloatHTML(cells[3]);


		// add gst 


		price  = price + ( price * parseFloat(cells[4].innerText) / 100 )
		// add price to total

		total += price;
		// set row total
		cells[5].innerHTML = price;
	}

	// update balance cells
	// ====================

	// get balance cells
	cells = document.querySelectorAll('table.balance td:last-child span:last-child');

	// set total
	cells[0].innerHTML = total;

	// set balance and meta balance
	cells[2].innerHTML = document.querySelector('table.meta tr:last-child td:last-child span:last-child').innerHTML = parsePrice(total + ( total * ( parseFloatHTML(cells[1]) / 100 ) ) ) ;

	// update prefix formatting
	// ========================

	var prefix = document.querySelector('#prefix').innerHTML;
	for (a = document.querySelectorAll('[data-prefix]'), i = 0; a[i]; ++i) a[i].innerHTML = prefix;

	// update price formatting
	// =======================

	for (a = document.querySelectorAll('span[data-prefix] + span'), i = 0; a[i]; ++i) if (document.activeElement != a[i]) a[i].innerHTML = parsePrice(parseFloatHTML(a[i]));
}

/* On Content Load
/* ========================================================================== */

function onContentLoad() {
	updateInvoice();

	var
	input = document.querySelector('input'),
	image = document.querySelector('img');

	function onClick(e) {
		var element = e.target.querySelector('[contenteditable]'), row;

		element && e.target != document.documentElement && e.target != document.body && element.focus();

		if (e.target.matchesSelector('.add')) {
			document.querySelector('table.inventory tbody').appendChild(generateTableRow());
		}
		else if (e.target.className == 'cut') {
			row = e.target.ancestorQuerySelector('tr');

			row.parentNode.removeChild(row);
		}

		updateInvoice();
		associateEvents();
	}

	function onEnterCancel(e) {
		e.preventDefault();

		image.classList.add('hover');
	}

	function onLeaveCancel(e) {

		e.preventDefault();

		image.classList.remove('hover');
	}

	function onFileInput(e) {
		image.classList.remove('hover');

		var
		reader = new FileReader(),
		files = e.dataTransfer ? e.dataTransfer.files : e.target.files,
		i = 0;

		reader.onload = onFileLoad;

		while (files[i]) reader.readAsDataURL(files[i++]);
	}

	function onFileLoad(e) {
		var data = e.target.result;

		image.src = data;
	}





	if (window.addEventListener) {
		document.addEventListener('click', onClick);

		document.addEventListener('mousewheel', updateNumber);
		document.addEventListener('keydown', updateNumber);

		document.addEventListener('keydown', updateInvoice);
		document.addEventListener('keyup', updateInvoice);
if(input != null){
		input.addEventListener('focus', onEnterCancel);
		input.addEventListener('mouseover', onEnterCancel);
		input.addEventListener('dragover', onEnterCancel);
		input.addEventListener('dragenter', onEnterCancel);

		input.addEventListener('blur', onLeaveCancel);
		input.addEventListener('dragleave', onLeaveCancel);
		input.addEventListener('mouseout', onLeaveCancel);

		input.addEventListener('drop', onFileInput);
		input.addEventListener('change', onFileInput);
		}
	}

}

window.addEventListener && document.addEventListener('DOMContentLoaded', onContentLoad);
