import { Request, Response } from 'express';
import { NOT_FOUND, BAD_REQUEST } from 'http-status-codes';
import { Datastore } from './db';
import { Collection } from 'lokijs';
import { IGuest } from './model';
import { isUndefined } from 'util';

export function getAllGuests(req: Request, res: Response): void {
  res.send((<Datastore>req.app.locals).guest.find());
}

export function getGuestsByParty(req: Request, res: Response): void {
  const guests: IGuest[] & LokiObj[] = (<Datastore>req.app.locals).guest.find();
  let out: IGuest[] = [];
  guests.forEach(element => {
    element.partyIds.forEach(partyId => {
      if (partyId === parseInt(req.params.id)) {
        out.push(element);
      }
    });
  });
  res.send(out);
}

export function getGuest(req: Request, res: Response): void {
  const id = parseInt(req.params.id);
  if (id) {
    const store = <Datastore>req.app.locals;
    const guest = store.guest.get(id);
    if (guest) {
      res.send(guest);
    } else {
      res.status(NOT_FOUND).send();
    }
  } else {
    res.status(BAD_REQUEST).send('Parameter id must be a number');
  }
}