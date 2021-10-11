interface Credential {
    email: null|string,
    phoneNumber : null|string,
    password: string,
    remenberMe?:boolean
}

interface ConversationDTO {
    image?:string,
    category?: string,
    name: string,
    datetime?: string,
    unreads?: 0,
    message?: string,
    state?: string,
    identity: string,
    id: string|number
}

interface UserProfile {
    id?: string|number|null 
    identity:string
    name: string,
    category?:string|null,
    about?:string|null
    image?: string|Blob|null
}

interface FileDTO {
    "id"?: number,
    "name": string,
    "size": number,
    "src"?: any
    "purpose"?: number,
    "dateUploaded"?: string,
    "dateDeleted"?: string
}  


// "dateUploaded": "2021-10-05T22:22:35.093Z",
// "dateDeleted": "2021-10-05T22:22:35.093Z"

interface MessageDTO {
    identity:string,//can be email or id as number
    userId?:string|number,//The user Id
    messageId?:string|number,
    file?:FileDTO|null|string,
    name?:string,
    message:string,
    isRead:boolean,
    isSend:boolean,
    isReceive:boolean,
    isTagget?:boolean,
    isTransfered?:boolean,
    taggedMessage?:"",
    isIncomingMessage: boolean,
    dateTime:string,
    category:string
}

export type {Credential, UserProfile, MessageDTO, ConversationDTO, FileDTO}