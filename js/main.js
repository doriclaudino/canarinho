fetch('https://us-central1-zapbot-6df14.cloudfunctions.net/publicChatData').then(async res => {
    try {
        let json = await res.json()
        let states = json && Object.keys(json)
        let container = document.getElementById("chats_loaded_container");
        let createSeparator = () => {
            let separator = document.createElement('li')
            let hr = document.createElement('hr')
            separator.appendChild(hr)
            return separator
        }
        //<li class="mdl-list__item">
        for (let index = 0; index < states.length; index++) {
            const stateName = states[index];
            const defaultImage = `../images/default_chat_image.png`
            const {
                image,
                link,
                name
            } = json[stateName]
            let innerHTML = `
              <span class="mdl-list__item-primary-content">
                <img class="mdl-list__item-avatar mdl-list__item-avatar material-icons"
                  src="${image}"
                  onerror="this.onerror=null; this.src='${defaultImage}'"
                  alt="${name}_imagem">
                <a href="${link}" target="_blank" class="mdl-badge mdl-typography--text-capitalize">
                  ${name}</a>
              </span>
              <span class="mdl-list__item-secondary-action mdl-cell--hide-phone">
                  <div class="mdl-card__actions">
                    <a class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--primary" href="${link}" target="_blank">Abrir</a>
                  </div>
              </span>`



            let listItem = document.createElement('li')
            listItem.setAttribute('class', "mdl-list__item")
            listItem.innerHTML = innerHTML
            container.appendChild(listItem)

            //only append between items
            if (states.length > 0 && index !== states.length - 1)
                container.appendChild(createSeparator())
        }

        if (states.length) {
            let loadingElement = document.getElementById('loading_chats')
            loadingElement.parentNode.removeChild(loadingElement)
            document.getElementById("chats_loaded").style.display = "";
        }

        console.log(json)
    } catch (error) {
        console.log(error)
    }
})

let setRandomNumber = () => {
    let id = "random_number_between_min_max"
    let max = 11450
    setTimeout(() => {
        document.getElementById(id).textContent = Math.round(Math.random() * (max - max - 1000) +
            max);
    }, 100);
}
document.onloadend = setRandomNumber()