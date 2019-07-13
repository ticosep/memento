export function getContentType (str) {
    
    let tipo;

    // Regex to find what is the content to be showed
    const regex = /image|video?/gi;
    const [match] = str.match(regex)

    if(match === 'image'){
        tipo = 'img'

    }

    if(match === 'video'){
        tipo = 'video'
    }

    return tipo;
}