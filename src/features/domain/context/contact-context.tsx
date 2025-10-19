// Hooks

import { createContext, useContext, useEffect } from "react";
import type { ContactPageData } from "@/store/contact/slice";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { fetchContactData } from "@/store/contact/actions";

interface ContactContextProps {
  data: ContactPageData | null;
  loading: boolean;
  reload: () => Promise<void>;
}

export const ContactContext = createContext<ContactContextProps>({
  data: null,
  loading: false,
  reload: async () => {},
});

export const useContactContext = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContactContext must be used within a ContactProvider");
  }
  return context;
};

const ContactProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.contact.data);
  const loading = useAppSelector((state) => state.contact.loading);

  const reload = async () => {
    await dispatch(fetchContactData());
  };

  useEffect(() => {
    dispatch(fetchContactData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ContactContext.Provider value={{ data, loading, reload }}>
      {children}
    </ContactContext.Provider>
  );
};

export default ContactProvider;
