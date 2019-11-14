const main = () => {
  changePicture()
}

const changePicture = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )
  const json = await response.json()
  console.log(json)
  document.querySelector(
    'section.daily-picture'
  ).style.backgroundImage = `url(${json.hdUrl})`
  console.log(json.hdUrl)
  if (json.copyright) {
    document.querySelector('.copyright').textContent = json.copyright
  } else {
    document.querySelector('.copyright').textContent = 'no copyright'
  }
  document.querySelector('.copyright').textContent = json.title
}

document.addEventListener('DOMContentLoaded', main)
