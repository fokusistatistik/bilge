'use client';

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, FileText, TrendingUp, Clock, FolderOpen, Plus } from "lucide-react";
import { NewProjectModal } from "./NewProjectModal";

export function ProjectsPage() {
    const { projects, currentProject, setCurrentProject } = useStore();
    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false);

    // Mock data for demonstration
    const projectsWithDetails = projects.map(p => ({
        ...p,
        creditsUsed: Math.floor(Math.random() * 50) + 10,
        startDate: p.createdAt,
        targetDate: new Date(p.createdAt.getTime() + 30 * 24 * 60 * 60 * 1000),
        filesCount: p.files.length,
        reportsCount: p.reports.length,
    }));

    const getDaysRemaining = (targetDate: Date) => {
        const diff = targetDate.getTime() - new Date().getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Projelerim</h1>
                    <p className="text-slate-600 dark:text-slate-400 mt-1">Tüm araştırma projelerinizi yönetin</p>
                </div>
                <Button
                    onClick={() => setIsNewProjectOpen(true)}
                    className="bg-[#860000] hover:bg-[#660000] text-white gap-2"
                >
                    <Plus className="h-4 w-4" /> Yeni Proje
                </Button>
            </div>

            {projectsWithDetails.length === 0 ? (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <FolderOpen className="h-16 w-16 text-slate-300 mb-4" />
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
                            Henüz proje yok
                        </h3>
                        <p className="text-slate-500 text-sm mb-4">İlk projenizi oluşturarak başlayın</p>
                        <Button onClick={() => setIsNewProjectOpen(true)} variant="outline">
                            Yeni Proje Oluştur
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectsWithDetails.map((project) => {
                        const daysRemaining = getDaysRemaining(project.targetDate);
                        const isActive = currentProject?.id === project.id;

                        return (
                            <Card
                                key={project.id}
                                className={`hover:shadow-lg transition-all cursor-pointer ${isActive ? 'ring-2 ring-indigo-600' : ''
                                    }`}
                                onClick={() => setCurrentProject(project)}
                            >
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                                        {isActive && (
                                            <Badge className="bg-indigo-600 text-white">Aktif</Badge>
                                        )}
                                    </div>
                                    {project.studyType && (
                                        <Badge variant="outline" className="w-fit mt-2">
                                            {project.studyType === 'thesis' && 'Tez'}
                                            {project.studyType === 'article' && 'Makale'}
                                            {project.studyType === 'clinical_trial' && 'Klinik Çalışma'}
                                            {project.studyType === 'other' && 'Diğer'}
                                        </Badge>
                                    )}
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {project.abstract && (
                                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
                                            {project.abstract}
                                        </p>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                        <div className="flex items-center gap-2 text-sm">
                                            <TrendingUp className="h-4 w-4 text-indigo-600" />
                                            <div>
                                                <p className="text-xs text-slate-500">Kredi Kullanımı</p>
                                                <p className="font-bold text-slate-900 dark:text-white">
                                                    {project.creditsUsed}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <FileText className="h-4 w-4 text-green-600" />
                                            <div>
                                                <p className="text-xs text-slate-500">Dosyalar</p>
                                                <p className="font-bold text-slate-900 dark:text-white">
                                                    {project.filesCount}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500 flex items-center gap-1">
                                                <Calendar className="h-3 w-3" />
                                                Başlangıç: {project.startDate.toLocaleDateString('tr-TR')}
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-slate-500 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                Hedef: {project.targetDate.toLocaleDateString('tr-TR')}
                                            </span>
                                            <Badge
                                                variant={daysRemaining < 7 ? "destructive" : "secondary"}
                                                className="text-xs"
                                            >
                                                {daysRemaining > 0 ? `${daysRemaining} gün kaldı` : 'Süresi doldu'}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t">
                                        <Button
                                            variant="outline"
                                            className="w-full"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setCurrentProject(project);
                                                // Navigate to dashboard
                                            }}
                                        >
                                            Projeye Git
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            )}

            <NewProjectModal
                isOpen={isNewProjectOpen}
                onClose={() => setIsNewProjectOpen(false)}
            />
        </div>
    );
}
