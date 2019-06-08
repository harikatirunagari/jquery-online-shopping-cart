/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//redirectHomePage.redirectingHomePage();

if(sessionStorage.getItem("userName")){
   $("#userName").text(sessionStorage.getItem("userName")); 
}


categoryUrl = '../JSONFiles/category.json';
productsDataUrl = "../JSONFiles/productData.json";
productsUrl = "../JSONFiles/products.json";
var categoriesResponse = {};

var categoriesDetailsReqPromise = $.ajax({
    url : categoryUrl,
    dataType : "JSON",
    type : "GET"        
}); 

var loadProductDetailsReqPromise = $.ajax({
    url : productsDataUrl,
    dataType : "JSON",
    type : "GET"        
}); 

var productsReq =   $.ajax({
    url : productsUrl,
    type : "GET",
    dataType : "JSON"        
});

var idofAddr = [];

$(".loadingBlock").show();
$("#maskBlock").show(); 

$(document).ready(function(){
   
    $.when(categoriesDetailsReqPromise, loadProductDetailsReqPromise).done(function(categoriesDetailsRes,loadProductDetailsRes){
        console.log("Succeeded for categories"); 
        $("#maskBlock").hide();
        $(".loadingBlock").hide();
        //console.log(categoriesDetailsRes[0]);
        console.log("Success in loading product Details");
        //console.log(loadProductDetailsRes[0]);
        //categoryAnimationEffect(categoriesDetailsRes[0]);
        showCategories(categoriesDetailsRes[0]);
        showProducts(loadProductDetailsRes[0].productDetails);
        
    });
    
    $.when(categoriesDetailsReqPromise, loadProductDetailsReqPromise).fail(function(categoriesDetailsErr,loadProductDetailsErr){
        //console.log(categoriesDetailsErr[0]);
        //console.log(loadProductDetailsErr[0]);        
        console.log("Error in first load of the page");
    });   
    
})

function showCategories(categories){
    console.log("showCategories");
    //console.log(categories);
    categoriesResponse = categories;  // not used anywhere
    for(var i in categories){ 
        categories["category"] = i;
        //console.log(i);
        $(".categoriesList").loadTemplate($("#categoryTemplate"),categories,{append : true});
    }
   
}

function showProducts(pDetails){   
    
    for(var i in pDetails){
       //console.log(i);
       
       pDetails[i].productName = i;
       pDetails[i].disableId = "d" + pDetails[i]["productID"];
       //console.log(pDetails["productName"]);     
       $(".allProducts").loadTemplate($("#productTemplate"),pDetails[i],{append : true});
       
       disableAddToCart(pDetails[i].disableId,"notCart");

    }
}

var productToCartProductId = []; // stores product name and product id as an object



function showCompleteProductDetails(event){
    //console.log("showCompleteProductDetails");
    document.querySelector("#detailedProducts").innerHTML = "";
    var b = $("#showCompleteProducts").children();
    //console.log("b");
    //console.log(b);
    var a =  $(event.target).parent().parent().parent().prevUntil(".ImageContainer"); 
   // alert("SHOW COMPLETE");
    //alert("a");
    console.log(a);
    //console.log(a);
    //var mainImage = $(a[a.length-1]).prev();
    var producttags = $(a[a.length-1]).children();  // this is assigning data statically as a[2] u need to change it        
    var productName = $(producttags[producttags.length - 1]).text();
    
   // alert("producttags");
    console.log(producttags);
    //alert("productName");
    console.log(productName);
    
    //console.log(producttags);
    console.log(producttags[producttags.length - 1]);
    console.log("PRODUCT NAME " + productName );
    
    //console.log(mainImage);
    var mainImgSrc;
//    mainImgSrc = $($($(mainImage[0]).children()).children()).attr("src"); 
//    console.log("Main Image Src " + mainImgSrc);
    $('#maskBlock').show();
    $.when(productsReq,loadProductDetailsReqPromise).done(function(productsRes,loadProductDetailsResPromise){
        //showCompleteProductsInfo(response.productDetails[productName]);           
        console.log("Success in communication");
        showCompleteProductsInfo(loadProductDetailsResPromise[0].productDetails[productName]);
        showProductImages(productsRes[0]);
        
        $('#mainImage').attr("src",mainImgSrc);        
        $('.productDetailsDivContent').show();
    });
    
    $.when(productsReq,loadProductDetailsReqPromise).fail(function(productsErr,loadProductDetailsErrPromise){
        console.log("Error in communication in Details Block click event");
        console.log(productsErr[0]);
        console.log(loadProductDetailsErrPromise[0]);        
    });
    
    function showCompleteProductsInfo(pDetail){  /*Loads the productData into the template*/
        console.log("pDetail");
        console.log(pDetail);            
        mainImgSrc = pDetail["productImg"];
        pDetail.recogId = "productN";
        pDetail.price = "price";
        //pDetail.removeID = "a" + (pDetail["productID"]).toString();
        $("#showCompleteProducts span").loadTemplate($("#productsInfo"),pDetail,{append : false}); 
        
        disableAddToCart(pDetail["productID"]);   
        
        /* Disables the 'Add To Cart' button if product is already added to selectedProductDetails
         *  and verifies it by checking the productToCartProductId because selectedProductDetails contain 
         * entire list of products with all details but productToCartProductId contains only {productName:productId} as object
         * Is it approach ?? */

    }
    
    
    function showProductImages(productImages){  // Accessing products.json
        $("#reviewBlock").html("");  // emptying reviewBlock
        
        var halfStarIm = "../IMAGES/half Star.jpg";
        var fullStarIm = "../IMAGES/Full Star.png";
        var noStarIm = "../IMAGES/no star.png";
        
        for(var i in productImages[productName]){ 
          console.log("PRODUCT IMAGES");
          console.log(productImages[productName].manufacturer);
          console.log(productImages[productName].reviews);
          if(i == "manufacturer"){
            console.log(productImages[productName]["manufacturer"]["manuName"]);
            console.log(productImages[productName]["manufacturer"]["sellerID"]);
            console.log(productImages[productName]["manufacturer"]["sellerContact"]);
            $("#manufacturerDetails").loadTemplate($("#manuDetails"),productImages[productName]["manufacturer"],{append : false});       
         
          }
          if(i == "reviews"){
            for(var j = 0; j < (productImages[productName]["reviews"]).length; j++){
                console.log(productImages[productName]["reviews"][j]);
                
                for(var k in productImages[productName]["reviews"][j]){
                    if(k == "rating"){
                       var rateHolder = $("<span></span>");
                       var rating1 = productImages[productName]["reviews"][j]["rating"];
                       rating1 = parseFloat(rating1);
                       var parsedRating = parseInt(rating1);                
                       var outedRating = 5 - parsedRating;
                       
                       for(var l = parsedRating; l > 0; l--){ // full Stars
                            var ImStar = $("<img></img>").addClass("starImage");
                            ImStar.attr("src",fullStarIm);
                            $(rateHolder).append($(ImStar));
                        }

                        if(rating1 - parsedRating){  // for half Star
                            var ImStar = $("<img></img>").addClass("starImage");
                            ImStar.attr("src",halfStarIm);
                            $(rateHolder).append($(ImStar));
                            outedRating = outedRating - 1;
                        }                  
                        
                        for(var l = outedRating; l > 0 ; l--){ // no stars
                            var ImStar = $("<img></img>").addClass("starImage");
                            ImStar.attr("src",noStarIm);
                            $(rateHolder).append($(ImStar));
                        }              
                       productImages[productName]["reviews"][j]["ratingStars"] = $(rateHolder).html().toString();   
                    }
                   
                }   
                    
                console.log("WITH STARS --------");
                console.log(productImages[productName]["reviews"][j]);
                $("#reviewBlock").loadTemplate($("#reviiews"),productImages[productName]["reviews"][j],{append : true});
                
                
            }
          }
          else if(i == "Images"){
              for(var j = 0; j < productImages[productName]["Images"].length; j++){
                $("#detailedProducts").loadTemplate($("#ProductsDialogBox"),productImages[productName]["Images"][j] ,{append : true});  
              }
              
          }
         
          
        } 
    }
    
}


function changeProductImage(event){
    var mainImgSrc = document.querySelector("#mainImage");
    var targetSrc = event.target.src;
    event.target.src = mainImgSrc.getAttribute("src");
    mainImgSrc.setAttribute("src",targetSrc);    
}

/* Get Products list  in the category and appends these products to allProducts with productTemplate */
function getCategoryProducts(event){   
    document.querySelector(".allProducts").innerHTML = ""; 

    var selectedCategory = event.target.innerHTML;
    $(".categoriesList  li").removeClass('selectedCategory1');
    $(event.target).addClass('selectedCategory1');
    console.log("SELECTED CATEGORY");
    console.log(selectedCategory);
    
    $.when(categoriesDetailsReqPromise, loadProductDetailsReqPromise).done(function(categoriesDetailsRes,loadProductDetailsRes){
        console.log("Succeeded for categories");
        
        console.log(categoriesDetailsRes[0]);
        console.log("Success in loading product Details");
        console.log(loadProductDetailsRes[0]);
        
        var productsInCategory = getProductsInCategory(categoriesDetailsRes[0]);
        showProducts1(loadProductDetailsRes[0].productDetails, productsInCategory);
        
    });
    
    $.when(categoriesDetailsReqPromise, loadProductDetailsReqPromise).fail(function(categoriesDetailsErr,loadProductDetailsErr){
        console.log(categoriesDetailsErr[0]);
        console.log(loadProductDetailsErr[0]);        
        console.log("Error in Selection of CATEGORY");
    });   
    
    // Using the keys in productsInCategory extracts the data from pDetails
    function showProducts1(pDetails,productsInCategory){
        if(productsInCategory){
        console.log("SELECTED PRODUCTS");
        for(var i = 0; i < productsInCategory.length; i++){
            pDetails[productsInCategory[i]]["productName"] = productsInCategory[i];  // assigning key as productName like "Juicers"  
           
            
            console.log(pDetails[productsInCategory[i]]);
            //alert("showProducts1");
            console.log(pDetails[productsInCategory[i]]["productName"]); // making productName as key {productName : Electronics}
            
            $(".allProducts").loadTemplate($("#productTemplate"),pDetails[productsInCategory[i]],{append : true});
            disableAddToCart(pDetails[productsInCategory[i]]["disableId"],"notCart");
        }
     }
    }
    function getProductsInCategory(category){
        return category[selectedCategory]; // returning products in the category as array
    }
    
}

function closeDialogBox(block){ 
    $(".noProductsBlock").hide();
    $(block).hide();    
   $("#maskBlock").hide();
   $(".productAddedBlock").hide();
}

var productToCartProducts = [];  // not used

var selectedProductDetails = [];

function addToCart(event,func="frmDetails"){
    /* Intializing the productToCartProductId */
    
    
    $("#productAdd").show();
    setTimeout(function(){
        $("#productAdd").hide();
    },2000);
    
    var product;
    if(func == "frmDetails"){
        $(event.target).val("Added to Cart");
        idofAddr.push($(event.target).attr("id")) ; // no use of this stmt
        $(event.target).attr("disabled","disabled");
        $("#d"+event.target.id).html("AddedtoCart");
        $("#d"+event.target.id).addClass("addCart");
        console.log("AAA TO CART -------");
        var a = $($(event.target).prevUntil("#productN")).children();
        console.log(a);
    
        var b = $($(a)[0]).children();
        console.log($($(a)[0]).children());
    
        var c = $($(b)[0]).find("#productN").text();
        console.log(c);
    
        product = c; 
    }
    else if(func == "outCart"){ 
        $(event.target).val("AddedtoCart");
        //$(event.target).css({"background":"#778899","cursor":"not-allowed","pointer-events":"none"});
        $(event.target).attr("disabled","disabled");
        $(event.target).addClass("addCart");
        //$(event.target).parent().addClass("eventPointer");
        var a =  $(event.target).parent().parent().parent().prevUntil(".ImageContainer");
        var producttags = $(a[a.length-1]).children();  // this is assigning data statically as a[2] u need to change it
        product = $(producttags[producttags.length - 1]).text();     
        
        
    }
        
    
     // productName :- "Juicers" etc 
    
//    var a = $($(event.target).next()).children();
//    console.log("a");
//    console.log(a);
//    var c = $(a[0]).children();
//    var d = $(c[0]).find("#productN");
    
    //console.log(d);
    
    //var product = $(d).text();
    //console.log($(d).text());
    
    /*console.log(typeof($("#price").text()));
    var p = $("#price").text();
    var p = (p.slice(0,p.length-1));
    p = parseFloat(p);
    console.log(p + " " + typeof(p));*/
    
    //productToCartProducts.push(product);
    //console.log(productToCartProducts);
    
    var product1 = {};  // product is productName here
    loadProductDetailsReqPromise.then(function(response){
        console.log(response.productDetails[product]["productID"]);
        product1[product]=  response.productDetails[product]["productID"];
        product1["quantity"] = 1;
        
        var p = response.productDetails[product]["productPrice"];
        p = p.slice(0,p.length-1);
        p = parseFloat(p);
        
        product1["singleProductPrice"] = product1["quantity"] * p;
        product1["deliveryCharges"] = 20;
       
        
        productToCartProductId.push(product1);
        //console.log(typeof(response.productDetails[product]));
        
        console.log("ADDEED TO CART ----------");
        console.log(productToCartProductId);
        //displayCartDetails(response.product);
        
        sessionStorage.setItem("productToCart",JSON.stringify(productToCartProductId));
        //alert(sessionStorage.getItem("productToCart"));
    },function(error){
       console.log("Error in getting cart Details");
       console.log(error);
    });
    
}

             
//selectedProductDetails.totalCost = 0;
var productCost = 0;

function showCart(){
    /* Gets Recent product Data to pick products fro it */ 
    $('.productDetailsDivContent').hide();
    totalCost = 0;
    //disableAddToCart();
    loadProductDetailsReqPromise.then(function(response){
        console.log("Success in communication");
        pickData(response.productDetails);  /* picks the selected products from all the products and assign it to selectedProductDetails 
                                            *  using productToCartProductId */
        console.log("SELECTED PRODUCTS");
        
        displaySelectedProducts();
        
        
    },function(error){
        console.log(error);
        console.log("Error in displaying Cart Details");
    });
    
    function pickData(pDetails){
        /* picks the selected products from all the products and assign it to selectedProductDetails 
 *                                                      using productToCartProductId */

        if(sessionStorage.getItem("productToCart")){
            console.log("---------------------------------- Session Storage -----------------");
            console.log(JSON.parse(sessionStorage.getItem("productToCart")));
            productToCartProductId = JSON.parse(sessionStorage.getItem("productToCart"));
        }
        console.log("picking data");
        console.log(pDetails);
        selectedProductDetails.length = 0;
        for(var i in pDetails){
            
            for(var j = 0; j < productToCartProductId.length; j++){
                console.log("inside pDetails");                
                for(var k in productToCartProductId[j]){
                    //console.log(typeof(pDetails[i]["productID"])); 
                    //console.log(typeof(productToCartProductId[j][k])); 
                    
                    // (k == i) :- searching productName like :- "Juicers"
                    
                    if((k == i) && (productToCartProductId[j][k] == pDetails[i]["productID"])){
                       console.log(k);
                       console.log(i);
                       console.log(pDetails[i]["productID"]); 
                       pDetails[i]["selectedQuantity"] = productToCartProductId[j]["quantity"];
                       pDetails[i]["priceWithQuant"] = pDetails[i]["selectedQuantity"] * productToCartProductId[j]["singleProductPrice"];            
                       pDetails[i]["deliveryCharges"] = productToCartProductId[j]["deliveryCharges"];
                       // assigning ids for 'selectedQuantity' and 'priceWithQuant'
                       pDetails[i]["selectQ"] = "selectQ";
                       pDetails[i]["priceQty"] = "priceQty";
                       
                       selectedProductDetails.push(pDetails[i]); 
                       break;
                    }
                }
            }
        }
        
        
        
    }
    
    /* Empty the Cart. Take the products from selectedProductDetails and display them. Calculate the total Cost*/
    function displaySelectedProducts(){
        console.log("SELECTED PRODUCTS LIST");
        console.log(selectedProductDetails);
        if(!selectedProductDetails.length){
            
            //$(".cart").append($(".noProductsBlock"));
            $(".noProductsBlock").show();
            $("#maskBlock").show();
            $(".cart").show();
            return;
        }
       
        $(".noProductsBlock").hide();
        
        $("#cartDetails").html("");
        //document.querySelector("#cartDetails").innerHTML = "";
        console.log("INNER HTML od Cart Details");
        console.log(document.querySelector("#cartDetails").innerHTML);
        for(var i = 0; i < selectedProductDetails.length; i++){
            console.log("------- PRODUCT DETAILS ------");
            console.log(selectedProductDetails[i]);
//            var p = selectedProductDetails[i]["productPrice"];
//            p = p.slice(0,p.length-1);
//            p = parseFloat(p);
            selectedProductDetails[i].removeID = "a" + selectedProductDetails[i]["productID"];
            //productCost = productCost + p;
            $("#cartDetails").loadTemplate($("#productMiniInfo"),selectedProductDetails[i],{append : true});          
           
        }
//        var rate = $("<div></div>").attr("id","rate");
//        $("#cartDetails").append($(rate).html(productCost));
        $("#maskBlock").show();
        $(".cart").show();
        console.log("\nSPECIAL  BLOCK\n\n --------------.")
        console.log(selectedProductDetails);
        console.log(productToCartProductId);
        console.log("END -------------------");
        totalCharges();
    }
}

/* Deletes the product from selectedProductDetails , deletes from productToCartProductID . Subtracts the total Cost*/
function removeProduct(event){
    var proID = $(event.target).attr("id");
    /*var a = proID.slice(1,proID.length);
    proID = parseInt(a);*/
    
    /* proID will be in the form "a1001" i.e. 'a' is appended to productID just to differentiate the id given to
     * Add To Cart and Remove. Add To Cart has id as the productID */
    $("#productRemove").show();
    setTimeout(function(){
       $("#productRemove").hide();
    },2000);
    
    var forproductToCartProductId = proID.slice(1,proID.length);
    $("#d"+forproductToCartProductId).html("Add to Cart");
    $("#d"+forproductToCartProductId).removeClass("addCart");
    $("#d"+forproductToCartProductId).removeAttr("disabled");
    forproductToCartProductId = parseInt(forproductToCartProductId);
    for(var i = 0; i < selectedProductDetails.length; i++){
        console.log("i " + i);
        alert("proID " + proID );
        console.log("proID " + proID );
        console.log("selectedProductDetails[i]['removeID'] " + selectedProductDetails[i]["removeID"]); 
        console.log();
        console.log("typeof(proID) " + typeof(proID));
        console.log(typeof(selectedProductDetails[i]["removeID"]));
        console.log();
        if((proID === selectedProductDetails[i]["removeID"]) ) {
            console.log("inside");
//            var p = selectedProductDetails[i]["productPrice"];
//            p = p.slice(0,p.length-1);
//            p = parseFloat(p);
//            productCost = productCost - p;

            selectedProductDetails.splice(i,1); 
            //$(proID).val('Add To Cart');
            break;
        }
    }
    
    
    for(var i = 0; i < productToCartProductId.length; i++){
        var pfound = false;
        for(var j in productToCartProductId[i]){
                console.log("removing productToCartId");
                console.log(productToCartProductId[i][j]);
                console.log(forproductToCartProductId);
                console.log("BREAK");
                if(forproductToCartProductId === productToCartProductId[i][j]){
                    productToCartProductId.splice(i,1);
                    console.log("done deletion -----");
                    pfound = true;
                    break;
                }
            }
            if(pfound == true)
                break;
    }
    
    //$("#rate").append($("<div></div>").html("Single ProductCost " + productCost));
    //$($($($($(event.target).parent()).parent()).parent())).parent().remove();
    $($(event.target).parent().parent().parent()).remove();
    console.log("after removing elements");
    //console.log($($($($(event.target).parent()).parent()).parent()).parent());
   // console.log($($(event.target).parent().parent().parent())).remove());
    
    sessionStorage.setItem("productToCart",JSON.stringify(productToCartProductId));
    
    console.log(selectedProductDetails);
    console.log(productToCartProductId);
    totalCharges();
}

/* disableAddToCart checks whether productID is in productToCartProductId  and if there disables the 'Add To Cart' */
function disableAddToCart(pid,func="frmCart"){
    //alert("in disable Cart");
    if(sessionStorage.getItem("productToCart")){
        productToCartProductId = JSON.parse(sessionStorage.getItem("productToCart"));
    }
    console.log(productToCartProductId.length);
     console.log("ADDED PPRODUCTS IN TO CART------"); 
     console.log("productToCartProductId");
     console.log(productToCartProductId);   
     console.log(productToCartProductId.length);
     var disabledIdfrompid;
     if(func != "frmCart"){
         disabledIdfrompid = pid.substr(1,pid.length-1);
        // alert(disabledIdfrompid);
     }
        if(productToCartProductId.length){
            console.log("inside");
            for(var i = 0; i < productToCartProductId.length; i++){
                console.log("inside 1");
                console.log(productToCartProductId[i]);
                for(var j in productToCartProductId[i]){
                    if(func == "frmCart"){
                         if(pid == productToCartProductId[i][j]){
                            console.log("inside 2");
                            console.log(productToCartProductId[i][j]);
                            pid = "#"+(pid).toString();                        
                        
                            $(pid).attr("disabled","disabled");                            
                            //alert("frmCart");
                            $(pid).val("Added to Cart"); 
                            $(pid).attr("disabled","disabled");
                            $(pid).addClass("addCart");   
                        
                            break;
                        }                      
                    }else {
                        //disableId
                        if(disabledIdfrompid == productToCartProductId[i][j]){
                            
                            //alert(productToCartProductId[i][j]);
                            pid = "#"+(pid).toString(); 
                            //alert("saying added To Cart");
                            $(pid).val("AddedToCart");
                            $(pid).attr("disabled","disabled");
                            $(pid).addClass("addCart");  
                            
                        }
                    }
                   
                   
                }               
            }
        }
        
}
var totalCost = 0;

function selectQuantity(event,id,pcs,priceQ){
    var QuantityCost = 0;
    console.log("selected Quantity ----");
    console.log($(event.target).val());
    var quants = $(event.target).val();
    var product;
    console.log(id);
    
    console.log("SELECT QUantity");
    //console.log($(event.target).parent().nextUntil());
    var quantId = $(event.target).parent().next().find("*");
    
    var priceIdQ = $(event.target).parent().parent().next().find("*");
    
    console.log(quantId);
    //console.log(priceIdQ);
    
    //$(priceIdQ[0]).html("");
    //alert($(priceIdQ).html());
    $(quantId[quantId.length-1]).html(quants +"pcs.");
    
    for(var i = 0; i < selectedProductDetails.length; i++){
        //QuantityCost = 0;
        console.log(typeof(selectedProductDetails[i]["removeID"]));
        console.log();
        if((id === selectedProductDetails[i]["removeID"]) ) {
            console.log("inside");
            
            product = selectedProductDetails[i]["productName"];
            selectedProductDetails[i]["selectedQuantity"] = parseInt(quants);            
            var p = selectedProductDetails[i]["productPrice"];
            p = p.slice(0,p.length-1);
            p = parseFloat(p);
            selectedProductDetails[i]["priceWithQuant"] = parseInt(quants) * p;
            //alert("up");
            //alert($(priceIdQ[priceIdQ.length-1]).html());
            $(priceIdQ[priceIdQ.length-1]).html(quants * p + "$");
            //alert($(priceIdQ).html(quants * p + "$"));
            //totalCost = totalCost  + quants * p ;
            
            //$("#rate").append($("<div></div>").html("Quantity Cost " + QuantityCost)); 
            break;
        }
    }
    var pfound = false;
    id = id.slice(1,id.length); 
    for(var i = 0; i < productToCartProductId.length; i++){
        for(var j in productToCartProductId[i]){            
            if(productToCartProductId[i][j] == id){
                productToCartProductId[i]["quantity"] = parseInt(quants);                
                pfound = true;
                break;
            }            
        }
        if(pfound == true)
            break;
    }
    
    console.log("In Selected Quantity");
    console.log(selectedProductDetails);
    console.log(productToCartProductId);
   
    sessionStorage.setItem("productToCart",JSON.stringify(productToCartProductId));
   // alert(sessionStorage.getItem("productToCart"));
    totalCharges();
    
    
    //$("#rate").append($("<div>/div>").html("Total Cost " + totalCost));
}


function totalCharges(){
    var totalPrice = 0;
    var totalDelivery = 0;
    //$("#cartBlock").html("");
    for(var i = 0; i < productToCartProductId.length; i++){
        var a = (productToCartProductId[i]["quantity"]) * (productToCartProductId[i]["singleProductPrice"]);
        totalPrice += a;
        totalDelivery += productToCartProductId[i]["deliveryCharges"];        
    }
    console.log("TOTAL PRICE")
    console.log(totalPrice);
    
    $("#totalPrice").html(totalPrice);
    $("#totalDeliveryCharges").html(totalDelivery);
    $("#overallCharges").html(totalPrice + totalDelivery);
    //$("#cartBlock").html("Total Price " + totalPrice + "<br/>" + "Total Delivery Charges " +  totalDelivery + "<br/>" + "Total Price +  Total Delivery Charges " + (totalPrice + totalDelivery));
    $("#priceBlock").html(totalPrice + totalDelivery + "$");
    //$("#cartBlock").html("Total Price " + totalPrice);
}

function logOut(){
    sessionStorage.clear();
    window.location.replace("homePage.html");
}

function goBack(){
    $(".noProductsBlock").hide();
    $(".cart").hide();
    $("#maskBlock").hide();
}

/*Image hovering Effect*/
$("#mainImage").on(
        {
            mouseover : function(){                
                var imageElement = $("<img></img>").attr("src",$("#mainImage").attr("src")).addClass("zommingImage");
                $(".productDetailsDivContent").append($(imageElement));
            },
            
            mouseout : function(){
                $(".zommingImage").hide();
            }
      }
);