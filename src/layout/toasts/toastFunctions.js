import {palette} from "theme/Theme.jsx";


export const TOAST_CONTAINER_ID = "TOAST_CONTAINER_ID"
export const TOAST_TEXT_ID = "TOAST_TEXT_ID"
function setToast (attr, text) {
    const container  = document?.getElementById(TOAST_CONTAINER_ID)
    if (!container) return

    const colors = {
        error: "#c00000",
        success: "#259300",
        info: palette.accent,
    }

    if(document.getElementById(TOAST_TEXT_ID)) document.getElementById(TOAST_TEXT_ID).innerHTML= text
    container.style.display = "block"
    container.style.borderColor = colors[attr]
    container.style.animation = `toast_base 0.5s`
    const date= new Date().toISOString()
    container.setAttribute("del_id", date)
    container.setAttribute("status", attr)

    setTimeout(()=>{
        if (container.getAttribute("del_id")===date)
            container.style.animation = `toast_base_alt 0.5s`
    }, 2600)

    setTimeout(()=>{
        if (container.getAttribute("del_id")===date)
            container.style.display = "none"
    }, 3000)
}
export function toastError (text) {
    setToast("error", text)
}

export function toastSuccess (text) {
    setToast("success", text)
}

export function toastInfo (text) {
    setToast("info", text)
}


