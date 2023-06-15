function storageSet(name, item) {
    localStorage.setItem(`${name}`, JSON.stringify(item))
}

function storageGet(name) {
     return JSON.parse(localStorage.getItem(`${name}`))
}

function storageDelete(name) {
    localStorage.removeItem(`${name}`)
}

export {storageSet, storageGet, storageDelete}