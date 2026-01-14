'use client';

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/store/useStore";
import { Layout, MessageSquare, ChevronLeft, Settings, User, LogOut, Plus } from "lucide-react";
import { NewProjectModal } from "./NewProjectModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function SidebarLeft() {
    const { projects, currentProject, setCurrentProject } = useStore();
    const { data: session } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await signOut({ callbackUrl: '/login' });
    };

    return (
        <div className="w-64 border-r bg-slate-50 dark:bg-slate-900/50 flex flex-col h-screen hidden md:flex relative group transition-all duration-300">
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between font-semibold text-slate-700 dark:text-slate-200">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
                    <Layout className="h-5 w-5 text-[#860000]" />
                    <span>Bilge Panel</span>
                </div>
                {/* <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 opacity-50 hover:opacity-100">
                    <ChevronLeft className="h-4 w-4" />
                </Button> */}
            </div>

            {/* New Project Action */}
            <div className="p-4">
                <NewProjectModal className="w-full justify-start shadow-sm" />
            </div>

            {/* Projects List */}
            <ScrollArea className="flex-1 px-4">
                <div className="space-y-6">
                    <div>
                        <h3 className="mb-3 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center justify-between">
                            Projelerim
                            <span className="bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 py-0.5 px-1.5 rounded-full text-[10px]">
                                {projects.length}
                            </span>
                        </h3>
                        <div className="space-y-1">
                            {projects.length === 0 ? (
                                <div className="px-4 py-8 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
                                    <p className="text-xs text-slate-400 mb-2">Henüz proje yok</p>
                                    <NewProjectModal
                                        trigger={
                                            <Button variant="link" size="sm" className="h-auto p-0 text-[#860000]">
                                                Oluştur
                                            </Button>
                                        }
                                    />
                                </div>
                            ) : (
                                projects.map((project) => (
                                    <Button
                                        key={project.id}
                                        variant={currentProject?.id === project.id ? "secondary" : "ghost"}
                                        className="w-full justify-start text-sm font-normal truncate group relative"
                                        onClick={() => setCurrentProject(project)}
                                    >
                                        <MessageSquare className="mr-2 h-4 w-4 text-slate-400 group-hover:text-[#860000]" />
                                        <span className="truncate">{project.title}</span>
                                    </Button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            {/* User Profile & Footer */}
            <div className="p-4 border-t mt-auto bg-white dark:bg-slate-900">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                            <Avatar className="h-9 w-9 border-2 border-white dark:border-slate-800 shadow-sm">
                                <AvatarImage src={session?.user?.image || `https://api.dicebear.com/7.x/initials/svg?seed=${session?.user?.name || 'User'}`} />
                                <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm font-medium truncate text-slate-900 dark:text-slate-100">
                                    {session?.user?.name || 'Misafir'}
                                </p>
                                <p className="text-xs text-slate-500 truncate">
                                    {session?.user?.email || 'Giriş Yapılmadı'}
                                </p>
                            </div>
                            <Settings className="h-4 w-4 text-slate-400" />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 mb-2">
                        <DropdownMenuLabel>Hesabım</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => router.push('/settings')}>
                            <User className="mr-2 h-4 w-4" />
                            Profil Ayarları
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => router.push('/settings?tab=subscription')}>
                            <Layout className="mr-2 h-4 w-4" />
                            Abonelik
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Çıkış Yap
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
