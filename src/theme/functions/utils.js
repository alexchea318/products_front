export function parseToQuery(obj){
    //console.log(obj)
    if (!obj) return ""
    if (!Object.keys(obj).length) return ""

    let query= ""
    Object.entries(obj).map(([key, value])=> query+=`&${key}=${value}`)

    return query.replace("&", "?").replaceAll("+", "%2B").replaceAll(" ", "%20")
}

export const toTop = () => window.scrollTo({top: 0, left: 0, behavior: 'smooth'})

export function unique (el) {
    if (typeof (el) === "string") return el
    if (el?.id) return el?.id
    try {
        return JSON.stringify(el)
    }
    catch (e) {
        return el?.id ?? ""
    }
}