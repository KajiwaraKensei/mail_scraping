export const getTimeStamp = () => {    
    return new Date().toLocaleDateString().replaceAll("/", "")
}