import { ROLES } from "@/utils/constant";

export type IROLE = (typeof ROLES)[number];

export type IContextUser = {
  id: number;
  name: string;
  email: string;
  role: IROLE;
};

export type IContext = {
  user: IContextUser | null;
  initializeAuth: () => void;
  logout: () => void;
  requireAuth: () => void;
  handleBidAuthModal: (id: number) => void;
  bidCaseId: number | null;
};

export type BaseEntity = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type ICase = {
  title: string;
  description: string;
  expertise_required: String[];
  case_category: string;
  urgency: string;
  budget_type: string;
  budget_amount: number;
  location: string;
  status: string;
} & BaseEntity;

export type IUser = {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  specialization?: string[];
  experience?: number;
} & BaseEntity;

export type IBid = {
  description: string;
  bid_status: string;
  client_id: number;
  lawyer_is: number;
} & BaseEntity;

export type IApiBaseResponse = {
  message: string;
  status: boolean;
};
