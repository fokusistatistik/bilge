'use client';

import { ChatInterface } from "@/components/dashboard/ChatInterface";
import { useStore } from "@/store/useStore";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { NewProjectModal } from "@/components/dashboard/NewProjectModal";
import { MessageSquare, Plus, FileText, Activity, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function DashboardPage() {
    const { currentProject, projects, setCurrentProject } = useStore();
    const { data: session } = useSession();

    // If a project is selected, show the chat/workspace interface
    if (currentProject) {
        return (
            <div className="h-full w-full flex flex-col">
                {/* Project Header (Optional, maybe already in layout or chat interface) */}
                <ChatInterface />
            </div>
        );
    }

    // Otherwise, show the Dashboard Home (Projects Overview)
    return (
        <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto space-y-8">
                {/* Welcome Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                            Hoş geldin, {session?.user?.name?.split(' ')[0]} 👋
                        </h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-1">
                            Bugün hangi araştırma üzerinde çalışmak istersin?
                        </p>
                    </div>
                    <NewProjectModal />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Toplam Proje</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{projects.length}</div>
                            <p className="text-xs text-muted-foreground">Aktif araştırma alanı</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Analizler</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">0</div>
                            <p className="text-xs text-muted-foreground">Bu ay yapılan analiz</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Kalan Kredi</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">10</div>
                            <p className="text-xs text-muted-foreground">Analiz kredisi mevcut</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Projects */}
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold tracking-tight">Son Çalışmalar</h2>

                    {projects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-900/50 text-center">
                            <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-full mb-4">
                                <FileText className="h-8 w-8 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-200">Henüz hiç projen yok</h3>
                            <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2 mb-6">
                                Akademik çalışmalarını organize etmek ve yapay zeka destekli analizler yapmak için ilk projeni oluştur.
                            </p>
                            <NewProjectModal />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {projects.map((project) => (
                                <motion.div
                                    key={project.id}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <Card
                                        className="cursor-pointer hover:shadow-md transition-shadow h-full border-slate-200 dark:border-slate-800"
                                        onClick={() => setCurrentProject(project)}
                                    >
                                        <CardHeader className="pb-3">
                                            <div className="flex justify-between items-start">
                                                <CardTitle className="text-lg line-clamp-1">{project.title}</CardTitle>
                                                <MessageSquare className="h-4 w-4 text-slate-400" />
                                            </div>
                                            <CardDescription className="line-clamp-2 min-h-[40px]">
                                                {project.abstract || "Açıklama yok"}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="pb-3">
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                                    {project.studyType === 'thesis' ? 'Tez' :
                                                        project.studyType === 'article' ? 'Makale' : 'Diğer'}
                                                </span>
                                                <span>•</span>
                                                <span>{new Date(project.createdAt).toLocaleDateString('tr-TR')}</span>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}

                            {/* Create New Card */}
                            <NewProjectModal
                                trigger={
                                    <div className="h-full min-h-[140px] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors group">
                                        <Plus className="h-8 w-8 text-slate-300 group-hover:text-[#860000] mb-2 transition-colors" />
                                        <span className="text-sm font-medium text-slate-500 group-hover:text-[#860000] transition-colors">Yeni Oluştur</span>
                                    </div>
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
