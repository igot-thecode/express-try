// DONE: Wire up the app's behavior here.
// NOTE: The TODOs are listed in index.html

async function loadPage() {
  renderCourseOptions() //render course options

  //setup page
  let logForm = document.getElementById('logForm')
  document.getElementById('addLogBtn').setAttribute('disabled', true)
  let uvuIdInput = document.getElementById('uvuId')
  uvuIdInput.style.display = 'none'
  let courseSelect = document.getElementById('course')

  //event listener to select course
  courseSelect.addEventListener('change', function() {
    if (courseSelect.selectedIndex == 0) {
      uvuIdInput.style.display = 'none'
    }
    else {
      uvuIdInput.style.display = 'block'
      const event = new Event('input')
      uvuIdInput.dispatchEvent(event)
    }
  })

  //event listener to input uvu id
  uvuIdInput.addEventListener('input', function() {
    if (isNaN(this.value)) {
      this.value = this.value.slice(0, this.value.length-1)
    }

    if (this.value.length == this.maxLength) {
      let selectedOptionIndex = courseSelect.selectedIndex
      let url = `https://json-server-e1ccmf--3000.local.webcontainer.io/logs?courseId=${courseSelect.children[selectedOptionIndex].value}&uvuId=${this.value}`
      document.getElementById('addLogBtn').setAttribute('disabled', true)
      try {
        let res = fetch(url)
        res.then(response => {
          if (response.status == 200 || response.status == 304) return response.json()
        }).then(result => {
          document.getElementById('uvuIdDisplay').innerText =  `Student Logs for ${this.value}`
          let logList = document.getElementById('logList')
          logList.innerHTML = ""
          for (let log of result) {
            let tempLi = document.createElement('li')
            let tempDiv = document.createElement('div')
            let tempSmall = document.createElement('small')
            let tempPre = document.createElement('pre')
            let tempP = document.createElement('p')

            tempSmall.innerText = log.date
            tempDiv.append(tempSmall)

            tempP.innerText = log.text
            tempPre.append(tempP)

            tempLi.append(tempDiv)
            tempLi.append(tempPre)
            tempLi.addEventListener('click', function() {
              if (tempPre.style.display != 'none') {
                tempPre.style.display = 'none'
              }
              else {
                tempPre.style.display = 'block'
              }
            })

            logList.append(tempLi)
          }
          document.getElementById('addLogBtn').removeAttribute('disabled')
        })
      } catch (error) {
        document.getElementById('uvuIdDisplay').innerText = `Course ${courseSelect.children[selectedOptionIndex].value} or UVU Id ${this.value} does not exist, try again!`
        document.getElementById('addLogBtn').setAttribute('disabled', true)
        console.log(error)
      }

    }
  })

  let addLogBtn = document.getElementById('addLogBtn')
  let textareaBox = document.getElementById('textareaBox')
  logForm.addEventListener('submit', function(ev) {
    ev.preventDefault()
    let selectedOptionIndex = courseSelect.selectedIndex
    let d = new Date()
    let newJSON = {}
    newJSON['courseId'] = courseSelect.children[selectedOptionIndex].value
    newJSON['uvuId'] = uvuIdInput.value
    let dateStr = d.toLocaleString()
    let date = dateStr.split(',')[0]
    let time = dateStr.split(',')[1]
    let constructDate = `${date} ${time}`
    newJSON['date'] = constructDate
    newJSON['text'] = textareaBox.value
    newJSON['id'] = createUUID()

    let url = `https://json-server-e1ccmf--3000.local.webcontainer.io/logs?courseId=${newJSON.courseId}&uvuId=${newJSON.uvuId}`
    try {
      let res = fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newJSON) // body data type must match "Content-Type" header
      })
      res.then(response => {
        if (response.ok) {
          const event = new Event('input')
          uvuIdInput.dispatchEvent(event)
        }
      })
    }
    catch (err) {
      console.log(err)
    }
  })
}

async function getCourses() {
  let url =
    'https://json-server-e1ccmf--3000.local.webcontainer.io/api/v1/courses'
  try {
    let res = await fetch(url)
    JSONres = await res.json()
    return await JSONres
  } catch (error) {
    console.log(error)
  }
}

async function renderCourseOptions() {
  let courseOptions = await getCourses()
  courseSelect = document.getElementById('course')
  for (let option of courseOptions) {
    let courseOption = document.createElement('option')
    courseOption.value = option.id
    courseOption.innerText = option.display
    courseSelect.append(courseOption)
  }
}

function createUUID() {
  return 'xxxxxxx'.replace(/[xy]/g, function(c) {
     var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
     return v.toString(16)
  })
}

loadPage() //load page once
