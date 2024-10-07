/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

(async () => {

    // Run a function that gets data from main.js
    console.log(await window.exposed.getStuffFromMain())
    
    // Run a function sends data to main.js
    await window.exposed.sendStuffToMain('Stuff from renderer')
    
    document.querySelector('#btn-send').addEventListener('click', async () => {
        const msg = document.querySelector('#msg').value

        const resp = await window.exposed.userMessage(msg)

        console.log(resp)

        document.querySelector('#response').innerText = resp
    })

})()




