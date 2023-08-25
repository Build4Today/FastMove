export interface House {
  id: number;
  title: string;
  description: string;
  category: string;
  address: string;
  image?: string;
  price: number;
  bedroom: number;
  bathroom: number;
  car: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface CreateHousePayload {
  title: string;
  description: string;
  category: string;
  address: string;
  image?: string;
  price: number;
  bedroom: number;
  bathroom: number;
  car: number;
}

export interface UpdateHousePayload {
  id: number;
  house: {
    title: string;
    description: string;
    category: string;
    address: string;
    image?: string;
    price: number;
    bedroom: number;
    bathroom: number;
    car: number;
  };
}

export interface HouseSearch {
  search: string;
  category: string;
}

export interface HouseQuery {
  house: ArrayLike<House>;
  isLoading: boolean;
  isFetching: boolean;
}

export enum HouseListingForm {
  DEFAULT_CATEGORY = "category",
}
