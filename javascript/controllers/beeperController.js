var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { add, getBeeper, getById, editBeeper, deleteBeeperFromDB } from "../services/beeperService.js";
//פונקצייה ליצירת ביפר חדש
export const addBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperName = req.body;
        console.log(beeperName);
        if (!beeperName) {
            res.status(400).json({ error: "Beepername are required." });
            return;
        }
        const beeper = yield add(beeperName);
        console.log(beeper);
        res.status(201).json({ beeper: beeper });
    }
    catch (error) {
        if (error.message === "beepername already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
//פונקצייה לקבלת כל הביפרים
export const getAllBeepers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beepers = yield getBeeper();
        res.status(200).json(beepers);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});
//פונקצייה לקבלת ביפר לפי id
export const getBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        console.log(beeperId);
        const beeper = yield getById(beeperId);
        console.log(beeper);
        res.status(201).json({ beeper: beeper });
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});
export const editBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        const beeperLAT = req.body.latitude;
        const beeperLON = req.body.longitude;
        if (!beeperId) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const beeper = yield editBeeper(beeperId, beeperLAT, beeperLON);
        res.status(201).json({ beeper });
    }
    catch (error) {
        if (error.message === "beeperId already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const deleteBeeperById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const beeperId = req.params.id;
        if (!beeperId) {
            res.status(400).json({ error: "beeper id are required." });
            return;
        }
        yield deleteBeeperFromDB(beeperId);
        res.status(200).json({ success: "Internal server success." });
    }
    catch (error) {
        if (error.message === "beeper id already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
