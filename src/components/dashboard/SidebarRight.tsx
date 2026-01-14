'use client';

import { ScrollArea } from "@/components/ui/scroll-area";
import { useStore } from "@/store/useStore";
import { FileSpreadsheet, FileText, Download, ChevronDown, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SidebarRight() {
    const { currentProject, isRightSidebarOpen } = useStore();
    const [isDataOpen, setIsDataOpen] = useState(true);
    const [isReportsOpen, setIsReportsOpen] = useState(true);
    const [isVizOpen, setIsVizOpen] = useState(true);

    if (!isRightSidebarOpen) return null;

    if (!currentProject) {
        return (
            <div className="w-80 border-l bg-slate-50 dark:bg-slate-900/50 hidden lg:flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                <p>Varlıkları görüntülemek için bir proje seçin veya oluşturun.</p>
            </div>
        );
    }

    return (
        <div className="w-80 border-l bg-slate-50 dark:bg-slate-900/50 flex flex-col h-screen hidden lg:flex">
            <div className="p-4 border-b font-semibold text-slate-700 dark:text-slate-200">
                Laboratuvar Tezgahı
            </div>

            <ScrollArea className="flex-1">
                <div className="p-4 space-y-4">
                    {/* Data Files Section */}
                    <Collapsible open={isDataOpen} onOpenChange={setIsDataOpen} className="space-y-2">
                        <CollapsibleTrigger className="flex items-center justify-between w-full group">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Veri Dosyaları</span>
                            <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !isDataOpen && "-rotate-90")} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2">
                            {currentProject.files.length === 0 ? (
                                <p className="text-sm text-slate-400 italic px-2">Dosya yüklenmedi.</p>
                            ) : (
                                currentProject.files.map((file, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-lg border shadow-sm group hover:border-indigo-200 transition-colors cursor-pointer">
                                        <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded">
                                            <FileSpreadsheet className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{file.name}</p>
                                            <p className="text-xs text-slate-500 uppercase">{file.type}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </CollapsibleContent>
                    </Collapsible>

                    {/* Reports Section */}
                    <Collapsible open={isReportsOpen} onOpenChange={setIsReportsOpen} className="space-y-2">
                        <CollapsibleTrigger className="flex items-center justify-between w-full group">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Raporlar</span>
                            <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !isReportsOpen && "-rotate-90")} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2">
                            {currentProject.reports.length === 0 ? (
                                <p className="text-sm text-slate-400 italic px-2">Rapor oluşturulmadı.</p>
                            ) : (
                                currentProject.reports.map((report, idx) => (
                                    <div key={idx} className="flex flex-col gap-2 p-3 bg-white dark:bg-slate-800 rounded-lg border shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded">
                                                <FileText className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{report.name}</p>
                                                <p className="text-xs text-slate-500">{report.date.toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <Button size="sm" variant="outline" className="w-full gap-2 text-xs h-8">
                                            <Download className="h-3 w-3" /> DOCX İndir
                                        </Button>
                                    </div>
                                ))
                            )}
                        </CollapsibleContent>
                    </Collapsible>

                    {/* Visualizations Section */}
                    <Collapsible open={isVizOpen} onOpenChange={setIsVizOpen} className="space-y-2">
                        <CollapsibleTrigger className="flex items-center justify-between w-full group">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Görselleştirmeler</span>
                            <ChevronDown className={cn("h-4 w-4 text-slate-400 transition-transform", !isVizOpen && "-rotate-90")} />
                        </CollapsibleTrigger>
                        <CollapsibleContent className="space-y-2">
                            <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg flex flex-col items-center justify-center text-slate-400 gap-2 min-h-[100px]">
                                <BarChart className="h-6 w-6 opacity-50" />
                                <span className="text-xs text-center">Henüz grafik yok</span>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </ScrollArea>
        </div>
    );
}
