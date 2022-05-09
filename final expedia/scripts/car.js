



function appendData(){
   
   
    let img=document.createElement("img");
    img.src="https://ctimg-fleet.cartrawler.com/generic/economy/primary.png?w=151.875&auto=compress";

    let name=document.createElement("h3")
    name.innerText="Economy";
    let price=document.createElement("p")
    price.innerText="From  ₨ 5242.59";

    document.getElementById("detail_2").append(name, img, price,)
    // console.log("DK");

}


function car_details(){

    console.log("in")
    window.location.href="cr_details.html"
}