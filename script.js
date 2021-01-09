$(document).ready(function () {

    $("#res").hide();

    $("#frm").validate({
        rules:{

            input1: "required",
            radb: "required"

        },
        errorPlacement: function(error, element) {
            if ( element.is(":radio") ) {
                error.insertAfter( element.parent().parent());
            }
            else { 
                error.insertAfter( element );
            }
        },
        messages:{
            input1: "<b>Please enter a street name",
            radb: "<b>Please choose one"
        }
    })
    
    let btn = document.getElementById("btnSubmit");

    let fun = function(){
        $("#frm").valid();
        let bool = document.querySelector('input[name="radb"]:checked').value;
        $("#form1").hide();
        $("#res").show();
        Cloud();
    }


    btn.addEventListener("click", fun ,false)


    // for mobile view
    if ('ontouchstart' in window) {
        btn.addEventListener("touchstart", function() {
            var touchHndl = function() {
                //call the clickHandler actually
                fun();
                //remove the touchend haldler after perform
                this.removeEventListener(touchHndl)
            }
            //attach a handler for touch end when you are in touchstart event
            this.addEventListener(touchHndl);
        });
    }
    

    function Cloud(){
        let number = document.getElementById("inputNumber").value;
        let name = document.getElementById("inputText").value;
        let chk = document.querySelector('input[name = "radb"]:checked').value;
        
        // first ajax call
        $.ajax({
            type: "GET",
            datatype: 'json',
            contentType: "text/plain",
            
            url: `https://developers.onemap.sg/commonapi/search?searchVal=${number, name}&getAddrDetails=Y&returnGeom=Y`,
            success: function(result){
                var TrueResult = JSON.stringify(result);
                console.log(TrueResult);
                let lat = (result.results[0].LATITUDE);
                let long = (result.results[0].LONGTITUDE);

                console.log("Latitude: ",lat)
                console.log("Longitude: ", long)
                // second ajax call
                $.ajax({
                    type: "GET",
                    datatype: 'json',
                    contentType: "text/plain",
                    url:`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${lat},${long}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY5MzgsInVzZXJfaWQiOjY5MzgsImVtYWlsIjoiam9zaWFobG93MkBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2MTAxMTY5NDcsImV4cCI6MTYxMDU0ODk0NywibmJmIjoxNjEwMTE2OTQ3LCJqdGkiOiJkMmM0YmI4NDlhM2JmOTYwZDM5MDdlZmY5ZTM4OTUwMiJ9.-JRB9LxQjynMOx_iGyT62DncZcAPH2VyTCONvDwQBKU&buffer=${chk}&addressType=all`,
                    success: function(result2){
                        var TrueResult2 = JSON.stringify(result2)  
                        console.log(chk)                  
                        var i;
                        for (i = 0; i < TrueResult2.length; i++) {
                            let build = result2.GeocodeInfo[i].BUILDINGNAME;
                            let block = result2.GeocodeInfo[i].BLOCK;
                            let road = result2.GeocodeInfo[i].ROAD;
                            let post = result2.GeocodeInfo[i].POSTALCODE;
                            $("#para").append("Building Name: ",build, "<br> " ,"Address: ", block," ", road," ", "S", post, "<br>");
                            $("#para").append("<br>") 
   
                    }
        
                    
                  }
        
                });
    
            }})

    }
 




    

    
})