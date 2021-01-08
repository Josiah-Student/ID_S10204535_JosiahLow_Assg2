$(document).ready(function () {

    $("#res").hide();



    document.getElementById("btnSubmit").addEventListener("click", function(event){
        event.preventDefault();
        event.stopImmediatePropagation();

         
        if (document.getElementById("inputText") == ""){  
            
            alert("Name can't be blank"); 
            return false;   
            
        }
        else{
            let bool = document.querySelector('input[name="radb"]:checked').value;

            console.log(bool);
            $("#frm").hide();
            $("#res").show();
            Cloud();
            return true;
        }
    })

    function Cloud(){
        let number = document.getElementById("inputNumber").value;
        let name = document.getElementById("inputText").value;
        $.ajax({
            type: "GET",
            datatype: 'json',
            contentType: "text/plain",
            
            url: `https://developers.onemap.sg/commonapi/search?searchVal=${number, name}&getAddrDetails=Y&returnGeom=Y`,
            success: function(result){
                //Set result to a variable for writing
                var TrueResult = JSON.stringify(result);
                console.log(TrueResult);
                let lat = (result.results[0].LATITUDE);
                let long = (result.results[0].LONGTITUDE);
                console.log("Latitude: ",lat)
                console.log("Longitude: ", long)
                $.ajax({
                    type: "GET",
                    datatype: 'json',
                    contentType: "text/plain",
                    url:`https://developers.onemap.sg/privateapi/commonsvc/revgeocode?location=${lat},${long}&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjY5MzgsInVzZXJfaWQiOjY5MzgsImVtYWlsIjoiam9zaWFobG93MkBnbWFpbC5jb20iLCJmb3JldmVyIjpmYWxzZSwiaXNzIjoiaHR0cDpcL1wvb20yLmRmZS5vbmVtYXAuc2dcL2FwaVwvdjJcL3VzZXJcL3Nlc3Npb24iLCJpYXQiOjE2MDk4NTY0NjUsImV4cCI6MTYxMDI4ODQ2NSwibmJmIjoxNjA5ODU2NDY1LCJqdGkiOiIzNmQyZTBmN2RiNmQwMGZjNGQ1ZDdjYTYxZTJiNjcxOSJ9.ThDIaUjjGsUJe8Cq-Vp2KlRY-NmbLlResRlFeahi6Ac&buffer=100&addressType=all`,
                    success: function(result2){
                        var TrueResult2 = JSON.stringify(result2)                    
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