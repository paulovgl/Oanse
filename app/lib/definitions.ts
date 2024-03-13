export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  club: 'tocha' | 'flama' | 'faisca' | 'ursinhos' | 'jv' | 'vq7';
};

export type Child = {
  id: string;
  name: string;
  email: string;
  image_url: string;
};

export type Record = {
  id: string;
  child_id: string;
  atual_club: number;
  date: Date;
  attendant: string;
};

export type LatestInvoice = {
  id: string;
  name: string;
  image_url: string;
  email: string;
  amount: string;
};

export type LatestInvoiceRaw = Omit<LatestInvoice, 'amount'> & {
  amount: number;
};

export type InvoicesTable = {
  id: string;
  customer_id: string;
  name: string;
  email: string;
  image_url: string;
  date: string;
  amount: number;
  status: 'pending' | 'paid';
};

export type ChildrenTableType = {
  id: string;
  name: string;
  birth_date: string;
  affiliation: string;
  fone: string;
  attendant: 'pending' | 'attendant';
};

export type ClubChildrenTableType = {
  id: string;
  name: string;
  birth_date: string;
  affiliation: string;
  fone: string;
  attendant: 'pending' | 'attendant';
  atual_club: 'tocha' | 'flama' | 'faisca' | 'ursinhos' | 'jv' | 'vq7';
};

export type ClubChildrenType = {
  id: string;
  child_id: string;
  talentos: number;
  atual_club: string;
};

export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type ChildField = {
  id: string;
  name: string;
  talentos: number;
  atualClub: string;
  birthDate: string;
};

export type InvoiceForm = {
  id: string;
  customer_id: string;
  amount: number;
  status: 'pending' | 'paid';
};


export type Revenue = {
  month: string;
  revenue: number;
};