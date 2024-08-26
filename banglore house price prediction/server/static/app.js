function displayHousePrice(){
    let sqft = document.getElementById("area");
    let bhk = document.getElementById("bhk").value;
    let bath = document.getElementById("bath").value;
    let location = document.getElementById("location").value;
    let estimatedPrice = document.getElementById("price-display");

    var url = "http://127.0.0.1:5000/predict_home_prices";

    if((sqft.value.trim() < 500) || (isNaN(sqft.value))){
        sqft.style.border = "1.5px solid red";
    }
    else{   
        sqft.style.border = "1px solid #5e3bee"
        console.log(sqft.value, bhk, bath, location);

        $.post(url, {
            total_sqft: parseFloat(sqft.value),
            bhk: bhk,
            bath: bath,
            location: location
        },function(data, status){
            estimatedPrice.innerText = '₹ ' + data.estimated_price.toString() + " Lakh";
            console.log(data.estimated_price, status);
        });
    }
}


function onPageLoad(){

    console.log("Document loaded");

    var url = "http://127.0.0.1:5000/get_location_names";
    $.get(url, function(data, status){
        console.log("got some response for get_location_names request " + status);
        if(data){
            var locations = data.locations;
            $('#location').empty();

            for( var i in locations){
                var opt = new Option(locations[i])
                $('#location').append(opt);
            }
        }
    });

    document.getElementById("submit").addEventListener('click', function(event){
        event.preventDefault();
        displayHousePrice();
    });

}

window.onload = onPageLoad;

