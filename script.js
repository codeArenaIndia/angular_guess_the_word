    function identifyCard(ccNum) {
       
        var pattern = {Visa:/^4/,Master:/^5[1-5]/,Maestro:/^(50|63|66|5[6-8]|6[8-9]|600[0-9]|6010|601[2-9]|60[2-9]|61|620|621|6220|6221[0-1])/};
        var legth = {Visa:16,Master:16,Maestro:19};
        var cvv =  {Visa:3,Master:3,Maestro:0};
        var len= ccNum.length;
        for(x in pattern){
            if((pattern[x]).test( ccNum ) === true){
                document.getElementById('card_type').innerHTML = x;
                if(ccNum.length == 16 && (x == "Visa" || x == "Maestro") || ccNum.length == 19 && x == "Maestro"){
                    document.getElementById('exp_date').removeAttribute('readonly');
                    document.getElementById('cvv').removeAttribute('readonly');
                }
            }
            else{
                console.log("Please enter a valid card number.");
            }
                 
        }
    }   

    function validateForm() {
        var x = document.forms["myForm"]["cvv"].value;
        var y = document.getElementById('card_type').innerText;
        var d = document.forms["myForm"]["exp_date"].value;
        var card_num = document.forms["myForm"]["card_num"].value;
        var ArrayData = [x, y, d,card_num];
        if(y !== "Maestro")
        {
            if(x.length == 3){
                //save to local storage
                storeToLocal(ArrayData,x);
                return true;
            }
            else{
                alert('Incorrect Cvv');
                return false;
            }
        }
        else if(y == undefined){
            alert('Incorrect Card number');
            return false; 
        }
        else{
            storeToLocal(ArrayData,x);
            return true;
        }

    }

    function storeToLocal(ArrayData,x)
    {// Check browser support
        if (typeof(Storage) !== "undefined") {
            // Store
            localStorage.setItem(x,  JSON.stringify(ArrayData));
            // Retrieve
            //document.getElementById("result").innerHTML = localStorage.getItem("lastname");
        } else {
            document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
        }
    }
    function loadCards(){
        var str = "";
        for(var i in localStorage)
        {
            if(localStorage.getItem(i) !== null){
                str = localStorage.getItem(i) + " <br/>" + str; 
                var parts = str.toString().split(",");

                
            }
                    
        }
        document.getElementById('result').innerHTML = str;
    }