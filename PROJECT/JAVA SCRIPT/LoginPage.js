/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var userType = "normalUser"; /* Checking whether login is Normal User or Admin User */

document.querySelector("#normalUser").checked = 'checked';
document.querySelector("#adminUser").removeAttribute("checked");
document.querySelector("#uname").value = "";

var UsersArray = [];
//localStorage.clear();
if(localStorage.getItem("ListOfUsers")){
    UsersArray = JSON.parse(localStorage.getItem("ListOfUsers"));
    console.log("User Array in localStorage");
    console.log(UsersArray);
}

var presentNormalUser;
/*Checking UserName and Password of Normal User*/
function checkNormalUser(dataid,data,func){
   if(dataid == "uname"){
       for(var i=0; i < UsersArray.length; i++){
           for(var j in UsersArray[i]){
               if(j == "uname"){
                   if(UsersArray[i]["uname"] == data){
                      document.querySelector(".userName").style.visibility = "hidden";
                      document.querySelector("#loginBtn").disabled = false;
                      presentNormalUser = UsersArray[i];
                      return true;
                   }                   
                   break;
               }               
           }           
       }
       
       if(!presentNormalUser){
           document.querySelector(".userName").innerHTML = "Invalid UserName !";  
           document.querySelector(".userName").style.visibility = "visible";
           document.querySelector("#loginBtn").disabled = true;
           return false;
       }
   }
   else if(dataid == "upwd" && func == "frmlogin"){
      for(var i in presentNormalUser){
          if(i == "upwd"){
              if(data == presentNormalUser["upwd"]){
                  document.querySelector(".loginFailed").style.visibility = "hidden";
                  document.querySelector("#loginBtn").disabled = false;
                  return true;
              }
              else{
                document.querySelector(".loginFailed").innerHTML = "Login Failed !!!";
                document.querySelector(".loginFailed").style.visibility = "visible";
                return false;
              }
          }
      } 
   }
}

function loginForm(uname,upwd){
   
   var userName = document.querySelector("#"+uname).value;
   //$(event.target).css("border","none");
   console.log("in login ");
   console.log(uname);
   
      if(checkUserName(uname)){
        if(checkUserName(upwd,'frmlogin')){
               sessionStorage.setItem("userName",userName);       
               //window.location.replace("ProductsInfo.html"); 
               if(userType == "normalUser"){
                   window.location.replace("ProductsInfo.html"); 
               }else if(userType == "adminUser"){
                   window.location.replace("AdminUserPage.html");
               }
                        
               
            }
        }   
   
}

function checkUserName(dataid,func='nowhere'){
    console.log(dataid);
    var data =  document.querySelector("#"+dataid).value;
    data = data.trim();
    
    if(data == ""){
        if(dataid == "uname"){
            document.querySelector(".userName").innerHTML = "Enter UserName !";  
            document.querySelector(".userName").style.visibility = "visible";
        }else if(dataid == "upwd"){
            document.querySelector(".loginFailed").innerHTML = "Enter Password !!!";
            document.querySelector(".loginFailed").style.visibility = "visible";
        }
         
      document.querySelector("#loginBtn").disabled = true;
      return false;
    }
    
    document.querySelector(".userName").style.visibility = "hidden";
    document.querySelector(".loginFailed").style.visibility = "hidden";
    
    if(dataid == "upwd" && data != "" && func == 'nowhere'){
        document.querySelector("#loginBtn").disabled = false;
    }
    
    if(userType == "adminUser"){
        if(dataid == "uname"){ 
            if(data != 'Shasank'){
                document.querySelector(".userName").innerHTML = "Invalid UserName !";  
                document.querySelector(".userName").style.visibility = "visible";
                document.querySelector("#loginBtn").disabled = true;
                return false;
            }
            
            document.querySelector(".userName").style.visibility = "hidden";
            document.querySelector("#loginBtn").disabled = false;
            return true;        
        }
        
        else if(dataid == "upwd" && func == 'frmlogin'){
            
            if(data !== 'uday'){
                document.querySelector(".loginFailed").innerHTML = "Login Failed !!!";
                document.querySelector(".loginFailed").style.visibility = "visible";
                
                return false;
            }
            document.querySelector(".loginFailed").style.visibility = "hidden";
            document.querySelector("#loginBtn").disabled = false;
            return true;
        }   
    }
    else if(userType == "normalUser"){
        if(checkNormalUser(dataid,data,func)){
            return true;
        };
    }    
}


function changeUser(val){
   document.querySelector(".alertMsg").style.visibility = "hidden";
   document.querySelector(".userName").style.visibility = "hidden";
   document.querySelector(".loginFailed").style.visibility = "hidden";
   document.querySelector("#loginBtn").disabled = false;
   document.querySelector("#uname").value = "";
   document.querySelector("#upwd").value = "";
   
   if(val == "adminUser"){
        document.querySelector("#loginTitle").innerHTML = "Admin Login";
        userType = "adminUser";
      
   }else if(val == "normalUser"){
       document.querySelector("#loginTitle").innerHTML = "User Login";
       userType = "normalUser";
   }
}

function checkPassword(upwd,event){
    var upwd = document.querySelector("#"+upwd).value;
    
    if(!upwd.length || (upwd.length == 1 && event.keyCode == 8)){
        document.querySelector(".loginFailed").innerHTML = "Enter Password !!!";
        document.querySelector(".loginFailed").style.visibility = "visible";
        document.querySelector("#loginBtn").disabled = true;
        
    }else{
        document.querySelector(".loginFailed").style.visibility = "hidden";
        document.querySelector("#loginBtn").disabled = false;
    }
}