import {Request, Response} from 'express';
import {NOT_FOUND, BAD_REQUEST} from 'http-status-codes';
import {Datastore} from './db';

export function getAllParties(req: Request, res: Response): void {
    res.send((<Datastore>req.app.locals).party.find());
}

export function getParty(req: Request, res: Response): void {
    const id = parseInt(req.params.id);
    if (id) {
      const store = <Datastore>req.app.locals;
      const party = store.party.get(id);
      if (party) {
        res.send(party);
      } else {
        res.status(NOT_FOUND).send();
      }
    } else {
      res.status(BAD_REQUEST).send('Parameter id must be a number');
    }
  }