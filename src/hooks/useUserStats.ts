import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';

interface UserStats {
  score: number;
  usage: number;
  assignments_completed: number;
}

export function useUserStats() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<UserStats>({
    score: 0,
    usage: 0,
    assignments_completed: 0
  });

  const initializeUserStats = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error || !data) {
        // If no stats exist, create initial stats
        const { error: insertError } = await supabase
          .from('user_stats')
          .insert({
            user_id: user.id,
            score: 0,
            usage: 0,
            assignments_completed: 0
          });
        
        if (insertError) throw insertError;
      } else {
        setStats({
          score: data.score,
          usage: data.usage,
          assignments_completed: data.assignments_completed
        });
      }
    } catch (error: any) {
      toast.error('Error initializing stats: ' + error.message);
    }
  };

  useEffect(() => {
    if (user) {
      initializeUserStats();
    }
  }, [user]);

  const updateScore = async (newScore: number) => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_stats')
        .upsert({ 
          user_id: user.id,
          score: newScore 
        }, { 
          onConflict: 'user_id'
        });

      if (error) throw error;
      toast.success('Score updated successfully!');
    } catch (error: any) {
      toast.error('Error updating score: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const incrementAssignmentsCompleted = async () => {
    if (!user) return;
    setLoading(true);
    try {
      // First get current stats
      const { data, error: fetchError } = await supabase
        .from('user_stats')
        .select('assignments_completed')
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      const currentCompleted = data?.assignments_completed || 0;

      // Then update with incremented value
      const { error: updateError } = await supabase
        .from('user_stats')
        .upsert({ 
          user_id: user.id,
          assignments_completed: currentCompleted + 1 
        }, { 
          onConflict: 'user_id'
        });

      if (updateError) throw updateError;
      toast.success('Assignment completion recorded!');
    } catch (error: any) {
      toast.error('Error updating assignments: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUsageTime = async (minutes: number) => {
    if (!user) return;
    setLoading(true);
    try {
      const { data, error: fetchError } = await supabase
        .from('user_stats')
        .select('usage')
        .eq('user_id', user.id)
        .single();

      if (fetchError) throw fetchError;

      const currentUsage = data?.usage || 0;

      const { error: updateError } = await supabase
        .from('user_stats')
        .upsert({ 
          user_id: user.id,
          usage: currentUsage + minutes 
        }, { 
          onConflict: 'user_id'
        });

      if (updateError) throw updateError;
      toast.success('Usage time updated!');
    } catch (error: any) {
      toast.error('Error updating usage time: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    stats,
    updateScore,
    incrementAssignmentsCompleted,
    updateUsageTime
  };
}
