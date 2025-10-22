import { NextFunction, Request, Response } from 'express';
import { ShipmentModel } from '../../models/proscai/Shipments';

export class ShipmentController {

  static getAll = async ( req: Request, res: Response, next: NextFunction ) => {
    const shipments = await ShipmentModel.find( {} );

    return res.json( { shipments } );
  };
}