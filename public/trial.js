const getDailyPicture = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )
  const img = await response.json()
  displayPicture(img.url)
}

const displayPicture = img => {
  document.querySelector('.space-pic').src = img
}

document.addEventListener('DOMContentLoaded', getDailyPicture)
