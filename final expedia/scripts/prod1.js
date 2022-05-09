// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
// 		'X-RapidAPI-Key': 'b58bc3f6a3msh8c57d6b15b71691p151bcfjsn3d5cef1afd5f'
// 	}
// };

// fetch('https://hotels4.p.rapidapi.com/locations/v2/search?query=new%20york&locale=en_US&currency=INR', options)
// 	.then(response => response.json())
// 	.then(response => console.log(response))
// 	.catch(err => console.error(err));
import { header,footer } from "../components/header&footer.js";

document.getElementById("header").innerHTML=header();

document.getElementById("footer").innerHTML=footer();


let findHotel_Location= async ()=>{
    let location= document.querySelector("#location_input").value;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            'X-RapidAPI-Key': 'b58bc3f6a3msh8c57d6b15b71691p151bcfjsn3d5cef1afd5f'
        }
    };
    
    let res= await fetch(`https://hotels4.p.rapidapi.com/locations/v2/search?query=${location}&locale=en_US&currency=INR`, options)
    let data= await res.json();

    // console.log(data)
    return data;    
    
    
    // .then((response) => response.json())
    //     .then((response) => {return response} )
    //     .catch((err) => console.error(err));

         // return response})
        //  console.log( response.suggestions[0].entities[0].destinationId,response)
    // let res= findHotel_Location();

   
} 

// let destID= await findHotel_Location().suggestions[0].entities[0].destinationId;


let propertyList = async (destID)=>{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'hotels4.p.rapidapi.com',
            'X-RapidAPI-Key': 'b58bc3f6a3msh8c57d6b15b71691p151bcfjsn3d5cef1afd5f'
        }
    };

    let checkIn= document.querySelector("#start_date").value;
    let checkOut= document.querySelector("#end_date").value;
    // console.log(checkIn,checkOut)

    let sortBasedOn= document.querySelector("#sortID").value;

    let starFilterValue = document.querySelector("input[type='radio'][name=star]:checked").value;
    
   let res= await fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${destID}&pageNumber=1&pageSize=25&checkIn=${checkIn}&checkOut=${checkOut}&adults1=1&starRatings=${starFilterValue}&sortOrder=${sortBasedOn}&currency=USD`, options)
   let data= await res.json();

//    console.log(data)
// &locale=en_US
   return data;
    
    
    // .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));


    //     return response;
}


// propertyList(destID)

let appendHotels=(data)=>{

    document.querySelector("#products_append_div").innerHTML= null;  
    // document.querySelector("#noOfPropertiesDiv").innerHTML= null;  


    data.forEach((ele)=>{
        let box= document.createElement("div");
        box.setAttribute("class","individualProductDiv");
        box.addEventListener("click",()=>{
            let checkIn= document.querySelector("#start_date").value;
            let checkOut= document.querySelector("#end_date").value;
            let selectedHotel= {id:ele.id,checkInDate:checkIn,checkOutDate:checkOut}
            localStorage.setItem("selectedHotel",JSON.stringify(selectedHotel));
        })

        let imageDiv= document.createElement("div");
        imageDiv.setAttribute("class","individualProductImageDiv");

        let outerTextDiv= document.createElement("div");
        outerTextDiv.setAttribute("class","individualProductOuterTextDiv");

        let titleDiv= document.createElement("div");
        titleDiv.setAttribute("class","individualProductTitleDiv");

        let descDiv= document.createElement("div");
        descDiv.setAttribute("class","individualProductDescDiv");

        let descLeftDiv= document.createElement("div");
        descLeftDiv.setAttribute("class","individualProductDescLeftDiv");

        let desRightcDiv= document.createElement("div");
        desRightcDiv.setAttribute("class","individualProductDescRightDiv");

        let hardcodeDiv= document.createElement("div");
        hardcodeDiv.setAttribute("class","individualProductHardcodeDiv");

        let ratingDiv= document.createElement("div");
        ratingDiv.setAttribute("class","individualProductRatingDiv");

        let priceDiv= document.createElement("div");
        priceDiv.setAttribute("class","individualProductPriceDiv");

        
        let hotelImage= document.createElement("img");
        hotelImage.src= ele.optimizedThumbUrls.srpDesktop;

        let title= document.createElement("h3");
        title.innerText= ele.name;

        let area= document.createElement("p");
        area.innerText= ele.neighbourhood;

        let p1=  document.createElement("p");
        p1.innerText= "Fully Refundable"
        p1.id="appendp1"
        let p2=  document.createElement("p");
        p2.innerText= "Reserve Now, Pay Later"
        p2.id="appendp2"

        let rating= document.createElement("p");
        // rating.style.fontWeight="bold"
        let numOfReviews= Math.floor(Math.random()*200)+5;
        rating.innerHTML=`<span id="bold_rating">${ele.starRating}/5 </span>`  + ` (${numOfReviews} reviews)`;
        // rating.innerHTML=   `<span id="bold_rating">${ele.guestReviews.rating}/${ele.guestReviews.scale}</span>`  + `(${ele.guestReviews.total} reviews)`;
        // 3.5/5 (100 reviews)

        let price= document.createElement("h2");
        price.innerHTML= `Rs ${Math.trunc(ele.ratePlan.price.exactCurrent*75)}`
        let totalPrice= document.createElement("p");
        totalPrice.innerHTML= `Rs ${Math.trunc((ele.ratePlan.price.exactCurrent*75)*1.15)}`


        priceDiv.append(price,totalPrice);
        ratingDiv.append(rating);
        hardcodeDiv.append(p1,p2);
        titleDiv.append(title,area);
        imageDiv.append(hotelImage);

        desRightcDiv.append(priceDiv);
        descLeftDiv.append(hardcodeDiv,ratingDiv);
        descDiv.append(descLeftDiv,desRightcDiv);
        outerTextDiv.append(titleDiv,descDiv);
        box.append(imageDiv,outerTextDiv);

        document.querySelector("#products_append_div").append(box)
    })
}


let searchHotel= async ()=>{
    let destID
    document.getElementById("location_suggestion_div").style.display = "none";
    
    try{
        let res1= await findHotel_Location();

         destID=  res1.suggestions[0].entities[0].destinationId;
    }
    catch(err){
            document.querySelector("#products_append_div").innerHTML=null;

        let image= document.createElement("img");
        image.setAttribute("id","notFoundErrorImage")
        image.src= "https://thumbs.dreamstime.com/b/flat-line-icon-concept-error-page-file-not-found-icon-file-laptop-display-isolated-vector-illustration-white-119892204.jpg"
        document.querySelector("#products_append_div").append(image)
    }

    // if(dataToShow.length==0){
    //     document.querySelector("#products_append_div").innerHTML=null;

    //     let image= document.createElement("img");
    //     image.setAttribute("id","notFoundErrorImage")
    //     image.src= "https://thumbs.dreamstime.com/b/flat-line-icon-concept-error-page-file-not-found-icon-file-laptop-display-isolated-vector-illustration-white-119892204.jpg"
    //     document.querySelector("#products_append_div").append(image)
    // }
    
    // console.log(destID);

    try{
        let res2= await propertyList(destID);

        document.querySelector("#noOfPropertiesDiv").innerHTML= null;  

        let totalHotels= document.createElement("p");
            totalHotels.innerHTML= res2.data.body.searchResults.totalCount + " properties";
        let extraText=  document.createElement("a");
        extraText.innerText= "See how we pick our recommended properties";
        extraText.setAttribute("id","See_how_we_pick")
        extraText.href="#";
    
        document.querySelector("#noOfPropertiesDiv").append(totalHotels,extraText);


        let dataToShow= res2.data.body.searchResults.results;
    console.log(dataToShow);

    if(dataToShow.length==0){
        document.querySelector("#products_append_div").innerHTML=null;

        let image= document.createElement("img");
        image.setAttribute("id","notFoundErrorImage")
        image.src= "https://thumbs.dreamstime.com/b/flat-line-icon-concept-error-page-file-not-found-icon-file-laptop-display-isolated-vector-illustration-white-119892204.jpg"
        document.querySelector("#products_append_div").append(image)
    }
    else{
        appendHotels(dataToShow);
    }
    }
    catch(err){
        document.querySelector("#products_append_div").innerHTML=null;

        let image= document.createElement("img");
        image.setAttribute("id","notFoundErrorImage")
        image.src= "https://thumbs.dreamstime.com/b/flat-line-icon-concept-error-page-file-not-found-icon-file-laptop-display-isolated-vector-illustration-white-119892204.jpg"
        document.querySelector("#products_append_div").append(image)
    }
   




    
    
   
    showMapFunction();


}
document.querySelector("#Product_search_button").addEventListener("click",searchHotel)

let sortFunction= ()=>{
    searchHotel();
}

function filterFunction(){
    searchHotel();
}

document.querySelector("#sortID").addEventListener("change",()=>{sortFunction()})

document.querySelector("#starRating1").addEventListener("click",()=>{filterFunction()})
document.querySelector("#starRating2").addEventListener("click",()=>{filterFunction()})
document.querySelector("#starRating3").addEventListener("click",()=>{filterFunction()})
document.querySelector("#starRating4").addEventListener("click",()=>{filterFunction()})
document.querySelector("#starRating5").addEventListener("click",()=>{filterFunction()})



// view-source:http://api.geonames.org/searchJSON?q=london&maxRows=10&username=demo

let find_city_country= async ()=>{
        let query= document.querySelector("#location_input").value;

        let url= `http://api.geonames.org/searchJSON?q=${query}&maxRows=10&username=shivambais`

        let res= await fetch(url)

        let data= await res.json()

        let reqData= data.geonames;

        //map
        // showMapFunction();

        document.querySelector('#location_suggestion_div').style.display = "block";

        // console.log(data)   location_suggestion_div
        document.querySelector("#location_suggestion_div").innerHTML=null;
        reqData.forEach((ele)=>{
            let location= document.createElement("p");
            location.innerText= ele.name+","+ele.countryName;

            location.addEventListener("click",()=>{
                document.querySelector("#location_input").value =null;
                // document.getElementById("location_suggestion_div").style.display = "block";
                document.querySelector("#location_input").value =  ele.name+","+ele.countryName;
                // document.querySelector("#location_suggestion_div").innerHTML=null;
                document.getElementById("location_suggestion_div").style.display = "none";
            })
            document.querySelector("#location_suggestion_div").append(location)
        })
}

let timeoutVar;
let debounce=(fun,time)=>{
    if(timeoutVar){
        clearTimeout(timeoutVar);
    }

    timeoutVar = setTimeout(fun,time)
}

document.querySelector("#location_input").addEventListener("input",()=>{debounce(find_city_country,700)})

// map api

let showMapFunction=()=>{
   document.querySelector("#gmap_canvas").innerHTML=null;
    let location = document.querySelector("#location_input").value;
    let map= document.querySelector("#gmap_canvas");
    map.src= `https://maps.google.com/maps?q=${location}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}




   // made by pavan  traveller js code start

   let displayTravellers = document.getElementById("travellers_display")

   //   displayTravellers.style.display = "none"
     function displayTravellersFunction() {
        
     
         if (displayTravellers.style.display === "none") {
     
             document.getElementById("add_travellers").addEventListener("click", counterAddFunction)
     
             document.getElementById("remove_travellers").addEventListener("click", counterRemoveFunction)
     
             displayTravellers.style.display = "block"
     
             let displayCount = document.getElementById("display_count")
     
             let i = 1
     
             function counterAddFunction() {
                 i = i + 1
                 displayCount.innerText = i
                 document.getElementById("no_of_travellers").innerText = `${i} Travellers`
     
             }
     
             function counterRemoveFunction() {
                 i = i - 1
                 displayCount.innerText = i
                 document.getElementById("no_of_travellers").innerText = `${i} Travellers`
     
             }
      
         }
         else {
        
             displayTravellers.style.display = "none"
         }
     
     
     }
     document.getElementById("travellers_div").addEventListener("click", displayTravellersFunction)
     
     //   traveller js code end




     // after signin display code start

let loginUser = JSON.parse(localStorage.getItem("loginUser"))
console.log(loginUser)
document.getElementById("after_signin").innerText = loginUser[0]
let loginUserName = loginUser[0]
let loginUserEmail = loginUser[1]

document.getElementById("siginUserName").innerText = `Hi, ${loginUserName}`
document.getElementById("signinUserEmail").innerText = loginUserEmail
const displayDropdown = document.getElementById("display_aftersiginDropdown")
displayDropdown.style.display = "none"
let hideAndDisplayFunction = () => {
    if (displayDropdown.style.display == "none") {
        displayDropdown.style.padding = "20px"

        displayDropdown.style.display = "block"

    }
    else {

        displayDropdown.style.display = "none"

    }

}

document.getElementById("after_signin").addEventListener("click", hideAndDisplayFunction)


// after signin display code end

//faizal changes

document.getElementById("more_travel_display").style.display = "none"
    
let moreTravelFunction = () =>
{
    console.log("in")
    if( document.getElementById("more_travel_display").style.display === "none")
    {
        document.getElementById("more_travel_display").style.display = "block"
    }
    else{
        document.getElementById("more_travel_display").style.display = "none"
    }
}
document.getElementById("more_travel").addEventListener("click",moreTravelFunction)