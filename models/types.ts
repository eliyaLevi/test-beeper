 import {StatusUT} from "../Utils/UtilsStatus.js"
 export interface Beeper{
    id?:string,
    name:string,
    status?:StatusUT,
    created_at?:Date,
    detonated_at?:Date,
    latitude?:number,//גובה
    longitude?:number,//רוחב
}