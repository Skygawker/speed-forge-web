import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

interface CmsText {
  id: string;
  key: string;
  value: string;
  page: string | null;
  description: string | null;
}

const AdminTextEditor = () => {
  const { toast } = useToast();
  const [texts, setTexts] = useState<CmsText[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [newText, setNewText] = useState({
    key: "",
    value: "",
    page: "",
    description: ""
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchTexts();
  }, []);

  const fetchTexts = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_texts')
        .select('*')
        .order('page', { ascending: true })
        .order('key', { ascending: true });

      if (error) throw error;
      setTexts(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading texts",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateText = async (id: string, value: string) => {
    setSaving(id);
    try {
      const { error } = await supabase
        .from('cms_texts')
        .update({ value })
        .eq('id', id);

      if (error) throw error;

      setTexts(prev => prev.map(text => 
        text.id === id ? { ...text, value } : text
      ));

      toast({
        title: "Text updated",
        description: "Changes saved successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error updating text",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setSaving(null);
    }
  };

  const addNewText = async () => {
    if (!newText.key || !newText.value) {
      toast({
        title: "Missing fields",
        description: "Key and value are required",
        variant: "destructive"
      });
      return;
    }

    try {
      const { data, error } = await supabase
        .from('cms_texts')
        .insert([{
          key: newText.key,
          value: newText.value,
          page: newText.page || null,
          description: newText.description || null
        }])
        .select()
        .single();

      if (error) throw error;

      setTexts(prev => [...prev, data]);
      setNewText({ key: "", value: "", page: "", description: "" });
      setShowAddForm(false);

      toast({
        title: "Text added",
        description: "New text entry created successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error adding text",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const deleteText = async (id: string) => {
    if (!confirm("Are you sure you want to delete this text entry?")) return;

    try {
      const { error } = await supabase
        .from('cms_texts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setTexts(prev => prev.filter(text => text.id !== id));

      toast({
        title: "Text deleted",
        description: "Text entry removed successfully"
      });
    } catch (error: any) {
      toast({
        title: "Error deleting text",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const groupedTexts = texts.reduce((acc, text) => {
    const page = text.page || 'General';
    if (!acc[page]) acc[page] = [];
    acc[page].push(text);
    return acc;
  }, {} as Record<string, CmsText[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Website Text Editor</h2>
          <p className="text-muted-foreground">Edit all text content across your website</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Text
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Text Entry</CardTitle>
            <CardDescription>Create a new editable text entry</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Key (unique identifier)</label>
                <Input
                  value={newText.key}
                  onChange={(e) => setNewText(prev => ({ ...prev, key: e.target.value }))}
                  placeholder="e.g., hero_title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Page</label>
                <Input
                  value={newText.page}
                  onChange={(e) => setNewText(prev => ({ ...prev, page: e.target.value }))}
                  placeholder="e.g., home, about"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input
                value={newText.description}
                onChange={(e) => setNewText(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this text"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Content</label>
              <Textarea
                value={newText.value}
                onChange={(e) => setNewText(prev => ({ ...prev, value: e.target.value }))}
                placeholder="Enter the text content"
                rows={3}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={addNewText}>Add Text</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {Object.entries(groupedTexts).map(([page, pageTexts]) => (
        <Card key={page}>
          <CardHeader>
            <CardTitle>{page}</CardTitle>
            <CardDescription>{pageTexts.length} text entries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pageTexts.map((text) => (
              <div key={text.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{text.key}</h4>
                    {text.description && (
                      <p className="text-sm text-muted-foreground">{text.description}</p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteText(text.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {text.value.length > 100 ? (
                    <Textarea
                      value={text.value}
                      onChange={(e) => {
                        setTexts(prev => prev.map(t => 
                          t.id === text.id ? { ...t, value: e.target.value } : t
                        ));
                      }}
                      rows={4}
                    />
                  ) : (
                    <Input
                      value={text.value}
                      onChange={(e) => {
                        setTexts(prev => prev.map(t => 
                          t.id === text.id ? { ...t, value: e.target.value } : t
                        ));
                      }}
                    />
                  )}
                  <Button
                    size="sm"
                    onClick={() => updateText(text.id, text.value)}
                    disabled={saving === text.id}
                  >
                    {saving === text.id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      {texts.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-muted-foreground">No text entries found. Add your first one above!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminTextEditor;