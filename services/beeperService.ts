import { Beeper } from "../models/types.js";
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeToJsonFile, writeBeeperToJsonFile,
} from "../dal/access.js";
import bcrypt from "bcrypt";
import { StatusUT } from "../Utils/UtilsStatus.js";
import { uuid } from "uuidv4";

//פונקצייה להוספת ביפר חדש
export const add = async (beeperName: string): Promise<Beeper> => {

  const beepers: Beeper[] = await readFromJsonFile();

  const beeperFind = beepers.find((b) => b.name === beeperName);

  if (beeperFind) {
    throw new Error("Invalid beeper name or beeper Id.");
  }

  const dateNow = Date.now();

  const newBeeper: Beeper = {
    id: uuidv4(),
    name: beeperName,
    status: StatusUT.manufactured,
    created_at: new Date(dateNow),
  };
  beepers.push(newBeeper);

  await writeBeeperToJsonFile(beepers);
  return newBeeper;
};

//פונקצייה לקבל את כל הביפרים
export const getBeeper = async (): Promise<Beeper[] | undefined> => {
  const beepers: Beeper[] = await readFromJsonFile();
  return beepers;
};

//פוקצייה שמחפסת ביפר לפי id
export const getById = async ( Id: string): Promise<Beeper | undefined> => {
  const beepers: Beeper[] = await readFromJsonFile();
  
  console.log(beepers);

  const beeper = beepers.find((b) => b.id === Id);
  console.log("beeper", beeper);

    return beeper;
  
};

//פונקצייה לשינוי סטטוס
export const editBeeper = async ( beeperId: string, beeperLAT: number, beeperLON:number): Promise<Beeper | undefined> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeperFind: Beeper | undefined = beepers.find((b) => b.id === beeperId);
  
    if (!beeperFind) {
      throw new Error("Invalid username or password.");
    }

    if(beeperFind){
        if(beeperFind.status === StatusUT.manufactured){
            beeperFind.status = StatusUT.assembled;
            const index = beepers.findIndex((i) => i.id === beeperFind.id);
            beepers[index] = beeperFind;
            await writeBeeperToJsonFile(beepers);
            return beeperFind
        }
        if(beeperFind.status === StatusUT.assembled){
            beeperFind.status = StatusUT.shipped;
            const index = beepers.findIndex((i) => i.id === beeperFind.id);
            beepers[index] = beeperFind;
            await writeBeeperToJsonFile(beepers);
            return beeperFind
        }
        if(beeperFind.status === StatusUT.shipped){
            beeperFind.status = StatusUT.deployed;
            const index = beepers.findIndex((i) => i.id === beeperFind.id);
            beepers[index] = beeperFind;
            await writeBeeperToJsonFile(beepers);
            return beeperFind
        }
        // if(beeperFind.status === StatusUT.deployed){
        //     beeperFind.latitude = beeperLAT
        //     beeperFind.longitude = beeperLON
        //     const index = beepers.findIndex((i) => i.id === beeperFind.id);
        //     beepers[index] = beeperFind;
        //     await writeBeeperToJsonFile(beepers);
        //     return beeperFind
        //     setTimeout(() => {
        //         timeDetonated()
        //     },10000)
        // }
    }
  };


 //פונקצייה למחיקת ביפר לפי id 
export const deleteBeeperFromDB = async (beeperId: string): Promise<void> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeperFind: Beeper | undefined = beepers.find((b) => b.id === beeperId);

    if (!beeperFind) {
      throw new Error("beeper id not found .");
    } 
    const index = beepers.findIndex((i) => i.id === beeperFind.id);
    beepers.splice(index, 1);
  
    await writeBeeperToJsonFile(beepers);
  };

  //פונקצייה שמעדכנת סטטוס התפוצצות
export const timeDetonated = async (beeperId: string): Promise<Beeper | undefined> => {
    const beepers: Beeper[] = await readFromJsonFile();
    const beeperFind = beepers.find((b) => b.id === beeperId);
    if(beeperFind){
        beeperFind.status = StatusUT.detonated
        const index = beepers.findIndex((i) => i.id === beeperFind.id);
        beepers[index] = beeperFind;
        await writeBeeperToJsonFile(beepers);
        return beeperFind
    }

}