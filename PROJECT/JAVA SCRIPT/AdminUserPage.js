/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



var UsersArray = [];
//localStorage.clear();
if(localStorage.getItem("ListOfUsers")){
    UsersArray = JSON.parse(localStorage.getItem("ListOfUsers"));
    console.log("User Array in localStorage");
    console.log(UsersArray);
}

function addUser(){
    var uname = document.querySelector("#username").value;
    var upwd = document.querySelector("#passwrd").value;
    var age = document.querySelector("#age").value;
    
    if(uname == "" || upwd == "" || age == ""){
        alert("Enter Details");
        return false;
    }
    
    var userExists = false;
    console.log("UsersArray length " + UsersArray.length);
    if(UsersArray.length){
        for(var i = 0; i < UsersArray.length; i++){
            console.log("" + UsersArray[i].uname);
            if(UsersArray[i]["uname"] == uname){
                userExists = true;
                break;
            }
        }
    }
    
    if(!userExists){
        var user = {};
        user.uname = uname;
        user.upwd = upwd;
        user.age = age;
    
        UsersArray.push(user);
        console.log("User Successfully Created");
        console.log(UsersArray);
    }
    else{
        console.log("User Already Exists");
    }   
    
    localStorage.setItem("ListOfUsers",JSON.stringify(UsersArray));
}

function listUsers(){
    if(localStorage.getItem("ListOfUsers")){
       console.log(JSON.parse(localStorage.getItem("ListOfUsers")));      
    }
    else{
        console.log("No Users Found");
    }
}

function logOut(){
    sessionStorage.clear();
    window.location.replace("homePage.html");
}

function showPage(block,block1){
    /*document.querySelector("."+block1).style.display = "none";
    document.querySelector("." + block).style.display = "block";*/
    
    /*Alternative if More Blocks are there*/
    var a = document.getElementsByClassName("data");
    console.log(a);
    for(var i=0; i<a.length; i++){
        a[i].style.display = "none";
    }
    document.querySelector("."+block).style.display = "block";
    
}