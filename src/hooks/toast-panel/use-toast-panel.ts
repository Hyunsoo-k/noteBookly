import { create } from "zustand";

interface ToastPanelStore {
  message: string | null;
  isToastPanelActive: boolean;
  toggleToastPanelActive: (message: string) => any;
  resetToastPanelStore: () => any;
};

const useToastPanel = create<ToastPanelStore>((set) => ({
  message: null,
  isToastPanelActive: false,
  toggleToastPanelActive: (message: string) =>
    set((state) => ({
      message,
      isToastPanelActive: !state.isToastPanelActive,
    })),
  resetToastPanelStore: () => set({
    message: null,
    isToastPanelActive: false
  })
}));

export default useToastPanel;