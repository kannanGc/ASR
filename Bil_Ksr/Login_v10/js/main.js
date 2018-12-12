
(function ($) {
    "use strict";


    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

     $("#test").on('click',function(){
      var username = $("#username").val();
      var password = $("#password").val();
       var jsonData = {
        "username":username,
        "password":password
       };
       
       console.log(jsonData);
        $.ajax({
        url: "http://localhost:8081/api/login",
        type:"POST",
        contentType: "application/json",
        data: JSON.stringify(jsonData),
        cors: true,
          success: function(resultData){
             if(resultData == "FAILED"){

             }else{
              window.location="newbill.html" 
             } 
             
            
          },
          failure: function(resultData){
            console.log(resultData) 
          }
        });

    });


    $("#productCode").on('blur',function(){
       
      $.ajax({
      url: "http://localhost:8081/api/getAllProducts?id="+parseInt($("#productCode").val()),
      type:"POST",
      cors: true,
      success: function(resultData){
         $("#productName").val("");
        if(resultData.length == 1){
         $("#productName").val(resultData[0].product_name);  
        }
        
      },
      failure: function(resultData){
        console.log(resultData) 
      }
      });

    });

    $('#submitAddProduct').on('click',function(){
      var productName =   $("#productName").val();
      var companyName =   $("#companyName").val(); 
      var pack =   parseInt($("#pack").val());                
      var productGroup =   parseInt($("#productGroup").val());
      var gstType = parseInt($("#gstType").val());
      var wholesaleRate =   parseInt($("#wholesaleRate").val());
      var retailRate =  parseInt($("#retailRate").val());      
      var alert =   parseInt($("#alert").val());
      var jsonData = {
        "productName":productName,
        "companyName":companyName,
        "productGroup":productGroup,
        "pack":pack,
        "gstType":gstType,
        "wholesaleRate":wholesaleRate,
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
        $("#companyName").val(""); 
        $("#wholesaleRate").val("");
        $("#retailRate").val("");
        $("#alert").val("");
      },
      failure: function(resultData){
        console.log(resultData) 
      }

      });


    });



    $('#Upload').on('click',function(){
      var productCode =   parseInt($("#productCode").val());
      var quantity =   parseInt($("#quantity").val()); 
      
      var jsonData = [{
        "product_code":productCode,
        "quantity":quantity
      }];
      console.log(jsonData);

      $.ajax({
      url: "http://localhost:8081/api/updatestock",
      type:"POST",
         data: JSON.stringify(jsonData),
         contentType: "application/json",
         cors: true,
      success: function(resultData){
      $.notify("Stock uploaded successfully", "success");
        $("#productCode").val("");
        $("#productName").val("");
        $("#quantity").val(""); 
      },
      failure: function(resultData){
        console.log(resultData) 
      }

      });


    });

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        // 
        // if(check){
        //     location.href="header.html"
        // }
        return false;
    });




    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }



    

})(jQuery); 