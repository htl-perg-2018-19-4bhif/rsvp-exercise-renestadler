import * as loki from 'lokijs';
import { IParty, IGuest } from './model';

export class Datastore {
    constructor(public db: loki, public party: loki.Collection<IParty>, public guest: loki.Collection<IGuest>) { }
}

export function init(): Datastore {
    const db = new loki(__dirname+'/data.json', { autoload: true, autosave: true});
    let party: loki.Collection<IParty> = db.getCollection('party');
    if (!party) {
        party = db.addCollection('party');
    }
    let guest: loki.Collection<IGuest> = db.getCollection('guest');
    if (!guest) {
        guest = db.addCollection('guest');
    }

    return new Datastore(db, party, guest);
}