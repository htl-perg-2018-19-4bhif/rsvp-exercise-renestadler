import { CREATED, BAD_REQUEST } from 'http-status-codes';
import { Request, Response } from 'express';
import { Datastore } from './db';
import { IParty } from './model';

export function postParty(req: Request, res: Response): void {
  if (!req.body.motto || !req.body.location ||
    !req.body.date || !req.body.time) {
    res.status(BAD_REQUEST).send('Missing mandatory member(s)');
  } else {
    const store = <Datastore>req.app.locals;
    const newParty: IParty = {
      motto: req.body.motto,
      location: req.body.location,
      date: req.body.date, time: req.body.time,
      numGuests: 0
    };
    store.party.insert(newParty);
    res.status(CREATED).header({ Location: `${req.path}/${req.body.id}` }).send(newParty);
  }
}