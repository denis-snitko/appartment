export interface Data {
  id: string;
  billUrl: string;
  comment?: string;
  date: string;
  paid: number;
}

export interface ListingProps {
  data: Data[];
}

export interface ListingRowProps {
  item: Data;
  index: number;
}

export interface AddBillModalProps {
  pathname: string;
}

export interface Link {
  id: number;
  label: string;
  path: string;
}

export interface MenuProps {
  links: Link[];
}

export interface HeaderProps {
  links: Link[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  pathname: string;
  logoutHandler: () => void;
}

export type Status = 'loading' | 'success' | 'error';
