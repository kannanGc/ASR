
(function ($) {

	
 	  $.ajax({
	      url: "http://localhost:8081/api/getAllCompanyName",
	      type:"GET",
	         cors: true,
	      success: function(companyName){
	       for(var name in companyName){
	       	$("#companyName").append('<option value='+companyName[name].id+'>'+companyName[name].company_name+'</option>');
	       }
	      },
	      failure: function(resultData){
	        console.log(resultData) 
	      }

      });

     $.ajax({
        url: "http://localhost:8081/api/getAllPacks",
        type:"GET",
           cors: true,
        success: function(companyName){
         for(var name in companyName){
          $("#pack").append('<option value='+companyName[name].id+'>'+companyName[name].pack_name+'</option>');
         }
        },
        failure: function(resultData){
          console.log(resultData) 
        }

      });

      $.ajax({
        url: "http://localhost:8081/api/getAllProductGroup",
        type:"GET",
           cors: true,
        success: function(companyName){
         for(var name in companyName){
          $("#productGroup").append('<option value='+companyName[name].id+'>'+companyName[name].product_group_name+'</option>');
         }
        },
        failure: function(resultData){
          console.log(resultData) 
        }

      });



  	  $.ajax({
	      url: "http://localhost:8081/api/getAllHSNCodes",
	      type:"GET",
	         cors: true,
	      success: function(hsncodes){
	      console.log(hsncodes);
	      
	      for(var code in hsncodes){
	       	$("#hsnCode").append('<option value='+hsncodes[code].id+'>'+hsncodes[code].hsn_code+'</option>');
	       }
	      },
	      failure: function(resultData){
	        console.log(resultData) 
	      }

      });

      $.ajax({
        url: "http://localhost:8081/api/getAllGst",
        type:"GET",
           cors: true,
        success: function(gstType){
        console.log(gstType);
        
        for(var gst in gstType){
          $("#gstType").append('<option value='+gstType[gst].id+'>'+gstType[gst].gst_type+'</option>');
         }
        },
        failure: function(resultData){
          console.log(resultData) 
        }

      });



	$('#submitAddProduct').on('click',function(){

      var hsnCode = parseInt($("#hsnCode").val().trim());
      var companyName =   parseInt($("#companyName").val().trim()); 
      var pack =   parseInt($("#pack").val());                
      var productGroup =   parseInt($("#productGroup").val());
      var gstType = parseInt($("#gstType").val());

      var productName =   $("#productName").val();
      var wholesaleRate =   $("#wholesaleRate").val();
      var noofstockin =   parseInt($("#noofstock").val());
      var retailRate =  parseInt($("#retailRate").val());      
      var alert =   parseInt($("#alert").val());

      if(productName == "" || wholesaleRate == "" || isNaN(noofstockin) || isNaN(retailRate) || isNaN(alert) )  {
        $.notify("Please fill the details", "error");
      }else{




      var jsonData = {
        "hsnCode":hsnCode,
        "productName":productName,
        "companyName":companyName,
        "productGroup":productGroup,
        "pack":pack,
        "gstType":gstType,
        "wholesaleRate":wholesaleRate,
        "noofstockin":noofstockin,
        "retailRate":retailRate,
        "alert":alert
      };
      console.log(jsonData);

      $.ajax({
      url: "http://localhost:8081/api/insertProduct",
      type:"POST",
         data: JSON.stringify(jsonData ),
         contentType: "application/json",
         cors: true,
      success: function(resultData){
      $.notify("Product added successfully", "success");
        $("#productName").val("");
        // $("#companyName").val(""); 
        $("#wholesaleRate").val("");
        $("#retailRate").val("");
        $("#alert").val("");
      },
      failure: function(resultData){
        $.notify("Try again, Problem updating data", "error");
        console.log(resultData) 
      }

      });
    }

    });

})(jQuery); 	