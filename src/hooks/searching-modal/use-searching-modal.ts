import { create } from "zustand";

interface SearchingModalStore {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const useSearchingModal = create<SearchingModalStore>((set) => ({
  isOpen: false,
  setIsOpen: (value: boolean) => set(() => ({ isOpen: value })),
}));

export default useSearchingModal;
