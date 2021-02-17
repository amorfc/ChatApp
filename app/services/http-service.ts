import axios from "axios";

export const makePost = (
    endpoint: string,
    config: any,
    data: any
): Promise<any> => {
    return new Promise(async(resolve, reject) => {
        try{
            const reqResponse = await axios.post(endpoint,data,config)
            resolve(reqResponse)
        }catch (e){
            reject(e)
        }
    })
}
