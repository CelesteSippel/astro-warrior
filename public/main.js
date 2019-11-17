let missions = []
let currentIndex = 0
let deadline
let timer

const main = () => {
  pictureOfTheDay()
  getSpaceXDetails()
  nextMission()
}
const pictureOfTheDay = async () => {
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/Nasa/apod'
  )
  const json = await response.json()
  console.log(json)
  document.querySelector(
    'section.daily-image'
  ).style.backgroundImage = `url(${json.hdUrl})`
  console.log(json.hdUrl)
  if (json.copyright) {
    document.querySelector('.copyright').textContent = json.copyright
  } else {
    document.querySelector('.copyright').textContent = 'no copyright'
  }
  document.querySelector('.title').textContent = json.title
}
const getSpaceXDetails = async () => {
  // make a call to the API
  const response = await fetch(
    'https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming'
  )
  const results = await response.json()
  // save json data to empty array
  console.log(results)
  missions = results
  console.log(missions)
  getCurrentMissionDetails()
}

const getCurrentMissionDetails = () => {
  document.querySelector('.title-launch').textContent =
    missions[currentIndex].mission_name

  if (missions[currentIndex].details) {
    document.querySelector('.description-launch').textContent =
      missions[currentIndex].details
  } else {
    document.querySelector('.description-launch').textContent =
      'No description available yet.'
  }

  countdownTimer()

  document.querySelector('.location').textContent =
    missions[currentIndex].launch_site.site_name_long
}

const nextMission = () => {
  setInterval(function() {
    if (currentIndex > missions.length - 2) {
      currentIndex = 0
    } else {
      currentIndex++
    }
    getCurrentMissionDetails()
  }, 10000)
}

const previousMission = () => {
  if (currentIndex > 0) {
    currentIndex--
  } else {
    currentIndex = missions.length - 1
  }
  getCurrentMissionDetails()
}

const countdownTimer = () => {
  deadline = missions[currentIndex].launch_date_utc
  const interval = setInterval(function() {
    const total = Date.parse(deadline) - Date.parse(new Date())
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))
    timer = {
      total: total,
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days
    }
    console.log(timer)
    const clock = document.querySelector('.countdown-launch')
    clock.textContent = `${timer.days} days, ${timer.hours} hours, ${timer.minutes} minutes, ${timer.seconds}, seconds`
    if (total < 0) {
      clearInterval(interval)
      clock.textContent = 'Mission has launched!'
    }
  }, 1000)
}

document.querySelector('.left-arrow').addEventListener('click', previousMission)

document.querySelector('.right-arrow').addEventListener('click', nextMission)
document.addEventListener('DOMContentLoaded', main)
