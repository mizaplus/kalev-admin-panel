import { createSlice } from "@reduxjs/toolkit";

export type ContactHero = {
  title: string;
  image: string;
  tagline: string;
  key: {
    SK: string;
    PK: string;
  };
};

export type ContactAddress = {
  poBox: string;
  country: string;
  city: string;
  street: string;
  organization: string;
};

export type ContactSocialMedia = {
  twitter: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
};

export type ContactSection = {
  description: string;
  address: ContactAddress;
  title: string;
  socialMedia: ContactSocialMedia;
  phone: string;
  email: string;
  key: {
    SK: string;
    PK: string;
  };
};

export type ContactPageData = {
  hero: ContactHero;
  contact: ContactSection;
};

interface ContactState {
  data: ContactPageData | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = {
  data: null,
  loading: false,
  error: null,
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    setContactData(state, action) {
      state.data = action.payload;
      state.loading = false;
      state.error = null;
    },
    setContactLoading(state, action) {
      state.loading = action.payload;
    },
    setContactError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    clearContact(state) {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setContactData,
  setContactLoading,
  setContactError,
  clearContact,
} = contactSlice.actions;

export default contactSlice.reducer;
