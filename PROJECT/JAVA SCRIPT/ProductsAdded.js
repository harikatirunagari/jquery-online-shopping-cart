/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var categoriesList1 = [];

var count = 0;

if(localStorage.getItem("count")){
    count = localStorage.getItem("count");
    count = parseInt(count);
}
(function(categoriesList1){
    var categoryUrl = "../JSONFiles/category.json"; 
    var categoriesAndProducts = $.ajax({
        url : categoryUrl,
        type : "JSON",
        method : "GET" 
    });
    
    categoriesAndProducts.done(function(response){
        alert("success");
        console.log(response);
        for(var i in response){
            categoriesList1.push(i);
        }
        driveOptions();
    });
    
    function driveOptions(){
        document.querySelector("#categoriesDropdown").options.length = categoriesList1.length;
        var a = document.querySelector("#categoriesDropdown").options;
        for(var i=0; i < a.length ; i++){
            a[i].innerText = categoriesList1[i];
            console.log(a[i].innerText);
            alert("");
        }
    }
    
})(categoriesList1);


function addProduct(){   
    
    
   var  product = document.querySelector("#product").value;
   var manufacturer1 = document.querySelector("#manufacturer").value;
   var a = document.querySelector("#categoriesDropdown");
   var categoryName = a.options[a.selectedIndex].innerText;
   
    var productImg = document.querySelector("#productImg").value;
    var description = document.querySelector("#description").value;
    var productPrice = document.querySelector("#productPrice").value;
    
    var Image1 = document.querySelector("#Image1").value;
    var Image2 = document.querySelector("#Image2").value;
    var Image3 = document.querySelector("#Image3").value;
    
    var manuName = document.querySelector("#manuName").value;
    var sellerID = document.querySelector("#sellerID").value;    
    var sellerContact = document.querySelector("#sellerContact").value;
    
    var productID = 1020 + count;
    count++;
    localStorage.setItem("count",count);
    /* for productData.json */
    var product1 = {};
    product1[product] = {
        "categoryName" : categoryName,
        "manufacturer" : manufacturer1,
        "productImg" : productImg,
        "description" : description,
        "productPrice" : productPrice,
        "productID" : productID  
    };
    
    
    var manufacturer = {};
    manufacturer.manuName = manuName;
    manufacturer.sellerID = sellerID;
    manufacturer.sellerContact = sellerContact;
    
    var Images = [
        {
            "Image1" : Image1
        },
        {
            "Image2" : Image2
        },
        {
            "Image3" : Image3
        }
    ];
    
    /* for products.json */
    var productD = {};
    productD[product] = {
        "Images" : Images,
        "manufacturer" : manufacturer
    };
    
    /* for category.json */
    var category = {};
    category[categoryName] = [];
    category[categoryName].push(product);
    var products = [];
    var detailedProducts = [];
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    products.push(product1);
    detailedProducts.push(productD);
    console.log(category);
    console.log(products);   
    console.log(detailedProducts);
                                                                                               
    localStorage.setItem("categoryItem",JSON.stringify(category));
    localStorage.setItem("productsForproducts",JSON.stringify(products));
    localStorage.setItem("detailedProducts",JSON.stringify(detailedProducts));
}    

                                                                                                                                                                                                                                                                                                            