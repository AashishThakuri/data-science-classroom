export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: 'announcement' | 'resource' | 'assignment';
  read: boolean;
  classroom_id: string;
  created_at: string;
}
