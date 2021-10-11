function validateEmail(text:string) 
{
    let exp = /^([a-zA-Z0-9_\-.]+)@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.)|(([a-zA-Z0-9-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/
    return exp.test(text)
}

function validatePassword(text:string)
{
    return text.length >= 6
}

function formatDate(strDate:string)
{
    var current =  new Date()
    var old = Date.parse(strDate)
    var diff = current.getTime() - old

    var daysMs = 1000*60*60*24
    var hoursMs = 1000*60*60
    var minutesMs = 1000*60*60
    
    var days = diff/daysMs
    days = days - days%1
    diff %= daysMs

    var hours = diff/hoursMs
    hours = hours - hours%1
    diff %= hoursMs

    var minutes = diff/minutesMs
    minutes = minutes - minutes%1

    if(days > 7)
    {
        var date = new Date(old)
        return `${convert2TwoDigitsNumber(date.getDay())}/${convert2TwoDigitsNumber(date.getMonth())}/${date.getFullYear()}`
    }
    else if( days > 0)
    {
        var weeks:any = {1: "Monday", 2:"Tuesday", 3: "Wednesday", 4:"Thursday", 5: "Friday", 6:"Saturday", 7:"Sunday"}
        var _diff = current.getDay() - days
        _diff = (_diff <= 0)?7 + _diff:_diff
        return `${weeks[_diff]}`
    }
    else
        return `${convert2TwoDigitsNumber(hours)}h${convert2TwoDigitsNumber(minutes)}`
}


function convert2TwoDigitsNumber(value:number):string
{
    return `${(value<10)?"0":""}${value}`
}

/**
 * return the seonds formated in time hh:mm:ss
 * @param seconds  the number of Seconds
 * @returns 
 */
function seconds2Time(seconds:number)
{
    var hours = seconds / 3600
    hours -= hours%1

    seconds -= hours * 3600
    
    var minutes = seconds / 60
    minutes -= minutes%1

    seconds -= minutes * 60
    return `${convert2TwoDigitsNumber(hours)}:${convert2TwoDigitsNumber(minutes)}:${convert2TwoDigitsNumber(seconds)}`
}

function getMediaType(text:string)
{
    var videoExtension = [
        "mp4", "mov", "wmv", "avi",
        "avi", "avchd", "flv", "f4v",
        "swf", "mkv", "webm", "mpeg",
        "amv", "3gp", "3gp", "html5"
        ]

    var audioExtension = [
        "mp3", "ogg", "wav", 
    ]

    var imageExtension = [
        "bmp", "gif", "jpg", "jpeg",
        "png", "tif", "tiff", "raw",
        "eps", "cr2", "nef", "orf",
        "sr2"
    ]

    var docExtension = [
        "txt", "pdf", "doc","docx",
        "ppt", "pptx", "xls", "csv"
    ]

    var lastDotPosition = text.lastIndexOf('.')
    var ext = ""//text
    if(lastDotPosition > -1)
    {
        ext = text.substring(lastDotPosition + 1)
        if(videoExtension.includes(ext))
            return `video/${ext}`
        else if (audioExtension.includes(ext))
            return `audio/${ext}`
        else if(imageExtension.includes(ext))
            return `image/${ext}`
        else if (docExtension.includes(ext))
            return `application/${ext}`
    }
    return `unknow/${ext}`
}

function getFileSize(size:number)
{
    var oneKiloOctects = 1024 
    var onMegaOctects = 1024 * 1024

    var megaOctects = Math.floor(size / onMegaOctects)
    return ((megaOctects>0)?(`${Math.round(megaOctects * 10)/10}MO`):(`${Math.ceil(size / oneKiloOctects)}KO`))
}

function validateNumber(text:string) 
{
    let exp = /^((00)|(\+\d+))?(\d{6,})$/
    return exp.test(text)
}

/**
 * 
 * @param url the url
 * @param type the type of query POST, GET, PUT, DELETE
 * @param data Key value object
 * @param successFunction Success function
 * @param errorFunction Error function
 */
 function requestWithBody(url:string, type:string, data:Object, token:string, successFunction:Function, errorFunction:Function)
 {    
     fetch(url, {
         "method": type,
         "headers": {
             "content-type": "application/json",
             "accept": "application/json",
             "Authorization": `Bearer ${token}`
         },
         "body": JSON.stringify(data)
         }).then(response => response.json())
         .then(
             (result) => {
                successFunction(result)
             },
             (error) => {
                errorFunction(error)
             }
         );
 }

 
/**
 * 
 * @param url the endpoint where to send data
 * @param type the type of query GET, DELETE
 * @param successFunction Success function
 * @param errorFunction Error function
 */
 function requestWithoutBody(url:string, type:string, token:string, successFunction:Function, errorFunction:Function)
 {    
     fetch(url, {
         "method": type,
         "headers": {
             "content-type": "application/json",
             "accept": "application/json",
             "Authorization": `Bearer ${token}`
         },
         }).then(response => response.json())
         .then(
             (result) => {
                successFunction(result)
             },
             (error) => {
                errorFunction(error)
             }
    );
 }

 function getMessageTime(datetime:string) {
    let time = datetime.split("T")[1].split('+')[0]
    let to = time.lastIndexOf(":")
    return time.substring(0, to);
}


export {validateEmail, validateNumber, validatePassword, getMediaType, getFileSize, requestWithBody, requestWithoutBody, formatDate, getMessageTime, convert2TwoDigitsNumber, seconds2Time}