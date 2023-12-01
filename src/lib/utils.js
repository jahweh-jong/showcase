import { PUBLIC_POCKETBASE_URL } from '$env/static/public' 

export const serializeNonPOJOs = (obj) => {
    return structuredClone(obj)
}

export const generateUsername = (name) => {
    const id = Math.floor(Math.random() * 10000)
    return `${name.slice(0, 5)}${id}`
}

export const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
    return `${PUBLIC_POCKETBASE_URL}api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`
}