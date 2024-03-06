var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', '/assets/js/patike.json');
ourRequest.onload = function() {
  if (ourRequest.status >= 200 && ourRequest.status < 400) {
    // This is where we'll do something with the retrieved data
    var data = JSON.parse(ourRequest.responseText);
    
    createHTML(data);
  } else {
    console.log("We connected to the server, but it returned an error.");
  }
};

ourRequest.onerror = function() {
  console.log("Connection error");
};

ourRequest.send();


function createHTML(data) {
    var ispisHTML = "";
  
    for (var i = 0; i < data.length; i++) {
      ispisHTML += `
        <div class="col-xl-3 col-l-4 col-mb-6 col-sm-6 col-12 mb-5 ">
          <div class="card imgHover" style="width:16rem;" data-alt-src="${data[i].images.img2.src}">
            <img class="card-img-top hover" src="${data[i].images.img1.src}" alt="${data[i].images.img1.alt}">
            <div class="card-body">
              <h5 class="card-title">${data[i].name}</h5>
              <p class="card-text">$${data[i].cena}</p>
            </div>
          </div>
        </div>
      `;
    }
  
    var nesto = document.getElementById('patike');
    nesto.innerHTML = ispisHTML;
  };
  