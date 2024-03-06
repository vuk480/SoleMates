$(document).ready(function() {
$('.sliderMain-slider').slick({
  slidesToShow:3.5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  dots: false,
  adaptiveHeight: true,
  

 // slider responsivo 
  responsive: [
  {
      breakpoint: 1121,
      settings: {
          slidesToShow: 2,
          autoplay: true,
          adaptiveHeight: true,
      }
  },

  {
      breakpoint: 768,
      settings: {
          slidesToShow: 1,
          autoplay: true,
          adaptiveHeight: true,
      }
  }
  ]  
   
});


var hamburger = document.querySelector(".hamburger");
var nav_menu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  
  hamburger.classList.toggle("active");
  nav_menu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  
  hamburger.classList.remove("active");
  nav_menu.classList.remove("active");
}));


// var katReq = new XMLHttpRequest();
// katReq.open('GET', '/assets/js/kategorije.json');
// katReq.onload = function() {
//   if (katReq.status >= 200 && katReq.status < 400) {
//     // This is where we'll do something with the retrieved data
//     var data = JSON.parse(katReq.responseText);
    
//    // createHTML(data);
//   } else {
//     console.log("We connected to the server, but it returned an error.");
//   }
// };

// katReq.onerror = function() {
//   console.log("Connection error");
// };

// katReq.send();





var proba = document.getElementById('proba');

var test = document.getElementById('myDiv');

var test1 = test.getAttribute('data-custom');

var temp="";

proba.addEventListener('mouseenter',()=>{
  var niktoni = document.getElementById('test11');
  temp = niktoni.getAttribute('src');
  niktoni.removeAttribute('src');
  niktoni.setAttribute('src',test1);
})

var temp2="";

proba.addEventListener('mouseleave',()=>{
  var niktoni = document.getElementById('test11');
  temp2 = niktoni.getAttribute('src');
  niktoni.removeAttribute('src');
  niktoni.setAttribute('src',temp);
})


})


var nesto="";
function print_shoe_detail(){
  
  var shoeName = JSON.parse(localStorage.getItem('name'));
  var shoeGender = JSON.parse(localStorage.getItem('gender'));
  var shoePrice = JSON.parse(localStorage.getItem('price'));
  var img1 = (localStorage.getItem('img1'));
  var img2 = JSON.parse(localStorage.getItem('img2'));
  var img3 = JSON.parse(localStorage.getItem('img3'));
  

  // Update the elements with retrieved data
  document.getElementById('shoe-name').innerHTML = shoeName;
  document.getElementById('shoe-gender').innerHTML = shoeGender;
  document.getElementById('shoe-price').innerHTML = shoePrice;
  document.getElementById('main-photo-img').src = img1;
  document.getElementById('photo1-3').src = img1;
  document.getElementById('photo2-3').src = img2;
  document.getElementById('photo3-3').src = img3;


}


function getValues(val) {
 

  var name = document.getElementsByName('shoeName')[val].value;
  localStorage.setItem("name",name);
  console.log(localStorage.getItem('name'));
  var gender = document.getElementsByName('shoeGender')[val].value; // Access the first element
  localStorage.setItem("gender", gender);
  var price = document.getElementsByName('shoePrice')[val].value;
  localStorage.setItem("price", price);
  var img1 = document.getElementsByName('img1')[val].value;
  localStorage.setItem("img1", img1);
  var img2 = document.getElementsByName('img2')[val].value;
  localStorage.setItem("img2", img2);
  var img3 = document.getElementsByName('img3')[val].value;
  localStorage.setItem("img3", img3);

  print_shoe_detail();


}


var aboutCon=[
  "Fueled by our shared passion for sneakers and frustration at inflated resale prices, Sarah and I launched Sole Mates. We started small, leveraging our combined knowledge to source the hottest releases. Transparency was key, so we built our brand on clear communication, fair pricing, and a love for the sneaker community. Running a business with a friend presented challenges, but our shared vision and trust kept us pushing forward. Sole Mates has grown, attracting a loyal base that appreciates our dedication and fostering creativity through collaborations. It's been an incredible journey, solidifying our friendship through our shared passion."
]

function proveraSign() {
  var emailVal = document.getElementById('emailSignup').value;

  var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regEmail.test(emailVal)) {
      var err = document.querySelector('.msg-code');

      // Check if a discount code is already assigned to the email
      var storedCode = localStorage.getItem(emailVal);

      if (storedCode) {
          err.innerHTML = "Your discount code is: " + storedCode;
      } else {
          // Generate a new discount code
          var code = Math.floor(Math.random() * 90000) + 10000;

          // Store the discount code in localStorage using the email as the key
          localStorage.setItem(emailVal, code);

          err.innerHTML = "Your discount code is: " + code;
      }
  } else {
      var err = document.querySelector('.msg-code');
      err.innerHTML = "Email is not in the right format";
  }
}




var nizSlajd= ['assets/img/air-jordan-low1.jpeg','assets/img/air-jordan-low-belo-plave1.jpeg','assets/img/air-jordan-retro-green1.png','assets/img/air-jordan-low-crne1.jpeg'];
var nizSlajdImena = ['Air Jordan 1 Lows','Air Jordan 1 Lows Patch','Air Jordan 5 Retro','Air Jordan 1 Lows Void'];
var nizSlajdCena = ['130','140','200','140'];
var ispisSlajd="";

for(let i=0;i<nizSlajd.length;i++){
  ispisSlajd+=`<div>
  <div><img src="${nizSlajd[i]}" alt="Air Force 1"></div>
  <div class="shoeDescMain">
    <h4>${nizSlajdImena[i]}<h5>
    <h6>Men's Shoes<h5>
    <h6">$${nizSlajdCena[i]}<h5>
  </div>

    <div  class="suppUs suppBl"><a href="index.html">Shop</a></div>
</div>`
}

var prim = document.querySelector('.sliderMain-slider');

prim.innerHTML = ispisSlajd;


