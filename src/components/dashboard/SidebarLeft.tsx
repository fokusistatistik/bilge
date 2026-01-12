import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/store/useStore";
import { Layout, MessageSquare, ChevronLeft, Settings, User } from "lucide-react";
import { NewProjectModal } from "./NewProjectModal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function SidebarLeft() {
    const { projects, currentProject, setCurrentProject, user } = useStore();

    return (
        <div className="w-64 border-r bg-slate-50 dark:bg-slate-900/50 flex flex-col h-screen hidden md:flex relative group transition-all duration-300">
            <div className="p-4 border-b flex items-center justify-between font-semibold text-slate-700 dark:text-slate-200">
                <div className="flex items-center gap-2">
                    <Layout className="h-5 w-5" />
                    <span>Projeler</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 opacity-50 hover:opacity-100">
                    <ChevronLeft className="h-4 w-4" />
                </Button>
            </div>

            <div className="p-4">
                <NewProjectModal className="w-full justify-start" />
            </div>

            <ScrollArea className="flex-1 px-4">
                <div className="space-y-4">
                    <div className="py-2">
                        <h3 className="mb-2 px-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Son Projeler
                        </h3>
                        <div className="space-y-1">
                            {projects.length === 0 ? (
                                <p className="px-2 text-sm text-slate-400 italic">Henüz proje yok</p>
                            ) : (
                                projects.map((project) => (
                                    <Button
                                        key={project.id}
                                        variant={currentProject?.id === project.id ? "secondary" : "ghost"}
                                        className="w-full justify-start text-sm font-normal truncate"
                                        onClick={() => setCurrentProject(project)}
                                    >
                                        <MessageSquare className="mr-2 h-4 w-4 text-slate-400" />
                                        {project.title}
                                    </Button>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>

            <div className="p-4 border-t mt-auto">
                <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                    <Avatar className="h-9 w-9 border">
                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name || 'User'}`} />
                        <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{user?.name || 'Misafir'}</p>
                        <p className="text-xs text-slate-500 truncate">{user?.academicTitle || 'Araştırmacı'}</p>
                    </div>
                    <Settings className="h-4 w-4 text-slate-400" />
                </div>
            </div>
        </div>
    );
}
