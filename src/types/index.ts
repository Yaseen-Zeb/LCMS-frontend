import { ROLES } from "@/utils/constant";

export type IROLE = (typeof ROLES)[number];

export type IContextUser = {
  id: number;
  name: string;
  email: string;
  profile_picture: string;
  role: IROLE;
};

export type IContext = {
  loading: boolean;
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
  expertise_required: string[];
  case_category: string;
  urgency: string;
  budget_type: string;
  budget_amount: number;
  total_bids: number;
  location: string;
  client_id: number;
  status: string;
} & BaseEntity;

export type IFeedback = {
  name: string;
  email: string;
  message: string;
} & BaseEntity;

export type IUser = {
  name: string;
  email: string;
  phone_number: string;
  address: string;
  specialization?: string[];
  experience?: number;
  profile_picture: string;
  certificate?: string;
  bio?: string;
  gender?: string;
  website_or_social?: string;
  cnic: string;
  city?: string;
  profession: string;
  languages_spoken: string;
  status: boolean;
  last_seen: string;
  is_online: boolean;
} & BaseEntity;

export type IBid = {
  description: string;
  bid_status: string;
  lawyer_id: number;
  case_id: number;
  case: ICase;
  lawyer: IUser;
} & BaseEntity;

export type IMessage = {
  senderId: number;
  receiverId: number;
  message: string;
  seen: boolean;
} & BaseEntity;

export type IReview = {
  client_id: number;
  lawyer_id: number;
  message: string;
  rating: number;
  client: {
    id: number;
    name: string;
    profile_picture: string;
  };
} & BaseEntity;

export type IApiBaseResponse = {
  message: string;
  status: boolean;
};
