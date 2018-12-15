
(function ($) {

	var billJSON = JSON.parse(localStorage["billJSON"]);
	var count = 1;
	debugger;
	for (var item in billJSON.items){	
		$("#billBody").append("<tr>"+
		"<td>"+count+"</td>"+
		"<td>"+billJSON.items[item].productname+"</td>"+
		"<td>"+billJSON.items[item].product_code+"</td>"+
		"<td>"+billJSON.items[item].gst+"</td>"+
		"<td>"+billJSON.items[item].quantity+"</td>"+
		"<td>"+billJSON.items[item].price_per_unit+"</td>"+
		"<td>"+'Nos'+"</td>"+
		"<td></td>"+
		"<td>"+billJSON.items[item].total+"</td>"+
		"</tr>");

		
		

		count++;
	}

	 $("#billBody").append("<tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>"+
     "<td class='price'>"+billJSON.totalprice+"</td></tr> ");

           
     $("#billBody").append("<tr><td></td><td>CGST OUTPUT</td><td></td><td></td><td></td><td></td><td></td><td></td>"+
       "<td >44</td></tr> ");

      $("#billBody").append("<tr><td></td><td>SGST OUTPUT</td><td></td><td></td><td></td><td></td><td></td><td></td>"+
       "<td >44</td></tr> ");
      $("#billBody").append("<tr><td></td><td>ROUND OFF</td><td></td><td></td><td></td><td></td><td></td><td></td>"+
       "<td >44</td></tr> ");
       
      $("#totalAmount").html(billJSON.totalprice) 


	function printDiv(divName) {
	     var printContents = document.getElementById(divName).innerHTML;
	     var originalContents = document.body.innerHTML;

	     document.body.innerHTML = printContents;

	     window.print();

	     document.body.innerHTML = originalContents;
	}

	
})(jQuery); 
