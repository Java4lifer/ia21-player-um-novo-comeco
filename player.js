const containers = document.querySelectorAll("div.ia21-play")
// for(let i = 0; i <= containers; i++) {
//     console.log(containers[1])
// } <-- performace

containers.forEach(async el => {
const playPause = el.querySelector("button.play-pause")
const video = el.querySelector("video")
const timeline = el.querySelector(".dragbar.timeline")
const timelinedrag = el.querySelector(".draggable")
const timer = el.querySelector(".timer")
const dragbars = container.querySelectorAll(".dragbar")
const playlist = document.querySelector(".playlist")
//--------------------------------------------------------------------
const req = await fetch("el.dataset.playlist")
const json = await req.json()

json.forEach(film => {
    playlist.innerHTML += `<div>${film.title}</div>`
    // <div class = "thumb">
    //     <img src="${film.thumb}">
    // </div>
})
//--------------------------------------------------------------------
playPause.addEventListener("click", () => {
    if(video.pause) {
        video.play()
        playPause.innerText = "▐▐"
        return
    }

    video.pause()
    playPause.innerText = "▶"
})

video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100
    
    const timersec = Math.floor(video.currentTime)
    const timermin = Math.floor(timersec/60)
    const timerhor = Math.floor(timermin/60)
    const timerhors = `${timerhor % 60}`.padStart(2,"0")
    const timermins = `${timermin % 60}`.padStart(2,"0")
    const timersecs = `${timersec % 60}`.padStart(2,"0")
    
    timelinedrag.style.setProperty("--percent", `${percent}%`)
    if(timerhor > 0) timer.innerHTML = `${timerhors}:${timermins}:${timersecs}`
    else timer.innerHTML = `${timermins}:${timersecs}`
})

dragbars.forEach(dragbar => {
    const dragabble = dragbar.querySelector(".draggable")

    if(dragbar.classList.contains("volume")) {
        dragabble.style.setProperty("--percent", `100%`)
    }

    dragbar.addEventListener("mousedown", ev => {
        dragbar.classList.add("dragging")
    })
    dragbar.addEventListener("mouseup", ev => {
        dragbar.classList.remove("dragging")
    })
    dragbar.addEventListener("mouseout", ev => {
        dragbar.classList.remove("dragging")
    })

    dragbar.addEventListener("mousemove", ev => {
        if(ev.target != dragbar || !dragbar.classList.contains("dragging")) return
        
        const width = Math.floor(dragbar.getBoundingClientRect().width)
        const index = (ev.offsetX / width)
        const percent = index * 100
        
        dragabble.style.setProperty('--percent', `${percent}%`)
    })

    dragbar.addEventListener("mouseup", ev => {
        if(ev.target  != dragbar) return

        const width = Math.floor(dragbar.getBoundingClientRect().width)
        const index = (ev.offsetX / width)
        const percent = index * 100

        dragabble.style.setProperty('--percent', `${percent}%`)
        
        if(dragbar.classList.contains("timeline")) {
            video.currentTime = video.duration * index
            return
        }
        if(dragbar.classList.contains("volume")) {
            video.volume = index
            console.log("Rules of nature")
            return
        }
        })
    })
}) // <-- funcional