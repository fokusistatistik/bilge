'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Table as TableIcon, BarChart3, Download, UserCheck } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { AnalysisResult } from "@/services/api";

interface AnalysisResultWidgetProps {
    result: AnalysisResult;
}

export function AnalysisResultWidget({ result }: AnalysisResultWidgetProps) {
    return (
        <Card className="w-full mt-4 border-indigo-100 dark:border-indigo-900 shadow-sm overflow-hidden">
            <CardHeader className="bg-slate-50 dark:bg-slate-900/50 pb-2">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-lg font-bold text-[#860000]">{result.test_type}</CardTitle>
                        <CardDescription className="text-xs">
                            p={result.p_value} • Etki Büyüklüğü: {result.effect_size}
                        </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 h-8">
                        <Download className="h-3 w-3" />
                        <span className="hidden sm:inline">Rapor İndir</span>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Tabs defaultValue="interpretation" className="w-full">
                    <div className="border-b px-4 bg-slate-50 dark:bg-slate-900/50">
                        <TabsList className="bg-transparent h-10 w-full justify-start gap-4 p-0">
                            <TabsTrigger
                                value="interpretation"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#860000] data-[state=active]:text-[#860000] rounded-none px-0 pb-2"
                            >
                                <FileText className="h-4 w-4 mr-2" />
                                Yorum
                            </TabsTrigger>
                            <TabsTrigger
                                value="table"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#860000] data-[state=active]:text-[#860000] rounded-none px-0 pb-2"
                            >
                                <TableIcon className="h-4 w-4 mr-2" />
                                APA Tablosu
                            </TabsTrigger>
                            <TabsTrigger
                                value="visuals"
                                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#860000] data-[state=active]:text-[#860000] rounded-none px-0 pb-2"
                            >
                                <BarChart3 className="h-4 w-4 mr-2" />
                                Görseller
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="interpretation" className="p-4 m-0">
                        <div className="prose dark:prose-invert prose-sm max-w-none text-slate-700 dark:text-slate-300 font-serif leading-relaxed">
                            <ReactMarkdown>
                                {result.summary}
                            </ReactMarkdown>
                        </div>
                    </TabsContent>

                    <TabsContent value="table" className="p-4 m-0">
                        <div className="overflow-x-auto border rounded-lg p-4 bg-white dark:bg-slate-950">
                            <div className="font-serif text-sm">
                                <p className="mb-2 font-bold">Tablo 1</p>
                                <p className="mb-4 italic">{result.test_type} Sonuçları</p>
                                <div className="text-xs text-slate-500 bg-slate-50 p-4 border border-dashed rounded text-center">
                                    {/* Mock Table visual */}
                                    [APA Formatlı Tablo Buraya Gelecek]
                                    <br />
                                    (Gerçek verilerle dinamik olarak oluşturulur)
                                </div>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="visuals" className="p-4 m-0">
                        <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-900 border border-dashed rounded-lg h-64">
                            <div className="text-center text-slate-400">
                                <BarChart3 className="h-10 w-10 mx-auto mb-2 opacity-50" />
                                <p>Etki Büyüklüğü Grafiği</p>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
            <CardFooter className="bg-indigo-50 dark:bg-indigo-950/20 border-t border-indigo-100 dark:border-indigo-900 p-3 flex justify-center">
                <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-100 gap-2 w-full">
                    <UserCheck className="h-4 w-4" />
                    Bir İstatistikçiden Destek Al (500 Kredi)
                </Button>
            </CardFooter>
        </Card>
    );
}
