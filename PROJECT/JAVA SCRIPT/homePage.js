/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function(){
    console.log("In module");
    
    function header_Block(){
        
        var headingBlock =  document.querySelector("#title"); 
                
        var heading = document.createElement("div");
        heading.innerHTML = "ABC ONLINE SHOPPING";
        heading.setAttribute("class","mainTitle");  
        
        var logo = document.createElement("img");
        logo.setAttribute("src","../IMAGES/Shopping Logo.png");
        logo.setAttribute("class","logoImage");    
        logo.setAttribute("alt","no image");
        
        // Logo linking Home Page
        var anchorHome = document.createElement("span");
        anchorHome.setAttribute("id","atag");
        //anchorHome.setAttribute("href","../HTML/homePage.html");
        
        headingBlock.appendChild(heading);
        anchorHome.appendChild(logo);
        headingBlock.appendChild(anchorHome);
        
        var dateObj = document.createElement("span");
        dateObj.setAttribute("id","todayDate");    
        headingBlock.appendChild(dateObj);     
                 
        var monthsArray = ['Jan','Feb','March','Apr','May','June','July','August','Sep','Oct','Nov','Dec'];
            
        var a = new Date();
        dateObj.innerHTML = monthsArray[a.getMonth()] + "/" + checkIfUnitDigit(a.getDate()) + "/" + a.getFullYear();
        //console.log(a); 
        
        
        
    }  
    
    function footer_Block(){
        var timeObj = document.createElement("div");
        timeObj.setAttribute("id","timeObj");
        
        (function(){
            setInterval(function(){
              var a = new Date(); 
              timeObj.innerHTML = checkIfUnitDigit(a.getHours()) + " hrs : " 
                      +  checkIfUnitDigit(a.getMinutes()) + " mins : " 
                      + checkIfUnitDigit(a.getSeconds()) + " secs";              
            },1000);
        })();
        
        
        var footer = document.getElementById("bottomContainer");    
        footer.innerHTML = "copyright &copy 2017";
        footer.appendChild(timeObj);
    }
    
    header_Block();
    footer_Block();
    
    
    // converting 5 as 05
    function checkIfUnitDigit(n){      
        if(parseInt(n/10)){
          return n;
        }            
        else{
          return "0"+n.toString(); 
        }
    }
    
})();

function changePage(gotoPage){
    console.log("in change Page");    
    window.location.assign(gotoPage);    
    console.log("out change Page");
}

document.querySelector("#atag").addEventListener("click",function(){
    
    console.log(window.location.pathname);
    var a = window.location.pathname;
    if(a == '/Shopping%20Application/PROJECT/HTML/ForgotPassword.html' || a ==  '/Shopping%20Application/PROJECT/HTML/Register.html'){
        window.location.assign('homePage.html');
    }else{
        window.location.reload();
    }    
});

