import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface Message {
    id: string;
    role: 'user' | 'system' | 'assistant';
    content: string;
    type?: 'text' | 'widget' | 'file-upload';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    widgetData?: any;
    timestamp: Date;
}

export interface ProjectMember {
    id: string;
    email: string;
    role: 'viewer' | 'editor';
    status: 'pending' | 'accepted';
}

export interface ProjectVariable {
    id: string;
    name: string; // Etiket
    type: 'nominal' | 'ordinal' | 'scale' | 'date';
    values: string[]; // Örnek değerler
}

export interface Project {
    id: string;
    title: string;
    description?: string;

    // Academic Info
    studyType?: 'thesis' | 'article' | 'clinical_trial' | 'other';
    academicBranch?: string;

    // Configuration
    scale?: 'basic' | 'intermediate' | 'advanced';
    targetLanguage?: 'tr' | 'en';
    status?: 'active' | 'passive' | 'archived';

    // Advanced Settings
    decimalSeparator?: '.' | ',';
    decimalPrecision?: number;
    targetTest?: string;
    reportFormat?: 'APA7' | 'Chicago' | 'Harvard' | 'MLA' | 'IEEE';
    members?: ProjectMember[];
    variables?: ProjectVariable[];

    // Metrics
    usedCredits: number;
    // ...
}

export interface UserProfile {
    id?: string;
    name: string;
    email: string;
    image?: string;
    profileImage?: string;

    // Personal Info
    phone?: string;
    country?: string;
    birthDate?: string; // ISO String for easier storage
    bio?: string;

    // Academic Info
    academicTitle?: string;
    institution?: string;
    department?: string;
    academicField?: string;
    researchInterests?: string[];

    // CV & Resume
    education?: { school: string; department: string; year: string; degree: string }[];
    publications?: { title: string; journal: string; year: string; doi?: string }[];
    skills?: string[];

    // Configuration
    notifications?: {
        email: boolean;
        sms: boolean;
        app: boolean;
        marketing: boolean;
        analysisComplete: boolean;
    };

    // Credit & Referral
    credits: number;
    autoReload?: boolean;
    minCreditLimit?: number;
    billingAddress?: string;
    referralCode?: string;
    istacoin?: number;
    earnedCredits?: number;

    // Billing History
    paymentHistory?: {
        id: string;
        date: string;
        amount: number;
        description: string;
        status: 'success' | 'failed' | 'pending';
        invoiceUrl?: string;
    }[];

    // App Settings
    isProfileComplete: boolean;
    language?: 'tr' | 'en';
    theme?: string;
}

interface AppState {
    // Language
    language: 'tr' | 'en';
    setLanguage: (lang: 'tr' | 'en') => void;

    // User Session
    user: UserProfile | null;
    setUser: (user: Partial<UserProfile>) => void;
    updateUser: (updates: Partial<UserProfile>) => void;

    // Credit System
    creditBalance: number;
    deductCredits: (amount: number) => boolean;
    addCredits: (amount: number) => void;
    addProjectUsage: (projectId: string, amount: number) => void;

    // Projects
    projects: Project[];
    currentProject: Project | null;
    setCurrentProject: (project: Project | null) => void;
    addProject: (project: Project) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    deleteProject: (id: string) => void;
    addFileToProject: (projectId: string, file: { name: string; url: string; type: string; date: Date }) => void;
    addOutputToProject: (projectId: string, output: { name: string; url: string; type: 'chart' | 'report' | 'image' | 'other'; date: Date }) => void;

    // Chat
    chatHistory: Message[];
    addMessage: (message: Message) => void;
    clearChat: () => void;

    // UI State
    isSidebarOpen: boolean;
    toggleSidebar: () => void;

    isLeftSidebarOpen: boolean;
    toggleLeftSidebar: () => void;

    isRightSidebarOpen: boolean;
    toggleRightSidebar: () => void;

    aiMode: 'chat' | 'analysis' | 'consultancy';
    setAiMode: (mode: 'chat' | 'analysis' | 'consultancy') => void;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            language: 'tr',
            setLanguage: (lang) => set({ language: lang }),

            user: null,
            setUser: (userData) => set({
                user: {
                    id: userData.id || 'guest',
                    name: userData.name || '',
                    email: userData.email || '',
                    image: userData.image,
                    profileImage: userData.profileImage,
                    credits: userData.credits || 10,
                    isProfileComplete: userData.isProfileComplete || false,
                    language: 'tr',
                    theme: 'light',
                    autoReload: false,
                    minCreditLimit: 5,
                    referralCode: 'BILGE' + Math.floor(1000 + Math.random() * 9000), // Mock code gen
                    istacoin: 0,
                    earnedCredits: 0
                },
                creditBalance: userData.credits || 10
            }),
            updateUser: (updates) => set((state) => ({
                user: state.user ? { ...state.user, ...updates } : null
            })),

            creditBalance: 10,
            deductCredits: (amount) => {
                const { creditBalance } = get();
                if (creditBalance >= amount) {
                    set({ creditBalance: creditBalance - amount });
                    return true;
                }
                return false;
            },
            addCredits: (amount) => set((state) => ({ creditBalance: state.creditBalance + amount })),

            addProjectUsage: (projectId, amount) => set((state) => {
                const updatedProjects = state.projects.map(p =>
                    p.id === projectId ? { ...p, usedCredits: (p.usedCredits || 0) + amount } : p
                );
                const updatedCurrent = state.currentProject?.id === projectId
                    ? { ...state.currentProject, usedCredits: (state.currentProject.usedCredits || 0) + amount }
                    : state.currentProject;

                return {
                    projects: updatedProjects,
                    currentProject: updatedCurrent,
                    creditBalance: state.creditBalance - amount
                };
            }),

            projects: [],
            currentProject: null,

            setCurrentProject: (project) => set(() => ({
                currentProject: project,
                chatHistory: project ? (project.messages || []) : []
            })),

            addProject: (project) => set((state) => ({
                projects: [project, ...state.projects],
                currentProject: project,
                chatHistory: []
            })),

            updateProject: (id, updates) =>
                set((state) => {
                    const updatedProjects = state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p));
                    const updatedCurrent = state.currentProject?.id === id ? { ...state.currentProject, ...updates } : state.currentProject;

                    return { projects: updatedProjects, currentProject: updatedCurrent };
                }),

            deleteProject: (id) => set((state) => ({
                projects: state.projects.filter(p => p.id !== id),
                currentProject: state.currentProject?.id === id ? null : state.currentProject
            })),

            addFileToProject: (projectId, file) => set((state) => {
                // Mock variable generation from file
                const mockVars: ProjectVariable[] = [
                    { id: '1', name: 'Age', type: 'scale', values: ['18-65'] },
                    { id: '2', name: 'Gender', type: 'nominal', values: ['Male', 'Female'] }
                ];

                const updatedProjects = state.projects.map(p =>
                    p.id === projectId ? {
                        ...p,
                        files: [...(p.files || []), file],
                        variables: [...(p.variables || []), ...mockVars] // Auto add vars
                    } : p
                );
                const updatedCurrent = state.currentProject?.id === projectId
                    ? {
                        ...state.currentProject,
                        files: [...(state.currentProject.files || []), file],
                        variables: [...(state.currentProject.variables || []), ...mockVars]
                    }
                    : state.currentProject;

                return { projects: updatedProjects, currentProject: updatedCurrent };
            }),

            addOutputToProject: (projectId, output) => set((state) => {
                const updatedProjects = state.projects.map(p =>
                    p.id === projectId ? { ...p, outputs: [...(p.outputs || []), output] } : p
                );
                const updatedCurrent = state.currentProject?.id === projectId
                    ? { ...state.currentProject, outputs: [...(state.currentProject.outputs || []), output] }
                    : state.currentProject;

                return { projects: updatedProjects, currentProject: updatedCurrent };
            }),

            chatHistory: [],
            addMessage: (message) => set((state) => {
                const newHistory = [...state.chatHistory, message];

                let updatedProjects = state.projects;
                let updatedCurrent = state.currentProject;

                if (state.currentProject) {
                    updatedProjects = state.projects.map(p =>
                        p.id === state.currentProject!.id ? { ...p, messages: newHistory } : p
                    );
                    updatedCurrent = { ...state.currentProject, messages: newHistory };
                }

                return { chatHistory: newHistory, projects: updatedProjects, currentProject: updatedCurrent };
            }),

            clearChat: () => set((state) => {
                let updatedProjects = state.projects;
                let updatedCurrent = state.currentProject;

                if (state.currentProject) {
                    updatedProjects = state.projects.map(p =>
                        p.id === state.currentProject!.id ? { ...p, messages: [] } : p
                    );
                    updatedCurrent = { ...state.currentProject, messages: [] };
                }

                return { chatHistory: [], projects: updatedProjects, currentProject: updatedCurrent };
            }),

            // UI State
            isSidebarOpen: true, // Legacy (Mobile)
            isLeftSidebarOpen: true, // Desktop Left
            isRightSidebarOpen: true, // Desktop Right
            aiMode: 'chat',

            toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
            toggleLeftSidebar: () => set((state) => ({ isLeftSidebarOpen: !state.isLeftSidebarOpen })),
            toggleRightSidebar: () => set((state) => ({ isRightSidebarOpen: !state.isRightSidebarOpen })),
            setAiMode: (mode) => set({ aiMode: mode }),
        }),
        {
            name: 'bilge-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                language: state.language,
                user: state.user,
                projects: state.projects,
                creditBalance: state.creditBalance
            }),
        }
    )
);
