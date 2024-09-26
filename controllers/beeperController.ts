import { Request, Response } from 'express';
import { Beeper } from '../models/types.js'
import {  add , getBeeper, getById, editBeeper, deleteBeeperFromDB} from "../services/beeperService.js";

//פונקצייה ליצירת ביפר חדש
export const addBeeper = async (req: Request, res: Response): Promise<void> => {
    try {
      const beeperName: string = req.body;
        console.log(beeperName);
  
      if (!beeperName ) {
        res.status(400).json({ error: "Beepername are required." });
        return;
      }
  
      const beeper: Beeper = await add(beeperName);
      console.log(beeper);
      
      res.status(201).json({ beeper:beeper } );
    } catch (error: any) {
      if (error.message === "beepername already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };

//פונקצייה לקבלת כל הביפרים
  export const getAllBeepers = async (req: Request, res: Response): Promise<void> => {
    try {
      const beepers = await getBeeper();
      res.status(200).json(beepers);
    } catch (error: any) {
       res.status(500).json({ error: "Internal server error." });
      }    
  };

  
//פונקצייה לקבלת ביפר לפי id
export const getBeeperById = async (req: Request, res: Response): Promise<void> => {
    try {
        const beeperId: string = req.params.id;
        console.log(beeperId);
        
      const beeper = await getById(beeperId);
      console.log(beeper);
      
      res.status(201).json({ beeper:beeper } );
    } catch (error: any) {
       res.status(500).json({ error: "Internal server error." });
      }    
  };


  export const editBeeperById = async (req: Request, res: Response): Promise<void> => {
    try {
      const beeperId: string = req.params.id;
      const beeperLAT: number = req.body.latitude
      const beeperLON: number = req.body.longitude
  
      if (!beeperId ) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const beeper = await editBeeper(beeperId, beeperLAT, beeperLON);
      res.status(201).json({ beeper} );
    } catch (error: any) {
      if (error.message === "beeperId already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };


  export const deleteBeeperById = async (req: Request, res: Response): Promise<void> => {
    try {
      const beeperId: string = req.params.id;
  
      if (!beeperId) {
        res.status(400).json({ error: "beeper id are required." });
        return;
      }
      await deleteBeeperFromDB(beeperId);
      res.status(200).json({ success: "Internal server success." });
    } catch (error: any) {
      if (error.message === "beeper id already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };
  