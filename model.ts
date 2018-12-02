export interface IParty {
  motto: string;
  location: string;
  date: string;
  time: string;
  numGuests: number;
}

export interface IGuest {
  firstName: string;
  lastName: string;
  partyIds: number[];
}

