import { create } from 'zustand';

export interface Message {
    id: string;
    role: 'user' | 'system' | 'assistant';
    content: string;
    type?: 'text' | 'widget' | 'file-upload';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    widgetData?: any; // For charts, tables, etc.
    timestamp: Date;
}

export interface Project {
    id: string;
    title: string;
    abstract?: string;
    studyType?: 'thesis' | 'article' | 'clinical_trial' | 'other';
    academicBranch?: string;
    files: { name: string; url: string; type: string }[];
    reports: { name: string; url: string; date: Date }[];
    createdAt: Date;
}

export interface UserProfile {
    name: string;
    phone: string;
    academicTitle: string;
    institution: string;
    academicField: string;
    isProfileComplete: boolean;
    credits: number;
}

interface AppState {
    // User Session
    user: UserProfile | null;
    setUser: (user: Partial<UserProfile>) => void;
    updateUser: (updates: Partial<UserProfile>) => void;

    // Credit System
    creditBalance: number;
    deductCredits: (amount: number) => boolean;
    addCredits: (amount: number) => void;

    // Projects
    projects: Project[];
    currentProject: Project | null;
    setCurrentProject: (project: Project | null) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;

    // Chat
    chatHistory: Message[];
    addMessage: (message: Message) => void;
    clearChat: () => void;

    // UI State
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

export const useStore = create<AppState>((set, get) => ({
    // User
    user: null,
    setUser: (user) => set({
        user: {
            name: user.name || '',
            phone: user.phone || '',
            academicTitle: user.academicTitle || '',
            institution: user.institution || '',
            academicField: user.academicField || '',
            isProfileComplete: user.isProfileComplete || false,
            credits: user.credits || 100
        }
    }),
    updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
    })),

    // Credits
    creditBalance: 100, // Starting balance
    deductCredits: (amount) => {
        const { creditBalance } = get();
        if (creditBalance >= amount) {
            set({ creditBalance: creditBalance - amount });
            return true;
        }
        return false;
    },
    addCredits: (amount) => set((state) => ({ creditBalance: state.creditBalance + amount })),

    // Projects
    projects: [],
    currentProject: null,
    setCurrentProject: (project) => set({ currentProject: project }),
    addProject: (project) => set((state) => ({ projects: [project, ...state.projects], currentProject: project })),
    updateProject: (id, updates) =>
        set((state) => ({
            projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
            currentProject: state.currentProject?.id === id ? { ...state.currentProject, ...updates } : state.currentProject,
        })),

    // Chat
    chatHistory: [
        {
            id: 'welcome-1',
            role: 'assistant',
            content: 'Merhaba! Ben Bilge, Yapay Zeka İstatistik Mentörünüz. Araştırmanızda size nasıl yardımcı olabilirim?',
            timestamp: new Date(),
            type: 'text',
        },
    ],
    addMessage: (message) => set((state) => ({ chatHistory: [...state.chatHistory, message] })),
    clearChat: () => set({ chatHistory: [] }),

    // UI
    isSidebarOpen: true,
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
