
export const getExtension = url => url.replace(/\?v\=.+$/, '').split('.').pop().toLowerCase()