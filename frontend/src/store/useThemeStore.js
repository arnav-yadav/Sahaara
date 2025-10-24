import { create } from 'zustand'

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("sahaara-theme") || "forest",
  setTheme : (theme) => {
    localStorage.setItem("sahaara-theme", theme);
    set({theme})
  },
}))
