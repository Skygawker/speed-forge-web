import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useCmsText = (key: string, defaultValue: string = "") => {
  const [text, setText] = useState(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchText = async () => {
      try {
        const { data, error } = await supabase
          .from('cms_texts')
          .select('value')
          .eq('key', key)
          .single();

        if (error) {
          // If text doesn't exist, use default value
          setText(defaultValue);
        } else {
          setText(data.value);
        }
      } catch (error) {
        setText(defaultValue);
      } finally {
        setLoading(false);
      }
    };

    fetchText();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('cms_texts_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'cms_texts',
          filter: `key=eq.${key}`
        }, 
        (payload) => {
          if (payload.eventType === 'UPDATE' && payload.new) {
            setText(payload.new.value);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [key, defaultValue]);

  return { text, loading };
};