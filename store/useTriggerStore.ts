import { create } from 'zustand';


interface State {
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

export const useTriggerStore = create<State>((set) => ({
    isModalOpen: false,
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),
}));