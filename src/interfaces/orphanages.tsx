export interface Orphanage {
  _id?: any;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  pictures: Array<{
    _id: any;
    destination: string;
    filename: string;
  }>;
}

export interface OrphanageParams {
  _id: any;
}

export type OrphanageProps = {
  orphanage: Orphanage;
};

export type OrphanagesWorldProps = {
  orphanages: Orphanage[];
};
