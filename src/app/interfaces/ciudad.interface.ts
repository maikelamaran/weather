export interface Ciudad {
  id: number;
  name: string;
  state: string;
  country: string;
  coord: Coord;
}

export interface Coord {
  lon: number;
  lat: number;
}