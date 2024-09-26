var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeBeeperToJsonFile, } from "../dal/access.js";
import { StatusUT } from "../Utils/UtilsStatus.js";
//פונקצייה להוספת ביפר חדש
export const add = (beeperName) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((b) => b.name === beeperName);
    if (beeperFind) {
        throw new Error("Invalid beeper name or beeper Id.");
    }
    const dateNow = Date.now();
    const newBeeper = {
        id: uuidv4(),
        name: beeperName,
        status: StatusUT.manufactured,
        created_at: new Date(dateNow),
    };
    beepers.push(newBeeper);
    yield writeBeeperToJsonFile(beepers);
    return newBeeper;
});
//פונקצייה לקבל את כל הביפרים
export const getBeeper = () => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    return beepers;
});
//פוקצייה שמחפסת ביפר לפי id
export const getById = (Id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    console.log(beepers);
    const beeper = beepers.find((b) => b.id === Id);
    console.log("beeper", beeper);
    return beeper;
});
//פונקצייה לשינוי סטטוס
export const editBeeper = (beeperId, beeperLAT, beeperLON) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((b) => b.id === beeperId);
    if (!beeperFind) {
        throw new Error("Invalid username or password.");
    }
    if (beeperFind) {
        if (beeperFind.status === StatusUT.manufactured) {
            beeperFind.status = StatusUT.assembled;
            const index = beepers.findIndex((i) => i.id === beeperFind.id);
            beepers[index] = beeperFind;
            yield writeBeeperToJsonFile(beepers);
            return beeperFind;
        }
        if (beeperFind.status === StatusUT.assembled) {
            beeperFind.status = StatusUT.shipped;
            const index = beepers.findIndex((i) => i.id === beeperFind.id);
            beepers[index] = beeperFind;
            yield writeBeeperToJsonFile(beepers);
            return beeperFind;
        }
        if (beeperFind.status === StatusUT.shipped) {
            beeperFind.status = StatusUT.deployed;
            const index = beepers.findIndex((i) => i.id === beeperFind.id);
            beepers[index] = beeperFind;
            yield writeBeeperToJsonFile(beepers);
            return beeperFind;
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
});
//פונקצייה למחיקת ביפר לפי id 
export const deleteBeeperFromDB = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((b) => b.id === beeperId);
    if (!beeperFind) {
        throw new Error("beeper id not found .");
    }
    const index = beepers.findIndex((i) => i.id === beeperFind.id);
    beepers.splice(index, 1);
    yield writeBeeperToJsonFile(beepers);
});
//פונקצייה שמעדכנת סטטוס התפוצצות
export const timeDetonated = (beeperId) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield readFromJsonFile();
    const beeperFind = beepers.find((b) => b.id === beeperId);
    if (beeperFind) {
        beeperFind.status = StatusUT.detonated;
        const index = beepers.findIndex((i) => i.id === beeperFind.id);
        beepers[index] = beeperFind;
        yield writeBeeperToJsonFile(beepers);
        return beeperFind;
    }
});
