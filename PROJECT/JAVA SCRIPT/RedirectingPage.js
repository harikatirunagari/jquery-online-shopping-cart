/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var redirectHomePage = (function(){
    return{
        redirectingHomePage : function(){
            if(!sessionStorage.getItem('userName')){
                window.location.replace('homePage.html');
            }
        }
    }
    
})();
