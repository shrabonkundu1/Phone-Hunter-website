let spinner = document.getElementById('spinner');



// loadallPhones function
const loadAllPhones = async(status, searchText) => {
    spinner.classList.add('hidden')

    // call API data 

    const res  = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText?searchText:"iphone"}`)
    const data = await res.json();

    if(status === true){
        displayAllPhone(data.data)
    }
    else{
        displayAllPhone(data.data.slice(0,6))
    }

    
   
};


// displayAllPhoneData 
const displayAllPhone = (phones) =>{
    console.log(phones)
    
    const showCardContainer = document.getElementById('show-card-container');

    // loop 
    phones.forEach(phone =>{
        const {phone_name , image , slug} = phone;
        const div = document.createElement('div');
        div.innerHTML =
        `
        <div class="text-center card m-7 border">
  <figure class="px-10 bg-sky-200 py-10">
    <img
      src=${image}
      alt="Iphone Image"
      class="rounded-xl " />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${phone_name}</h2>
    <p class= "py-1">${slug}</p>
    <div class="card-actions">
      <button onclick = "showDetails('${slug}')" id = "btn-details" class="btn btn-primary">Show Details</button>
    </div>
  </div>
</div>
        `;
        showCardContainer.appendChild(div)
    })
}


// show details button 
// const showDetails = document.getElementById('btn-details');

const showDetails = async(slug) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    const data = await res.json();
    console.log(data.data)


    const {name, mainFeatures,image, releaseDate} = data.data;
    const {displaySize,memory,chipSet,storage} = mainFeatures;

    const modalContainer = document.getElementById('modal-container');

    modalContainer.innerHTML =
    `
        <dialog id="my_modal_1" class="modal text-center">
  <div class="modal-box ">
  <figure class="px-10 py-10 flex justify-center items-center">
    <img
      src=${image}
      alt="Iphone Image"
      class="rounded-xl " />
  </figure>
    <h3 class="text-lg font-bold mb-5">${name}</h3>
    <div class = "text-left" >
    <p class="py-1">Storeage : ${storage}</p>
    <p class="py-1">DisplaySize : ${displaySize}</p>
    <p class="py-1">ChipSet : ${chipSet}</p>
    <p class="py-1">Memory : ${memory}</p>
    </div>
    <p class="text-left py-1">ReleaseDate : ${releaseDate}</p>
    <div class="modal-action grid justify-center items-center text-center">
      <form  method="dialog">
    
       <button class="btn bg-sky-300 hover:bg-sky-300 px-8">Close</button>
      </form>
    </div>
  </div>
</dialog>
    `;



    my_modal_1.showModal();
}




// showHandleButton (show all )button:
const showHandleButton = () => {
    loadAllPhones(true)
}

// onclick search function
const clickSearch = () => {

    spinner.classList.remove('hidden')


    const searchText = document.getElementById('search-box').value;



    setTimeout(function(){
        loadAllPhones(false,searchText)
    },3000)
}




loadAllPhones();