export const DATABASE = {
    FILE_NAME: "AppDatabase.db",
};

interface MessageServiceConstantsType {
    signUpUrl: string
    loginUrl: string
    signalRHubUrl:string
}

export const MessageServiceBaseUrl:string = "http://192.168.31.62:8038"

export const MessageServiceConstants: MessageServiceConstantsType = {
    signUpUrl:`${MessageServiceBaseUrl}/api/Auth/SignUp`,
    loginUrl:`${MessageServiceBaseUrl}/api/Auth/Login`,
    signalRHubUrl:`${MessageServiceBaseUrl}/messagehub`
}
