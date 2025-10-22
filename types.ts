export interface TimelineEvent {
  id: number;
  year: string;
  description: string;
  imageUrl: string;
}

export interface BandMember {
  id: number;
  name: string;
  role: string;
  photoUrl: string;
  instagram: string;
}

export interface TourLocation {
  id: number;
  city: string;
  state: string;
  local: string;
  date: string;
  description: string;
  latitude: number;
  longitude: number;
}

export interface Message {
  sender: 'user' | 'ai';
  text: string;
}

// FIX: Added EditableItem type definition, as it was missing from the project and causing an import error.
export type EditableItem =
  | { type: 'timeline'; data: TimelineEvent }
  | { type: 'member'; data: BandMember }
  | { type: 'location'; data: TourLocation };
