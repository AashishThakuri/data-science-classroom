export interface Announcement {
  id: string;
  classroom_id: string;
  teacher_id: string;
  title: string;
  content: string;
  created_at: string;
}

export interface Resource {
  id: string;
  classroom_id: string;
  teacher_id: string;
  title: string;
  description: string;
  file_url: string;
  file_type: string;
  created_at: string;
}

export interface Classroom {
  id: string;
  name: string;
  description: string;
  teacher_id: string;
  teacher_name: string;
  created_at: string;
  updated_at: string;
}
