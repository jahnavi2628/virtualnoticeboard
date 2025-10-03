import { Role as OriginalRole } from './types';

export enum Role {
  STUDENT = 'Student',
  ADMIN = 'Admin',
  CENTRAL = 'Central Panel'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

export enum NoticeCategory {
  CLUB = 'Club Events',
  GENERAL = 'General Announcements',
  TECHNICAL = 'Technical Events',
  NON_TECHNICAL = 'Non-Technical Events',
  COLLEGE = 'College Updates',
  PLACEMENTS = 'Placements'
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  category: NoticeCategory;
  author: string;
  date: string;
  file?: {
    name: string;
    type: 'pdf' | 'image' | 'audio';
    url: string;
  };
}

export interface RadioSchedule {
  id: string;
  title: string;
  time: string;
  audioSrc: string;
}

export interface AdminUser extends User {
  status: 'Approved' | 'Pending' | 'Revoked';
}

export interface AccessLog {
  id: string;
  user: string;
  role: Role;
  action: string;
  timestamp: string;
}

export interface GalleryImage {
    id: string;
    url: string;
    caption: string;
}

export interface BuzzPost {
  id: string;
  author: string;
  content: string;
  timestamp: string;
}
