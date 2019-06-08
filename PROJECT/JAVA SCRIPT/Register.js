/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//redirectHomePage.redirectingHomePage();

var addrDetail = (function(){ 
    
    return function(){
        var ultag = document.createElement("ul");
        var litag1 = document.createElement("li"); //line1
        var input1 = document.createElement('input');
        
        var span11 = document.createElement('span');
        span11.appendChild(input1);
        
        input1.setAttribute('type','text');
        litag1.setAttribute('id','line1');

        var litag2 = document.createElement('li'); //line 2
        var input2 = document.createElement('input');
        
        var span21 = document.createElement('span');
        span21.appendChild(input2);
        
        input2.setAttribute('type','text');
        litag2.setAttribute('id','line2');

        var litag3 = document.createElement('li'); // landmark
        var input3 = document.createElement('input');
        
        var span31 = document.createElement('span');
        span31.appendChild(input3);
        
        input3.setAttribute('type','text');
        litag3.setAttribute('id','landmark');

        var litag4 = document.createElement('li'); // city
        litag4.setAttribute('id','city');
//        var input4 = document.createElement('input');
//        input4.setAttribute('type','text');

        var litag5 = document.createElement('li'); // State
        litag5.setAttribute('id','state');
//        var input5 = document.createElement('input');
//        input5.setAttribute('type','text');

        var litag6 = document.createElement('li'); // Country
        litag6.setAttribute('id','country');
//        var input6 = document.createElement('input');
//        input6.setAttribute('type','text');

        litag1.innerHTML = "Address Line 1 : ";
        litag1.appendChild(input1);
        ultag.appendChild(litag1);
        
        litag2.innerHTML = 'Address Line 2 : ';
        litag2.appendChild(input2);
        ultag.appendChild(litag2);
        
        litag3.innerHTML = 'Landmark : ';
        litag3.appendChild(input3);
        ultag.appendChild(litag3);        
        
        // City
        var a = countryList();
//        litag4.appendChild(input4);
        litag4.appendChild(a[2]);
        ultag.appendChild(litag4);
        
        // litag5.innerHTML = 'State : ';
//        litag5.appendChild(input5);
        litag5.appendChild(a[1]);
        ultag.appendChild(litag5);
        
       // litag6.innerHTML = 'Country : ';
//        litag6.appendChild(input6);
         litag6.appendChild(a[0]);
        ultag.appendChild(litag6);
        
        console.log("returning");
        return ultag;
    }   
    
})();



$(document).ready(function(){
    console.log("in displaying rows");
    var evenLi = $(".detailsBlock div ul li:even");
    var oddLi = $(".detailsBlock div ul li:odd");
    
    for(var i = 0; i < evenLi.length; i++){
        $(evenLi[i]).css({float:"left",color:"red",clear:"both"});
    }
    
    for(var i = 0; i < oddLi.length; i++){
        $(oddLi[i]).css({float : "left"});
    }
    
});

(function(){
    function displayAddrDetails(){
    var addrArrayBlocks = document.getElementsByClassName('addressDetails');
    for(var i = 0; i<addrArrayBlocks.length; i++){    
        addrArrayBlocks[i].appendChild(addrDetail());
    }
}
    displayAddrDetails();
})();

 var ulChildOfficial = {};
 var ulChildPersonal = {};
var addrCheck = document.querySelector("#sameAddr");
addrCheck.addEventListener('click',function(){
    if(addrCheck.checked){
        var addrObjectOfficial,addrObjectPersonal;
        addrObjectOfficial = $("#officialAddress").children(); // addrObjectOfficial is an array
        console.log(typeof(addrObjectOfficial));    
        var ultagOfficial = addrObjectOfficial[addrObjectOfficial.length-1];
        ulChildOfficial = $(ultagOfficial).children();
        //console.log(ulChildOfficial);
        
        addrObjectPersonal = $('#personalAddress').children(); // addrObjectPersonal is an array
        var ultagPersonal = addrObjectPersonal[addrObjectPersonal.length-1];
        ulChildPersonal = $(ultagPersonal).children();
        //console.log(ulChildPersonal);
        
        for(var i = 0; i < ulChildOfficial.length; i++){
           var officialArray = $(ulChildOfficial[i]).children();
           var personalArray = $(ulChildPersonal[i]).children();
           
           console.log($(officialArray[0]));   // this object has elements at index 0
           if($(personalArray[0]).attr("disabled")){
              console.log("entered to remove disable");
              $(personalArray[0]).removeAttr("disabled");              
              
              var a = $("<option></option>").text($(officialArray[0]).val());
              
              $(personalArray[0]).append(a);
              $(personalArray[0]).selectedIndex = 1;
              console.log("removed disable");
           }
            $(personalArray[0]).val($(officialArray[0]).val());
            $(personalArray[0]).attr("disabled","disabled");           
        }    
        
    }
});

var userDetailsObj = {};
var personalDetailsObj = {};
var educationalDetailsObj = {};
var highestEducationFlagBit = true;


 
function submitUserData(){
    function confirmPwd(){
       if($('#upwd').val() != $('#cpwd').val()){
           alert("confirm password not matching confirm again !!!");
           $('#upwd').val('');
           $('#cpwd').val('');           
           $('#upwd').addClass("highlightClass");           
           return false;
       }
       return true;
    }
    
    if(confirmPwd()){
        console.log("Pwd matched");
        userDetailsReading();
        personalDetailsReading();
        if(highestEducationFlagBit){
            educationalDetailsReading();
        }
        
        educationalDetailsObj.__proto__ =  personalDetailsObj;
        personalDetailsObj.__proto__ = userDetailsObj;
        
        console.log(personalDetailsObj);
        console.log(userDetailsObj);
        console.log(educationalDetailsObj);
    }
}

function userDetailsReading(){   
    userDetailsObj.uname = $('#uname').val();
    
    userDetailsObj.upwd = $('#upwd').val();
    userDetailsObj.uemail = $('#uemail').val();
    userDetailsObj.altemail = $('#altemail').val();
}

function personalDetailsReading(){
    console.log("REading PERsonal Details");
    personalDetailsObj.ufname = $('#ufname').val();
    if($('#mname').val())
        personalDetailsObj.mname = $('#mname').val();
    personalDetailsObj.lname = $('#lname').val();
    
    // Gender  // Why innerHTML not wrking with gender and checkboxes of language
    var g = $("input[name=gender]");
    for(var i = 0; i < g.length; i++){
        if((g[i]).checked){
            personalDetailsObj.gender = g[i].value;
            break;
        }
    }
    
    // Languages
    var langs = [];
    personalDetailsObj.language = [];
    langs = document.getElementsByName("language");
    for(var i = 0; i < langs.length; i++){
        if(langs[i].checked){
           (personalDetailsObj.language).push(langs[i].value);
           console.log("Lang");
           console.log((langs[i]).value);
        }
    }
    console.log("Languages Known");
    console.log(personalDetailsObj.language);
    //langKnown = $("input:radio[name=language]:checked");
    
    
//    for(var i = 0; i < langs.length; i++){
//        (personalDetailsObj.language).push(langs[i]);
//    }
    
    // communication
    personalDetailsObj.communication = {};
    personalDetailsObj.communication.lanlineNo = $("#lanlineNo").val();
    personalDetailsObj.communication.mobileNo = $("#mobileNo").val();
    personalDetailsObj.communication.altmobileNo = $("#altmobileNo").val();
    
    // Address Details
    personalDetailsObj.address = {};
    personalDetailsObj.address.personalAddress = {};
    personalDetailsObj.address.officialAddress = {};
     for(var i = 0; i < ulChildOfficial.length; i++){
        var officialArray = $(ulChildOfficial[i]).children();
        var personalArray = $(ulChildPersonal[i]).children();

        console.log($(officialArray[0]).val());   // this object has elements at index 0
        var  idElementOfficial = $($(officialArray[0]).parent()).attr("id");
        console.log("ID to assign to JSON");
        console.log(idElementOfficial);
        personalDetailsObj.address.officialAddress[idElementOfficial] = $(officialArray[0]).val() ;
        console.log(personalDetailsObj.address.officialAddress[idElementOfficial]);
        
        var idElementPersonal = $($(personalArray[0]).parent()).attr("id");
        personalDetailsObj.address.personalAddress[idElementPersonal] = $(personalArray[0]).val();
        console.log("PERSONAL");
        console.log(personalDetailsObj.address.personalAddress[idElementPersonal]);
    }    
}

//$("#highestQualification").change(function(){
//    var a = $("#highestQualification").val();
//    var options = $("#highestQualification").options;
//    console.log("OTIONS");
//    console.log(options);
//});

document.querySelector("#highestQualification").addEventListener('change',function(){
    var a = $("#highestQualification").val();
    if(a == -1){
        console.log("Select highest Qualification");
        $('#highestQualification').addClass('highlightClass');
       
        highestEducationFlagBit = false;
        //$("#stream").val($("#stream").val("-1"));  // what shd I do to show "Select Stream"
        $("#stream").selectedIndex = 0;
        
        // Emptying the values and disabling them
        console.log("STREAM"); 
        //console.log($("#stream").val("-1"));
        $("#specification").val("");
        $("#institutionName").val("");
        $("#university").val("");   
        $("#specification").attr("disabled","disabled");
        $("#stream").attr("disabled","disabled");
        $("#institutionName").attr("disabled","disabled");
        $("#university").attr("disabled","disabled");
    }
    else{
        $("#specification").removeAttr("disabled");
        $("#stream").removeAttr("disabled");
        $("#institutionName").removeAttr("disabled");
        $("#university").removeAttr("disabled");        
    }
});

function educationalDetailsReading(){
    educationalDetailsObj.highestQualification = $("#highestQualification").val();
    educationalDetailsObj.stream = $("#stream").val();
    educationalDetailsObj.specification = $("#specification").val();
    educationalDetailsObj.institutionName = $("#institutionName").val();
    educationalDetailsObj.university = $("#university").val();    
}