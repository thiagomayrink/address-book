import TranslatedRows from "@/components/interfaces/TranslatedRows";
import create from "zustand";

interface RowsState {
  zusRows: TranslatedRows[];
  removeRow: (email: string) => void;
  updateRows: (rows: TranslatedRows[]) => void;
}

export const useStore = create<RowsState>((set) => ({
  zusRows: [],
  removeRow: (email: string) => {
    set((state) => ({
      zusRows: state.zusRows.filter((row) => row["E-mail"] !== email),
    }));
  },
  //not working!
  updateRows: (rows: TranslatedRows[]) => set(() => ({ zusRows: rows }), true),
}));
