import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { Edit2, Save, X } from 'lucide-react';

interface UserProfileData {
  id: string;
  full_name: string;
  class_name: string;
  username: string | undefined;
  updated_at: string;
}

export function UserProfile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<UserProfileData | null>(null);

  const fetchProfile = async () => {
    try {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error: any) {
      toast.error('Error fetching profile: ' + error.message);
    }
  };

  const saveProfile = async () => {
    try {
      if (!user || !profile) return;
      setLoading(true);

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: profile.full_name,
          class_name: profile.class_name,
          username: profile.username,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) throw error;
      setEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error('Error updating profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  if (!user) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Profile</h2>
        {!editing ? (
          <Button variant="ghost" size="sm" onClick={() => setEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={saveProfile} disabled={loading}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setEditing(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium">Full Name</label>
          {editing ? (
            <Input
              value={profile?.full_name || ''}
              onChange={(e) => setProfile(prev => ({ ...prev!, full_name: e.target.value }))}
              className="mt-1"
            />
          ) : (
            <p className="mt-1">{profile?.full_name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Class</label>
          {editing ? (
            <Input
              value={profile?.class_name || ''}
              onChange={(e) => setProfile(prev => ({ ...prev!, class_name: e.target.value }))}
              className="mt-1"
            />
          ) : (
            <p className="mt-1">{profile?.class_name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium">Username</label>
          {editing ? (
            <Input
              value={profile?.username || ''}
              onChange={(e) => setProfile(prev => ({ ...prev!, username: e.target.value }))}
              className="mt-1"
            />
          ) : (
            <p className="mt-1">{profile?.username}</p>
          )}
        </div>
      </div>
    </div>
  );
}
