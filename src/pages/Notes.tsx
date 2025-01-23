import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';  
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CustomTabs as Tabs, CustomTabsContent as TabsContent, CustomTabsList as TabsList, CustomTabsTrigger as TabsTrigger } from '@/components/ui/custom-tabs';
import { Input } from '@/components/ui/input';
import { ExternalLink, Search, Book } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import { ThemeToggle } from "@/components/ui/theme-toggle";
import "@/styles/theme.css";

interface EducationalLink {
  id: string;
  title: string;
  url: string;
  description: string | null;
  faculty: string;
  subject: string;
  subject_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export default function Notes() {
  const { user } = useAuth();
  const [links, setLinks] = useState<EducationalLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Data Science');

  const faculties = ['Data Science', 'Bioinformatics', 'Computational Mathematics'];

  useEffect(() => {
    if (user) {
      fetchLinks();
    } else {
      setError('Please sign in to view educational resources');
      setLoading(false);
    }
  }, [user]);

  const fetchLinks = async () => {
    if (!user) {
      setError('Please sign in to view educational resources');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('educational_links')
        .select('*')
        .order('subject');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        console.error('No data returned from Supabase');
        throw new Error('No data returned from database');
      }

      setLinks(data);
    } catch (err: any) {
      console.error('Error details:', {
        message: err.message,
        code: err.code,
        details: err.details,
        hint: err.hint
      });
      setError('Failed to load educational resources. Please try again later.');
      toast.error('Failed to load resources');
    } finally {
      setLoading(false);
    }
  };

  const filteredLinks = links.filter(link => {
    const matchesSearch = 
      link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      link.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = link.faculty === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const groupedLinks = filteredLinks.reduce((acc, link) => {
    if (!acc[link.subject]) {
      acc[link.subject] = [];
    }
    acc[link.subject].push(link);
    return acc;
  }, {} as Record<string, EducationalLink[]>);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeToggle />
      <div className="container mx-auto p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full search-input"
            />
          </div>

          <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
            <TabsList className="tabs-list">
              {faculties.map((faculty) => (
                <TabsTrigger key={faculty} value={faculty} className="tab-trigger">
                  {faculty}
                </TabsTrigger>
              ))}
            </TabsList>

            {faculties.map((faculty) => (
              <TabsContent key={faculty} value={faculty}>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map((n) => (
                      <Card key={n} className="resource-item">
                        <CardHeader>
                          <Skeleton className="h-4 w-3/4" />
                        </CardHeader>
                        <CardContent>
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : error ? (
                  <div className="text-destructive">{error}</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(groupedLinks).map(([subject, subjectLinks]) => (
                      <div key={subject}>
                        <h3 className="font-semibold text-lg mb-2 text-foreground">{subject}</h3>
                        {subjectLinks.map((link) => (
                          <Card key={link.id} className="mb-4 resource-item">
                            <CardHeader>
                              <CardTitle className="text-lg flex items-center justify-between text-foreground">
                                {link.title}
                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary hover:text-primary/80"
                                >
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              </CardTitle>
                            </CardHeader>
                            {link.description && (
                              <CardContent>
                                <CardDescription className="text-muted-foreground">{link.description}</CardDescription>
                              </CardContent>
                            )}
                          </Card>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
}
