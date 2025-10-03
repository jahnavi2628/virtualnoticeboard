import React from 'react';
import { User, Role, Notice, NoticeCategory, RadioSchedule, AdminUser, AccessLog, GalleryImage, BuzzPost } from './types';

// --- ICONS ---
// Using heroicons as a base for simple, consistent SVGs

export const IconBase: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    {children}
  </svg>
);

export const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></IconBase>
);

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></IconBase>
);

export const ClubIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.928A9.095 9.095 0 0112 5.25c2.718 0 4.927 1.04 6.022 2.61m-1.5 0A7.5 7.5 0 1113.5 5.25v2.34" /></IconBase>
);

export const CodeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5 0l-4.5 9" /></IconBase>
);

export const CelebrateIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconBase>
);

export const BuildingIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12M3 3v12m-3-3h12" /></IconBase>
);

export const RadioIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></IconBase>
);

export const CalculatorIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></IconBase>
);

export const ChatIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></IconBase>
);

export const GalleryIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" /></IconBase>
);

export const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.25L21 12m0 0l-1.453-2.25M21 12h-6.75M3.75 14.25L3 12m0 0l1.453-2.25M3 12h6.75m0 0l1.82 2.25M11.25 12l1.82-2.25M14.25 3.75l-1.5 1.5-1.5-1.5M14.25 3.75V1.5M14.25 3.75v1.5m3 3l1.5-1.5-1.5-1.5m1.5 1.5v-1.5m1.5 1.5V1.5M9 3.75l1.5 1.5-1.5-1.5M9 3.75V1.5M9 3.75v1.5M6 6.75l-1.5 1.5 1.5 1.5M6 6.75V9m-1.5-1.5V9m1.5-1.5H3M18.75 9l-1.5-1.5-1.5 1.5M18.75 9V6.75m1.5 1.5V6.75m-1.5 1.5h2.25" /></IconBase>
);

export const LinkIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></IconBase>
);

export const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></IconBase>
);

export const LogOutIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" /></IconBase>
);

export const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></IconBase>
);

export const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25c0 5.385 4.365 9.75 9.75 9.75 2.572 0 4.92-.99 6.752-2.648z" /></IconBase>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></IconBase>
);

export const UserCheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m6 2.25c0 3.15-2.5 5.625-5.625 5.625A5.625 5.625 0 0112 18c-3.15 0-5.625-2.5-5.625-5.625A5.625 5.625 0 0112 6.75c3.15 0 5.625 2.5 5.625 5.625z" /></IconBase>
);

export const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286z" /></IconBase>
);

export const UserGroupIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.928A9.095 9.095 0 0112 5.25c2.718 0 4.927 1.04 6.022 2.61m-1.5 0A7.5 7.5 0 1113.5 5.25v2.34" /></IconBase>
);

export const ActivityLogIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" /></IconBase>
);

export const MegaphoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <IconBase className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></IconBase>
);


// --- MOCK DATA ---

export const MOCK_USERS: User[] = [
  { id: 's1', name: 'Student User', email: 'student@rgukt.in', role: Role.STUDENT },
  { id: 'a1', name: 'Admin One', email: 'admin@rgukt.in', role: Role.ADMIN },
  { id: 'c1', name: 'Central Head', email: 'o220202@rguktong.ac.in', role: Role.CENTRAL },
];

export const MOCK_ADMIN_USERS: AdminUser[] = [
    { id: 'a1', name: 'Admin One', email: 'admin@rgukt.in', role: Role.ADMIN, status: 'Approved' },
    { id: 'a2', name: 'Pending Admin', email: 'pending.admin@rgukt.in', role: Role.ADMIN, status: 'Pending' },
    { id: 'a3', name: 'Revoked Admin', email: 'revoked.admin@rgukt.in', role: Role.ADMIN, status: 'Revoked' },
];

export const MOCK_NOTICES: Notice[] = [
    { id: 'n7', title: 'Radio Cell: Special Broadcast', content: 'Tune in for a special broadcast featuring an interview with the college dean. Audio promo attached.', category: NoticeCategory.COLLEGE, author: 'Radio Cell', date: '2023-10-28', file: { name: 'dean_interview_promo.mp3', type: 'audio', url: '#' } },
    { id: 'n6', title: 'Photography Club: Photo Walk', content: 'Join us for a scenic photo walk this Sunday. All are welcome. Poster attached.', category: NoticeCategory.CLUB, author: 'Photography Club', date: '2023-10-27', file: { name: 'photowalk_poster.jpg', type: 'image', url: '#' } },
    { id: 'n1', title: 'Placement Drive: TechCorp', content: 'Final year students are invited to a placement drive by TechCorp. Register by EOD.', category: NoticeCategory.PLACEMENTS, author: 'Placement Cell', date: '2023-10-26' },
    { id: 'n2', title: 'Annual Tech Fest "Innovate"', content: 'Get ready for Innovate 2023! Coding competitions, project expos, and more.', category: NoticeCategory.TECHNICAL, author: 'CSE Dept', date: '2023-10-25', file: { name: 'innovate_brochure.pdf', type: 'pdf', url: '#' }},
    { id: 'n3', title: 'Music Club Auditions', content: 'Auditions for singers and instrumentalists this Friday at the auditorium.', category: NoticeCategory.CLUB, author: 'Music Club', date: '2023-10-24' },
    { id: 'n4', title: 'Library Closure Notice', content: 'The central library will be closed this weekend for maintenance.', category: NoticeCategory.COLLEGE, author: 'Admin Office', date: '2023-10-23' },
    { id: 'n5', title: 'Guest Lecture on AI', content: 'Dr. Anya Sharma will deliver a talk on the future of Artificial Intelligence.', category: NoticeCategory.TECHNICAL, author: 'ECE Dept', date: '2023-10-22' },
];

export const MOCK_RADIO_SCHEDULE: RadioSchedule[] = [
    { id: 'r1', title: 'Morning Melodies', time: '8:00 AM', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
    { id: 'r2', title: 'Campus News Bulletin', time: '1:00 PM', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
    { id: 'r3', title: 'Evening Unwind Session', time: '6:00 PM', audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
];

export const MOCK_GALLERY_IMAGES: GalleryImage[] = [
    { id: 'g1', url: 'https://via.placeholder.com/400x300.png/0000FF/808080?text=Campus+View', caption: 'Scenic view of the main campus building.' },
    { id: 'g2', url: 'https://via.placeholder.com/400x300.png/FF0000/FFFFFF?text=Tech+Fest+2023', caption: 'Students at the annual tech fest.' },
    { id: 'g3', url: 'https://via.placeholder.com/400x300.png/00FF00/000000?text=Sports+Day', caption: 'Annual sports day celebrations.' },
];

export const MOCK_CHAT_MESSAGES = [
    { id: 'm1', user: 'Rohan', text: 'When is the deadline for the hackathon registration?' },
    { id: 'm2', user: 'Priya', text: 'I think it\'s tomorrow. Check the notice.' },
];

export const MOCK_ACCESS_LOGS: AccessLog[] = [
    { id: 'l1', user: 'Admin One', role: Role.ADMIN, action: 'Uploaded a new notice', timestamp: '2023-10-26 10:00 AM' },
    { id: 'l2', user: 'Student User', role: Role.STUDENT, action: 'Logged in', timestamp: '2023-10-26 09:30 AM' },
    { id: 'l3', user: 'Central Head', role: Role.CENTRAL, action: 'Revoked access for revoked.admin@rgukt.in', timestamp: '2023-10-25 05:00 PM' },
];

export const MOCK_BUZZ_POSTS: BuzzPost[] = [
    { id: 'b1', author: 'Anonymous', content: 'Anyone else excited for the DJ night this weekend? 🎉', timestamp: '2 hours ago' },
    { id: 'b2', author: 'Riya S.', content: 'Lost a blue water bottle near the library. Please return if found!', timestamp: '5 hours ago' },
    { id: 'b3', author: 'Vikram', content: 'The new biryani in the canteen is surprisingly good!', timestamp: '1 day ago' },
];

export const GPA_DATA = {
  branches: ['CSE', 'ECE', 'MECH', 'CHEM', 'CIVIL'],
  semesters: ['E1 Sem 1', 'E1 Sem 2', 'E2 Sem 1', 'E2 Sem 2'],
  grades: { 'ex': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'R': 0 },
  subjects: {
    CSE: {
      'E1 Sem 1': [
        { name: 'Programming in C', credits: 4 },
        { name: 'BEEE', credits: 3 },
        { name: 'CLA', credits: 4 },
        {name : 'english lab',credits:1.5},
        {name : 'Pragamming in c lab',credits:1.5},
        {name : 'BEEE lab',credits:1.5},
        {name : 'Engineering graphics and computer drawing',credits:1.5},

      ],
      'E1 Sem 2': [
        { name: 'Data Structures', credits: 3 },
        { name: 'Engineering Pysics', credits: 4 },
        { name: 'java', credits: 4 },
        { name: 'maths', credits: 4 },
        {name : 'java lab',credits:1.5},
        {name : 'Engineering physics lab',credits:1.5},
        {name : 'DAta Structures lab',credits:1.5},
      ],
      'E2 Sem 1': [
        {name : 'probability & Statistics',credits:4},
        { name: 'Design Analysis and algorithms', credits: 4 },
        { name: 'DBMS', credits: 3 },
        { name: 'DLD', credits: 4 },
        {name : 'Design Analysis and Algorithms lab',credits:1.5},
        {name : 'Database MAnagement System LAB',credits:1.5},
        {name : 'Digital Logic Design lab',credits:1.5},
      ],
          },
    ECE: {
        'E1 Sem 1': [
          { name: 'Basic Electronics', credits: 4 },
          { name: 'Engineering Chemistry', credits: 3 },
          { name: 'Mathematics-I', credits: 4 },
        ],
    }
  }
};