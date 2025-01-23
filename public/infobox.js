// Get attributes from the current script tag
var infoboxTransitionTime = document.currentScript.getAttribute('infoboxTransitionTime')
var msg = document.currentScript.getAttribute('msg')
var infoboxEnabled = document.currentScript.getAttribute('infoboxEnabled')

// Check if the infobox is enabled
if (!!infoboxEnabled) ifEnabled()

function ifEnabled() {
    // Get the infobox element and set its transition time
    var infobox = document.getElementById('infobox')
    infobox.style.setProperty('--transition-time', infoboxTransitionTime)

    // Get the inner content of the infobox
    var inner = infobox.querySelector('.infobox-inner')
    
    // Set the dimensions of the infobox
    setDim()
    function setDim() {
        infobox.style.setProperty('--h', `${infobox.clientHeight}px`)
        infobox.style.setProperty('--w', `${infobox.clientWidth}px`)
    }
    
    // Retrieve the previous message from local storage
    var prevMsg = localStorage.getItem('infoboxMsgHTML')
    if (prevMsg === null) {
        localStorage.setItem('infoboxMsgHTML', '')
        prevMsg = ''
    }
    
    // Check if the infobox has been loaded before or if the message has changed
    var loadedInfobox = localStorage.getItem('loadedInfobox')
    if (loadedInfobox === null || msg !== prevMsg) {
        localStorage.setItem('loadedInfobox', false)
        loadedInfobox = 'false'
    }
    
    // If the infobox has not been loaded, set its content and show it
    if (loadedInfobox === 'false') {
        setTimeout(function() {
            inner.innerHTML = msg
            showInfobox()
            setDim()
    
            localStorage.setItem('loadedInfobox', true)
            localStorage.setItem('infoboxMsgHTML', msg)
        }, 1000)
    }
}

// Show the infobox
function showInfobox() {
    infobox.show()
    infobox.style.opacity = 1
}

// Close the infobox with a transition
function closeInfobox() {
    infobox.style.opacity = 0
    var tTime = infoboxTransitionTime
    var valLen = 1
    var multAmt = 1
    if (tTime.endsWith('ms')) valLen++
    else multAmt = 1000
    tTime = parseFloat(tTime.substring(0, tTime.length-valLen))
    setTimeout(function() {
        infobox.close()
    }, tTime*multAmt)
}