'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import { Edit2, Save, X } from 'lucide-react';

export const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, class_name, username, role, faculty')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setName(data.full_name || '');
        setClassName(data.class_name || '');
        setUsername(data.username || user?.email || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const saveProfile = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const updates = {
        id: user.id,
        full_name: name.trim(),
        class_name: className.trim(),
        username: username.trim() || user.email,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates, {
          returning: 'minimal',
          onConflict: 'id'
        });

      if (error) throw error;

      setIsEditing(false);
      toast.success('Profile updated successfully');
      await fetchProfile(); // Refresh the profile data
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-lg font-semibold text-purple-600 dark:text-purple-300">
          {getInitials(name || username || 'U')}
        </div>
        
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full"
                disabled={isLoading}
              />
              <Input
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Your class"
                className="w-full"
                disabled={isLoading}
              />
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={user?.email || 'Username'}
                className="w-full"
                disabled={isLoading}
              />
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {name || 'Add your name'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {className || 'Add your class'}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {username || user?.email}
              </p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                size="sm"
                onClick={saveProfile}
                className="bg-purple-500 hover:bg-purple-600 text-white"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-1" />
                {isLoading ? 'Saving...' : 'Save'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(false)}
                disabled={isLoading}
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
            >
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
