/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var dropDownListofCountries = [
    {
        country : 'India',
        states : [
                    {
                        stateName : 'Telanagana',
                        districtList : ['Adilabad','Hyderabad','Karimnagar']
                    },
                    {
                        stateName : 'Andhra Pradesh',
                        districtList : ['Ananthapur','krishna','Guntur']
                    },
                    {
                        stateName : 'Uttar Pradesh',
                        districtList : ['Mainpuri','Mathura','Firozabad']
                    }
            ]

    },
    {
        country : 'China',
        states : [
                    {
                        stateName : 'Beijing Municipality',
                        districtList : ['Dongcheng','Xicheng','Fengtai']
                    },
                    {
                        stateName : 'Liaoning Province',
                        districtList : ['Shenyang','Dalian','Dandong']
                    },
                    {
                        stateName : 'Jilin Province',
                        districtList : ['Liaoyuan','Tonghua','Songyuan']
                    }
                ]		
    },
    {
        country : 'Spain',
        states : [
                    {
                        stateName : 'Palma',
                        districtList : ['Llotja','Convento de Santa Clara','Palau de lAlmudaina']
                    },
                    {
                        stateName : 'Barcelona',
                        districtList : ['ABS','ARD','fdf']
                    },
                    {
                        stateName : 'Burgos',
                        districtList : ['adf','dfd','fgf']
                    }
            ]

    }

];

function countryList(){
    // Default Option of Country

    var countryDropDown = document.createElement("select");
    var defaultOption1 = document.createElement("option");
    defaultOption1.innerHTML = "Select Country";
    countryDropDown.setAttribute("id","countries");
    countryDropDown.appendChild(defaultOption1);

    
    // Default Option for States

    var stateDropDown = document.createElement("select");
    stateDropDown.setAttribute("id","statesChange");
    stateDropDown.disabled = true;

    // Default Option
    var defaultOption2 = document.createElement("option");
    defaultOption2.innerHTML = "Select State"; 
    stateDropDown.appendChild(defaultOption2);

    //document.querySelector("#container").appendChild(stateDropDown);
    
    
    // Default Option of District
    var districtDropDown = document.createElement("select");
    districtDropDown.setAttribute("id","districtsChange");
    districtDropDown.disabled = true;

    var defaultOption3 = document.createElement("option");
    defaultOption3.innerHTML = "Select Province"; 
    districtDropDown.appendChild(defaultOption3);



    // Assigning countries

    function countries(){
        for(var i in dropDownListofCountries){
            var options = document.createElement("option");	
            options.innerHTML = dropDownListofCountries[i].country;
            countryDropDown.appendChild(options);
        }
        
       
      //document.querySelector("#container").appendChild(countryDropDown);
        
        console.log(document.querySelector("#countries")); // returning null Why ?
     
    }
    
    

    // Assigning States
    
    function statesD(){
        countryDropDown.addEventListener("change",function(){	

        districtDropDown.disabled = true;  // On country change still state not selected so disable district
        districtDropDown.options.length = 0;
        districtDropDown.appendChild(defaultOption3);

        stateDropDown.disabled = false;
        // Emptying DropDown
        stateDropDown.options.length = 0;
        // If above line does not work then make every option of dropdown as null before assigning new "StateName" of diff "Country"
        stateDropDown.appendChild(defaultOption2);

        var countryOptions = countryDropDown.options;
        var selectedCountryIndex = countryDropDown.selectedIndex;
        selectedCountry = countryOptions[selectedCountryIndex].innerHTML;

        console.log(selectedCountryIndex);
        console.log(selectedCountry);
        
        if(selectedCountry == defaultOption1.innerHTML){
                stateDropDown.disabled = true;  // If default Option of Country is selected disable state
            }
        else{
            for(var i in dropDownListofCountries){
            if(dropDownListofCountries[i].country === selectedCountry){
                for(var j in dropDownListofCountries[i].states){
                    var options = document.createElement("option");
                    console.log(dropDownListofCountries[i].states[j].stateName);
                    options.innerHTML = dropDownListofCountries[i].states[j].stateName;
                    stateDropDown.appendChild(options);
                }			
            }           
                
            }   
        }
        
    });
   }   


    // Assigning Districts
    function districts(){
       // document.querySelector("#container").appendChild(districtDropDown);

    stateDropDown.addEventListener("change",function(){

        districtDropDown.disabled = false;
        // Emptying DropDown
        districtDropDown.options.length = 0;
        // If above line does not work then make every option of dropdown as null before assigning new "DistrictName" of diff "StateName"
        districtDropDown.appendChild(defaultOption3);

        var stateOptions = stateDropDown.options;
        var selectedStateIndex = stateDropDown.selectedIndex;
        var selectedStateName = stateOptions[selectedStateIndex].innerHTML;

        console.log("Selected Country " + selectedCountry);
        console.log("Selected State " + selectedStateName);
        
        if(selectedStateName == defaultOption2.innerHTML)
            districtDropDown.disabled = true; // disable district if state not selected
        else{
           for(var i in dropDownListofCountries){
            if(dropDownListofCountries[i].country === selectedCountry){
                for(var j in dropDownListofCountries[i].states){
                    if(dropDownListofCountries[i].states[j].stateName === selectedStateName){                   

                        for(var k in dropDownListofCountries[i].states[j].districtList){
                            var options = document.createElement("option");
                            console.log(dropDownListofCountries[i].states[j].districtList[k]);
                            options.innerHTML = dropDownListofCountries[i].states[j].districtList[k];
                            districtDropDown.appendChild(options);
                        }                    
                    }
                    
                }
            }
        } 
    }     

        
    });
}

   countries();
   statesD();
    districts();
    
    var allDropDowns = [countryDropDown,stateDropDown,districtDropDown];
    return allDropDowns;
}
