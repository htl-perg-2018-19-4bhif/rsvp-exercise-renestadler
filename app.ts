import * as express from 'express';
import * as cors from 'cors';

import {getParty, getAllParties} from './get-party';
import {getAllGuests, getGuest, getGuestsByParty } from './get-guest';
import {postGuest} from './post-guest';
import {postParty} from './post-party';
import {init} from './db';
import expressBasicAuth = require('express-basic-auth');

let auth=expressBasicAuth({users: { admin: 'admin' }});
const app = express();
  
app.use(cors());
app.use(express.json());
app.locals = init();
// Add routes
app.get('/party/:id', getParty);
app.get('/party', getAllParties);
app.get('/guest/:id',auth, getGuest);
app.get('/guest',auth, getAllGuests);
app.get('/guest/party/:id',auth, getGuestsByParty);
app.post('/party', postParty);
app.post('/register', postGuest);

app.listen(8080, () => console.log('API is listening on port 8080'));