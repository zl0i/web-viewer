import { create } from 'zustand'
import { Airbase } from '../api/flightsV2'


interface AirbaseStore {
    all: Airbase[],
    bears: number,
    byId: (id: number) => Airbase | undefined
    fill: (airbases: Airbase[]) => void,
    match: (match: string) => Airbase[],
    byName: (name: string) => Airbase | undefined,
}

export const useAirbasesStore = create<AirbaseStore>((set, get) => ({
    all: [],
    bears: 0,
    byId: (id) => get().all.find(a => a.id == id),
    byName: (name) => get().all.find(a => a.name == name),
    fill: (airbases) => set((state) => ({ ...state, all: airbases })),
    match: (match: string) => {
        const reg = new RegExp(match, 'gmi')
        return get().all.filter(a => a.name.match(reg))
    }
}))