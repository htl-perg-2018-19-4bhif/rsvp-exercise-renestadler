import { CREATED, BAD_REQUEST, UNAUTHORIZED } from 'http-status-codes';
import { Request, Response } from 'express';
import { Datastore } from './db';
import { IGuest } from './model';

export function postGuest(req: Request, res: Response): void {
  console.log(req.body);
  if (!req.body.firstName || !req.body.lastName ||
    !req.body.partyIds) {
    res.status(BAD_REQUEST).send('Missing mandatory member(s)');
  } else {
    let error: boolean = false;
    const store = <Datastore>req.app.locals;
    for (let i = 0; i < req.body.partyIds.length; i++) {
      if (store.party.get(req.body.partyIds[i]) === null) {
        res.status(UNAUTHORIZED).send('Party ' + req.body.partyIds[i] + ' you want access is not found');
        return;
      }
      else if (store.party.get(req.body.partyIds[i]).numGuests >= 10) {
        res.status(UNAUTHORIZED).send('Party ' + req.body.partyIds[i] + ' is full');
        return;
      }else{
        let party=store.party.get(req.body.partyIds[i]);
        party.numGuests+=1;
        store.party.update(party);
      }
    }
    const newGuest: IGuest = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      partyIds: req.body.partyIds
    };
    store.guest.insert(newGuest);
    res.status(CREATED).header({ Location: `${req.path}/${req.body.id}` }).send(newGuest);
  }
}