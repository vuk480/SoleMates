var polovi=[];
var sportovi =[];
var kolekcije =[];
var patike = [];
var selectedCategoryList = [];
var selectedSportsList = [];
var selectedGendList=[];
var cartItems = [];
var concatArr = [];
var kolicina =[];
var korpa= [];

var url=location.pathname;

function fetchData(url) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: url,
      method: "get",
      dataType: "json",
      success: function(data) {
        resolve(data);
      },
      error: function(err) {
        reject(err);
      }
    });
  });
}

if(url=="/SoleMates/shop.html"){

  
  window.onload = async function() {
    console.log("proba");
    try {
      const [fetchedKollekcije, fetchedSportovi, fetchedPolovi, fetchedPatike] = await Promise.all([
        fetchData("assets/js/kolekcije.json"),
        fetchData("assets/js/sport.json"),
        fetchData("assets/js/pol.json"),
        fetchData("assets/js/patike.json"),
      ]);
  
      kolekcije = fetchedKollekcije;
      sportovi = fetchedSportovi;
      polovi = fetchedPolovi;
      patike = fetchedPatike;
  
      ispisForme(kolekcije, "kolekcija");
      ispisForme(sportovi, "sportovi");
      ispisForme(polovi, "pol");
      createHTML(patike);  

      
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    var proba = localStorage.getItem('brItemaUKorpi');
    if(proba == null || proba !== undefined){
    document.getElementById('numbItems').innerHTML = proba}
  };

  
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

function createHTML(data) {
  
    let ispisHTML = "";
    data=filtCol(data);
    data=filtSport(data);
    data=filtGend(data);
    data=sortPatike(data);
    if (data.length > 0) {
    for (let pro of data) {
      ispisHTML += `
        <div class="col-sm-12 col-md-6 col-lg-3 mb-5 mx-0.5 row">
          <div class="card col-9">
            <img class="card-img-top hover" width="12em"src="${pro.images.img1.src}" alt="${pro.images.img1.alt}">
            <div class="card-body">
              <h5 class="card-title">${pro.ime}</h5>
              <p class="card-text">${poredjenjePola(pro.genderId)}</p>
              <div class="d-flex justify-content-between">
              <div class="d-flex justify-content-center align-items-center">
                <p class="card-text">$${pro.cena}</p>
              </div>
              <div>
                <button type="button" name="btnCart" class="btn btn-dark" id="${pro.id}">Add to cart</button>
              </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }

   
    const mainDivShopa = document.getElementById('patike'); 
    mainDivShopa.innerHTML = ispisHTML;

    
    
    
    var cartProducts = document.getElementsByName("btnCart");
    cartProducts = Array.from(cartProducts)
    cartProducts.forEach(btn => {
    btn.addEventListener("click", function(){
      
      var dodatnePatike =[];
      
      const cartItemsLS = localStorage.getItem('cartItemsLS');
      if (cartItemsLS !== null && cartItemsLS !== '') {
         dodatnePatike = JSON.parse(cartItemsLS);
          dodatnePatike.push(btn.id);
          localStorage.setItem('brItemaUKorpi',dodatnePatike.length);
        
        var brItemaUKorpi = localStorage.getItem('brItemaUKorpi');
        document.getElementById('numbItems').innerHTML = brItemaUKorpi
      
       }else{
        cartItems.push(btn.id);
        console.log(cartItems) 
        localStorage.setItem('brItemaUKorpi',dodatnePatike.length);
        
        var brItemaUKorpi = localStorage.getItem('brItemaUKorpi');
        document.getElementById('numbItems').innerHTML = brItemaUKorpi
       }
      
       this.innerHTML = 'Added to Cart <i class="fa fa-check text-light" aria-hidden="true"></i>'; 
    this.style.backgroundColor = 'green'; 
       
       

  setTimeout(() => {
    this.textContent = 'Add to Cart'; 
    this.style.backgroundColor = ''; 
  }, 1000);
     
      if(dodatnePatike.length > 0)
      {   
          localStorage.setItem("cartItemsLS",JSON.stringify(dodatnePatike))
      }else{
          var foo = cartItems
          localStorage.setItem("cartItemsLS",JSON.stringify(foo))}
    });
})
  } else{
    const mainDivShopa = document.getElementById('patike');
    mainDivShopa.innerHTML = `
    <div class="emptyCart">
    <p>No Items that match these parameters</p>
    </div>
    `;
  }
}

function filtCol(data){
  if(selectedCategoryList.length == 0){
    return data;
  }
  let noviNiz =[];
  for (let i = 0; i < data.length; i++){
    for (let j = 0; j < selectedCategoryList.length; j++){
        if (data[i].collectionID.includes(selectedCategoryList[j])){
            noviNiz.push(data[i]);
        }
    }
}
  return noviNiz;
}

function filtSport(data){
  if(selectedSportsList.length == 0){
    return data;
  }
  let noviNiz = [];
  for (let i = 0; i < data.length; i++){
   
    for (let j = 0; j < selectedSportsList.length; j++){
        if (data[i].sportId.includes(selectedSportsList[j])){
            noviNiz.push(data[i]);
        }
    }
}
  return noviNiz;
};

function filtGend(data){
  if(selectedGendList.length == 0){
    return data;
  }
  let noviNiz = [];
  for (let i = 0; i < data.length; i++){
   
    for (let j = 0; j < selectedGendList.length; j++){
        if (data[i].genderId.includes(selectedGendList[j])){
            noviNiz.push(data[i]);
        }
    }
}
  return noviNiz;
};





function sortPatike(nizProizvoda){
  let sortiranePatike = [];
  let izbor = $("#ddlSort").val();


  if(izbor == "0"){
      sortiranePatike = nizProizvoda;
  }
  else{
      sortiranePatike = nizProizvoda.sort(function(a, b){
          if(izbor == "3"){
              return a.cena - b.cena;
          }
          if(izbor == "4"){
              return b.cena - a.cena;
          }
          if(izbor == "1"){
              if(a.ime < b.ime){
                  return -1;
              }
              else if(a.ime > b.ime){
                  return 1;
              }
              else{
                  return 0;
              }
          }
          if(izbor == "2"){
              if(a.ime > b.ime){
                  return -1;
              }
              else if(a.ime < b.ime){
                  return 1;
              }
              else{
                  return 0;
              }
          }   
      })
  }
  return sortiranePatike;
}
  
  function poredjenjePola(prosledjeniPol){
    var vrednost ="";  
    for(let p1 of polovi)
      {
        if(prosledjeniPol == p1.id){
          vrednost+=p1.ime;
          return vrednost;
        }
      }
  }

  var brojac = 0;
  var htmlForma="";
  function ispisForme(data,tip){

    if(tip == "kolekcija"){
      htmlForma+=` <h5><b>By Collection:</b></h5>
      <form action="" id="formaForFiltering">`;
    for(let obj of data){
     
      htmlForma+=
      `
        <input type="checkbox" value="${obj.id}" name="col" id="col-${obj.id}">
         <label for="${obj.ime}">${obj.ime}</label></br>
        
      `

    }
   }else if(tip == "sportovi"){
    htmlForma+=` <h5><b>By Sport:</b></h5>`;
    for(let obj of data){
      
      htmlForma+=
      `
        <input type="checkbox" value="${obj.id}" name="sport" id="spo-${obj.id}">
         <label for="${obj.ime}">${obj.ime}</label></br>
        
      `

   }
  }else if(tip == "pol")
  {htmlForma+=` <h5><b>By Gender:</b></h5>`;
    for(let obj of data){
      
      htmlForma+=
      `
        <input type="checkbox" value="${obj.id}" name="gend" id="gen-${obj.id}">
         <label for="${obj.ime}">${obj.ime}</label></br>
        
      `

   }

   htmlForma+=`</form>`;
   htmlForma+=
   ` <div>
   <select class="form-select" aria-label="Sort by:" id="ddlSort">
   <option value="0" selected>Sort by:</option>
   <option value="1">Name A-Z</option>
   <option value="2">Name Z-A</option>
   <option value="3">Price Asc</option>
   <option value="4">Price Desc</option>
 </select>
</div>
   `;

   var formaHtml = document.getElementById('filtForm');
   formaHtml.innerHTML=htmlForma;
   

   dodavanjeEventa();
  }

}



function dodavanjeEventa() {
  var patikeCol = document.getElementsByName("col");
  var patikeSpor = document.getElementsByName("sport");
  var patikeGend = document.getElementsByName("gend");
  
 
  

patikeCol = Array.from(patikeCol)
patikeCol.forEach(type => {
    type.addEventListener("change", function(){
        if (this.checked){
            selectedCategoryList.push(type.id.substring(4, (type.id).length));
            
            createHTML(patike);
        }
        else{
            selectedCategoryList.splice(selectedCategoryList.indexOf(type.id), 1);
            createHTML(patike);
        }
    });
})


patikeSpor = Array.from(patikeSpor)

patikeSpor.forEach(type => {
    type.addEventListener("change", function(){
        if (this.checked){
            selectedSportsList.push(type.id.substring(4, (type.id).length));
           
            createHTML(patike);
        }
        else{
          selectedSportsList.splice(selectedSportsList.indexOf(type.id), 1);
      
            createHTML(patike);
        }
    });
})

patikeGend = Array.from(patikeGend)
patikeGend.forEach(type => {
    type.addEventListener("change", function(){
        if (this.checked){
            selectedGendList.push(type.id.substring(4, (type.id).length));
          
            createHTML(patike);
        }
        else{
          selectedGendList.splice(selectedGendList.indexOf(type.id), 1);
        
            createHTML(patike);
        }
    });
})
console.log(cartItems)

var ddlLista= document.getElementById('ddlSort');
ddlLista.addEventListener('change',function(){
 
  createHTML(patike);
})
}

}

if (url === "/SoleMates/korpa.html") {
  window.onload = async function() {
    console.log("proba");
    try {
      const fetchedPatike = await fetchData("assets/js/patike.json");
      patike = fetchedPatike;
      
      korpa = JSON.parse(localStorage.getItem('cartItemsLS'));
      
      if(korpa ==null || korpa == '' || korpa.length==0){
        var prazanCart = document.getElementById('ispisKorpe');
        
            prazanCart.innerHTML = `
              <div class="emptyCart">
                <p>No Items in your cart</p>
                <button class="shopNowBtn">
                <a href="shop.html">Shop Now</a>
              </button>
              </div>
            `;
          document.getElementById('checkOutTitle').style.display='none'
          document.getElementById('checkOut').style.display='none'
          document.getElementById('addForma').style.display='none'
          }

            
      for(let i=0;i<korpa.length;i++){
        if(korpa[i]==korpa[i-1]){
          continue;
        }else{
        brojac =0;
        for(let j=0;j<korpa.length;j++){
          if(korpa[i]==korpa[j]){
            brojac++;
          }
          
        }}
        kolicina.push(brojac);
      }

     
     if(korpa == null || korpa.length==0 || korpa == ''){
      var prazanCart = document.getElementById('ispisKorpe');
      
          prazanCart.innerHTML = `
            <div class="emptyCart">
              <p>No Items in your cart</p>
              <button class="shopNowBtn">
              <a href="shop.html">Shop Now</a>
            </button>
            </div>
          `;
          document.getElementById('checkOutTitle').style.display='none'
          document.getElementById('checkOut').style.display='none'
          document.getElementById('addForma').style.display='none'
     }else{
        var korpaNumbers = korpa.map(idString => Number(idString));
      var arr1 = [];
      concatArr =arr1.concat(korpaNumbers);
      var prazanCart = document.getElementById('ispisKorpe');
      
      var filteredPatike = patike.filter(p => concatArr.includes(p.id)); 
        ispisKorpe(filteredPatike); 
 
     }
      
    } catch (error) {
      console.error("Error fetching data or retrieving cart items:", error);
    
    }

    $('#myDDL').click(function() {
      $('#myInput').fadeToggle();
    });

  
    };
  
  
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

  function ispisKorpe(patikeIzKorpe){
    let suma=0;
    var htmlSintaksa ="";
    let i=0;
    if(patikeIzKorpe.length > 0){
      for(let patika of patikeIzKorpe){

        htmlSintaksa+=
        `
          <div class="row d-flex justify-content-between border border-dark my-2">
          <div class="col-12 col-sm-6 my-2 ">
            <div class="d-flex justify-content-center row">
              <div class="imgKorpa col-5 col-sm-4 d-flex justify-content-center">
                <img src="${patika.images.img1.src}" alt="${patika.images.img1.src}">
              </div>
              <div class="text-center col-12 col-sm-4 d-flex justify-content-center flex-column">
                <p>${patika.ime}</p>
                <p class="cena">$${patika.cena}</p>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 d-flex align-items-center row justify-content-center mb-2">
            <div class="quantity-button col-3 col-sm-4">
              <div class="d-flex justify-content-center">  
                <button class="quantity-minus">-</button>
                  <input type="number" id="${patika.id}" class="quantity-input" value="${kolicina[i]}" min="1">
                <button class="quantity-plus d-flex align-items-center">+</button>
              </div>
            </div>        
          
          <div class="col-3 col-sm-4 d-flex align-items-center  justify-content-center">
            <div>
            <button class="ukloni h-100" id="${patika.id}"><i class="fa fa-trash h-100" aria-hidden="true"></i></button>
            </div>
          </div>
          </div>
          </div>
        `

        suma+=Number(patika.cena)*Number(kolicina[i]);
        i++;
        
      }
   
      var htmlKorpa = document.getElementById('ispisKorpe');

      htmlKorpa.innerHTML = htmlSintaksa;
      ispisCene(suma);
      dodavanjeEventaKorpa(patikeIzKorpe,suma);

      
    }
        else{
          document.getElementById('checkOutTitle').style.display='none'
          document.getElementById('checkOut').style.display='none'
          document.getElementById('addForma').style.display='none'
          document.getElementById('proba').style.display='none';
          var prazanCart = document.getElementById('ispisKorpe');
          prazanCart.innerHTML = `
            <div class="emptyCart">
            <p>No Items in your cart</p>
            <button class="shopNowBtn">
              <a href="shop.html">Shop Now</a>
            </button>
            </div>
          `;

          localStorage.removeItem('brItemaUKorpi')
        }
      }
     
      
      function ispisCene(suma){
        var tax = Math.floor(Math.random() * (20 - 5) + 5);
        htmlIspis ="";

        htmlIspis+=`<div id="summary">
        <h4>Summary</h4>
      </div>
      <div class="d-flex justify-content-between" id="subtotal">
        <div>Subtotal</div>
        <div id="ukupnaCena" class="text-right">$${suma}</div>
      </div>
      <div class="d-flex justify-content-between">
        <div>Esimeted Tax and shipping</div>
        <div id="taxShip" class="text-right">$${tax}</div>
      </div>
      <hr>
        <div class="d-flex justify-content-between w-100">
          <div>Total</div>
        <div id="total" class="text-right">$${suma+tax}</div>
        </div>

        <hr>

        <button id="btnForCheckOut" class="btn btn-dark w-100">Check Out</button>`

        document.querySelector('#proba').innerHTML =htmlIspis;
        document.querySelector('#btnForCheckOut').setAttribute('disabled',"");
        
        document.getElementById('btnForCheckOut').addEventListener('click', function() {
          localStorage.clear()
          document.getElementById('thankYouModal').style.display = 'block';
          document.getElementById('overlay').style.display = 'block';
        
          
          setTimeout(function() {
            window.location.href = 'index.html';
          }, 3000);
        });
      }

      function dodavanjeEventaKorpa(data,suma){
        const quantityButtons = document.querySelectorAll(".quantity-button");
       
        quantityButtons.forEach(button => {
          const minusButton = button.querySelector(".quantity-minus");
          const plusButton = button.querySelector(".quantity-plus");
          const quantityInput = button.querySelector(".quantity-input");

          minusButton.addEventListener("click", () => {
            var cenaPatike = data.filter(el=> el.id == Number(quantityInput.id));

            var cena = Number(cenaPatike[0].cena);
            let quantity = parseInt(quantityInput.value) - 1;
            if (quantity > 0) {
              quantityInput.value = quantity;
              suma -=cena;


              ispisCene(suma)
            }else{
              var ukupnaCena = document.getElementById('ukupnaCena');
            ukupnaCena.innerHTML= suma;
            }
            
          });

          plusButton.addEventListener("click", () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;

            var cenaPatike = data.filter(el=> el.id == Number(quantityInput.id));
            var cena = Number(cenaPatike[0].cena);

            suma +=cena;

            
            ispisCene(suma);
          });
        });

        var ukupnaCena = document.getElementById('ukupnaCena');
        ukupnaCena.innerHTML= suma;

        var dugmeUkloni = document.querySelectorAll('.ukloni');

        dugmeUkloni.forEach(button =>{
          button.addEventListener('click',function(){

            var newData =[];
            var patikeId =[];


            for(let i=0;i<data.length;i++){
              if(parseInt(button.id, 10) === data[i].id){
                continue;
              }else{
                newData.push(data[i]);
                patikeId.push(data[i].id);
              }
            }

            localStorage.setItem('cartItemsLS',JSON.stringify(patikeId));
            
            ispisKorpe(newData);
          })
        })
      }

      function show1(){
        document.getElementById('ourAdd').style.display ='none';
        document.getElementById('yourAdd').style.display = 'block';
      }
      function show2(){
        document.getElementById('yourAdd').style.display ='none';
        document.getElementById('ourAdd').style.display ='block';
      }

      const ime = document.getElementById('fName');
      const prezime = document.getElementById('lName');
      const email = document.getElementById('emailForm');
      const radio = document.getElementById('outAddresRadio');

      

        var add = document.getElementById('addressHome');
          add.addEventListener('blur',()=>{
            if(add.value!==''){
              document.querySelector('.emErr').textContent = ''
              var regOurAdd = /^[A-Z][a-zA-Z]{3,}(?:\s[a-zA-Z]{4,})* \d+$/
              if(!regOurAdd.test(add.value)){
                document.querySelector('.emErr').textContent = "Addres is not in the right format, Ex. 'Street 1'"
              }else{
                document.querySelector('.emErr').textContent = ""
              }
            }
          })


      ime.addEventListener('blur',()=>{
            if(ime.value == ""){
              document.querySelector('.fName').textContent = "This field is required"
            }else{
              document.querySelector('.fName').textContent = ''
              var regOurFName = /^[A-ZŠĐŽČĆ][a-zđžčćš]{2,}/
              if(!regOurFName.test(ime.value)){
                document.querySelector('.fName').textContent = "First Name is not in the right format, Ex. 'John'"
              }else{
                document.querySelector('.fName').textContent = ""
              }
            }
          })
        
      prezime.addEventListener('blur',()=>{
            if(prezime.value == ""){
              document.querySelector('.lName').textContent = "This field is required"
            }else{
              document.querySelector('.lName').textContent = ''
              var regOurLName = /^[A-ZŠĐŽČĆ][a-zđžčćš]{2,}/
              if(!regOurLName.test(prezime.value)){
                document.querySelector('.lName').textContent = "Last Name is not in the right format, Ex. 'Doe'"
              }else{
                document.querySelector('.lName').textContent = ""
              }
            }
          })

      email.addEventListener('blur',()=>{
            if(email.value == ""){
              document.querySelector('.mailFor').textContent = "This field is required"
             }else{
              document.querySelector('.mailFor').textContent = ''
              var regOurMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
              if(!regOurMail.test(email.value)){
                document.querySelector('.mailFor').textContent = "Email is not in the right format, Ex. 'john@example.com'"
              }else{
                document.querySelector('.mailFor').textContent = ""
              }
            }
          })
        
      
          function proveraForme(event) {
            event.preventDefault(); 
          
            if (ime.value == "" || prezime.value == "" || email.value == "") {
              document.querySelector('.submitBtn').textContent = "Please fill in all required fields";
            } else {
              var dugmeSub = document.querySelector('#submitForm');
              dugmeSub.innerHTML = 'Form submitted successfully <i class="fa fa-check text-light" aria-hidden="true"></i>';
              dugmeSub.style.backgroundColor = 'green';
          
              setTimeout(() => {
                dugmeSub.textContent = 'Submit';
                dugmeSub.style.backgroundColor = '';
              }, 3000);
          
              document.querySelector('#zaResetforme').reset();
          
              document.querySelector('#btnForCheckOut').removeAttribute('disabled');
            }
          }

      
  }

  if(url=="/SoleMates/author.html"){

  
  
    
  var hamburger = document.querySelector(".hamburger");
  var nav_menu = document.querySelector(".nav-menu");
  
  hamburger.addEventListener("click", () => {
    
    hamburger.classList.toggle("active");
    nav_menu.classList.toggle("active");
  });
  }

  
