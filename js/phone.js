const loadPhone = async (text = 'a', isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${text}`)
  const mobile = await res.json()
  displayPhones(mobile.data, isShowAll)
}

const displayPhones = (phone, isShowAll) => {
  // console.log(phone)
  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.textContent = '';



  const showAllCard = document.getElementById('show-allCard')
  if (phone.length > 12 && !isShowAll) {
    showAllCard.classList.remove('hidden')
  }
  else {
    showAllCard.classList.add('hidden')
  }

  if (!isShowAll) {
    phone = phone.slice(0, 12)
  }

  phone.forEach(phone => {
    const phoneCard = document.createElement('div')
    phoneCard.classList = `card bg-gray-100 p-4 shadow-xl`
    phoneCard.innerHTML = `
         <figure>
                  <img
                    src="${phone.image}"
                    alt="Shoes" />
                </figure>
                <div class="card-body">
                  <h2 class="card-title">${phone.phone_name}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-end">
                    <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                    
                  </div>
                </div>`
    phoneContainer.appendChild(phoneCard)
  })
  toggleLoadingSpinner(false)
}

// search bar
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true)
  const searchField = document.getElementById('search-field')
  const text = searchField.value
  console.log(text)
  loadPhone(text, isShowAll)
}


// Show All Card Button
const handleShowAll = () => {
  handleSearch(true)
}

// Show Mobile Details
const handleShowDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)

  const data = await res.json();
  const phone = data.data
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('show-details-phone-name')
  phoneName.innerText = phone.name;

  const phoneDetails = document.getElementById('show-details-container')
  phoneDetails.innerHTML = `<img src="${phone.image}" alt="">
  <p><span> Storage: </span> ${phone?.mainFeatures?.storage}</p>
  <p><span> Display Size: </span> ${phone?.mainFeatures?.displaySize}</p>
  <p><span> Chip Set: </span> ${phone?.mainFeatures?.chipSet}</p>
  <p><span> Memory: </span> ${phone?.mainFeatures?.memory}</p>
  <p><span> Sensors: </span> ${phone?.mainFeatures?.sensors}</p>
  <p><span> Release Date: </span> ${phone?.releaseDate}</p>
  <p><span> Brand: </span> ${phone?.brand}</p>
  <p><span> WLAN: </span> ${phone?.others.WLAN}</p>
  <p><span> Bluetooth: </span> ${phone?.others.Bluetooth}</p>
  <p><span> GPS: </span> ${phone?.others.GPS}</p>
  <p><span> NFC: </span> ${phone?.others.NFC}</p>
  <p><span> Radio: </span> ${phone?.others.Radio}</p>
  <p><span> USB: </span> ${phone?.others.USB}</p> 
  `

  my_modal_1.showModal()
}

// Spinner Load
const toggleLoadingSpinner = (isLoading) => {
  const LoadingSpinner =document.getElementById('loading-spinner')
  if(isLoading){
    LoadingSpinner.classList.remove('hidden')
  }
  else{
    LoadingSpinner.classList.add('hidden')
  }
}
loadPhone()