'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore, Project } from "@/store/useStore";
import { Layout, MessageSquare, ChevronLeft, ChevronRight, Settings, User, LogOut, Plus, MoreHorizontal, Archive, Trash2, Power, PlayCircle, PauseCircle } from "lucide-react";
import { NewProjectModal } from "./NewProjectModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import { translations } from "@/lib/translations";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SidebarLeft() {
    const { projects, currentProject, setCurrentProject, updateProject, deleteProject, user, language, toggleLeftSidebar, isLeftSidebarOpen } = useStore();
    const { data: session } = useSession();
    const router = useRouter();
    const [showArchived, setShowArchived] = useState(false);

    // Fallback if transaction system not fully loaded
    const t = translations[language]?.dashboard || { newProject: "Yeni Proje" };

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    const handleProjectStatus = (e: React.MouseEvent, project: Project, status: 'active' | 'passive' | 'archived') => {
        e.stopPropagation();
        updateProject(project.id, { status });
    };

    const handleDeleteProject = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm(language === 'tr' ? 'Projeyi silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this project?')) {
            deleteProject(id);
        }
    };

    // Filter projects
    const displayedProjects = projects.filter(p => !p.status || (showArchived ? true : p.status !== 'archived'));

    // Collapsed View
    if (!isLeftSidebarOpen) {
        return (
            <div className="w-12 border-r bg-slate-50 dark:bg-slate-900/50 flex flex-col h-screen hidden md:flex items-center pt-4 transition-all duration-300">
                <Button variant="ghost" size="icon" onClick={toggleLeftSidebar} title="Paneli Göster">
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
        );
    }

    return (
        <div className="w-64 border-r bg-slate-50 dark:bg-slate-900/50 flex flex-col h-screen hidden md:flex relative group transition-all duration-300">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between font-semibold text-slate-700 dark:text-slate-200">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
                    <Layout className="h-5 w-5 text-[#860000]" />
                    <span>Bilge Panel</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={toggleLeftSidebar}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </div>

            {/* New Project Action */}
            <div className="p-4">
                <NewProjectModal className="w-full justify-start shadow-sm" />
            </div>

            {/* Projects List */}
            <ScrollArea className="flex-1 px-4">
                <div className="space-y-6">
                    <div>
                        <div className="flex items-center justify-between mb-3 px-2">
                            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-2">
                                {language === 'tr' ? 'Projelerim' : 'My Projects'}
                                <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-0.5 px-1.5 rounded-full text-[10px]">
                                    {displayedProjects.length}
                                </span>
                            </h3>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5 text-slate-400"
                                onClick={() => setShowArchived(!showArchived)}
                                title={showArchived ? (language === 'tr' ? 'Arşivi Gizle' : 'Hide Archive') : (language === 'tr' ? 'Arşivi Göster' : 'Show Archive')}
                            >
                                <Archive className={`h-3 w-3 ${showArchived ? 'text-[#860000]' : ''}`} />
                            </Button>
                        </div>

                        <div className="space-y-1">
                            {displayedProjects.length === 0 ? (
                                <div className="px-4 py-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                                    <p className="text-xs text-slate-400 mb-2">{language === 'tr' ? 'Henüz proje yok' : 'No projects yet'}</p>
                                    <NewProjectModal
                                        trigger={
                                            <Button variant="link" size="sm" className="h-auto p-0 text-[#860000]">
                                                {language === 'tr' ? 'Oluştur' : 'Create'}
                                            </Button>
                                        }
                                    />
                                </div>
                            ) : (
                                displayedProjects.map((project) => (
                                    <div key={project.id} className="group relative flex items-center">
                                        <Button
                                            variant={currentProject?.id === project.id ? "secondary" : "ghost"}
                                            className={`w-full justify-start text-sm font-normal truncate pr-8 ${project.status === 'passive' ? 'opacity-60 grayscale' : ''} ${project.status === 'archived' ? 'opacity-40 italic' : ''}`}
                                            onClick={() => setCurrentProject(project)}
                                        >
                                            <MessageSquare className="mr-2 h-4 w-4 text-slate-400 group-hover:text-[#860000]" />
                                            <span className="truncate flex-1 text-left">
                                                {project.title}
                                                {project.status === 'passive' && <span className="ml-2 text-[10px] bg-slate-200 px-1 rounded text-slate-600">PASİF</span>}
                                                {project.status === 'archived' && <span className="ml-2 text-[10px] bg-amber-100 px-1 rounded text-amber-700">ARŞİV</span>}
                                            </span>
                                        </Button>

                                        {/* Project Actions Menu */}
                                        <div className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                                        <MoreHorizontal className="h-3 w-3 text-slate-400" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="start" side="right">
                                                    <DropdownMenuLabel className="text-xs">{language === 'tr' ? 'Proje İşlemleri' : 'Project Actions'}</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />

                                                    {project.status !== 'active' ? (
                                                        <DropdownMenuItem onClick={(e) => handleProjectStatus(e, project, 'active')}>
                                                            <PlayCircle className="mr-2 h-3 w-3 text-green-600" />
                                                            {language === 'tr' ? 'Aktifleştir' : 'Activate'}
                                                        </DropdownMenuItem>
                                                    ) : (
                                                        <DropdownMenuItem onClick={(e) => handleProjectStatus(e, project, 'passive')}>
                                                            <PauseCircle className="mr-2 h-3 w-3 text-slate-500" />
                                                            {language === 'tr' ? 'Pasife Al' : 'Deactivate'}
                                                        </DropdownMenuItem>
                                                    )}

                                                    {project.status !== 'archived' && (
                                                        <DropdownMenuItem onClick={(e) => handleProjectStatus(e, project, 'archived')}>
                                                            <Archive className="mr-2 h-3 w-3 text-amber-600" />
                                                            {language === 'tr' ? 'Arşivle' : 'Archive'}
                                                        </DropdownMenuItem>
                                                    )}

                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={(e) => handleDeleteProject(e, project.id)}>
                                                        <Trash2 className="mr-2 h-3 w-3" />
                                                        {language === 'tr' ? 'Projeyi Sil' : 'Delete Project'}
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}
