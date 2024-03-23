
$(document).ready(function() {
$('.sliderMain-slider').slick({
  slidesToShow:3.5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  arrows: false,
  dots: false,
  adaptiveHeight: true,
  
 
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


var proba = localStorage.getItem('brItemaUKorpi');
console.log(proba)
    if(proba !== null || proba !== undefined || proba.length !== 0){
    document.getElementById('numbItems').innerHTML = proba
  }else{
    document.getElementById('numbItems').innerHTML = "";
  }

})

var aboutCon=[
  "Fueled by our shared passion for sneakers and frustration at inflated resale prices, Sarah and I launched Sole Mates. We started small, leveraging our combined knowledge to source the hottest releases. Transparency was key, so we built our brand on clear communication, fair pricing, and a love for the sneaker community. Running a business with a friend presented challenges, but our shared vision and trust kept us pushing forward. Sole Mates has grown, attracting a loyal base that appreciates our dedication and fostering creativity through collaborations. It's been an incredible journey, solidifying our friendship through our shared passion."
]

function proveraSign() {
  var emailVal = document.getElementById('emailSignup').value;

  var regEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regEmail.test(emailVal)) {
      var err = document.querySelector('.msg-code');

     
      var storedCode = localStorage.getItem(emailVal);

      if (storedCode) {
          err.innerHTML = "Your discount code is: " + storedCode;
      } else {
         
          var code = Math.floor(Math.random() * 90000) + 10000;

         
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

    <div  class="suppUs suppBl"><a href="shop.html">Shop</a></div>
</div>`
}

var prim = document.querySelector('.sliderMain-slider');

prim.innerHTML = ispisSlajd;


