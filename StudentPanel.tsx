import React, { useState, useMemo } from 'react';
import { Notice, NoticeCategory, RadioSchedule, User, GalleryImage, BuzzPost } from '../types';
import { MOCK_NOTICES, MOCK_RADIO_SCHEDULE, GPA_DATA, MOCK_CHAT_MESSAGES, MOCK_GALLERY_IMAGES, MOCK_BUZZ_POSTS, FileIcon, DashboardIcon, ClubIcon, CodeIcon, CelebrateIcon, BuildingIcon, RadioIcon, CalculatorIcon, ChatIcon, GalleryIcon, BriefcaseIcon, LinkIcon, MegaphoneIcon } from '../constants';
import Card from './ui/Card';

// --- Sub-Components for different views ---

const NoticeItem: React.FC<{ notice: Notice }> = ({ notice }) => (
  <Card className="flex flex-col h-full">
    <span className={`px-2 py-1 text-xs font-semibold rounded-full self-start mb-2 ${notice.category === NoticeCategory.PLACEMENTS ? 'bg-green-200 text-green-800' : 'bg-brand-accent text-brand-primary'}`}>
      {notice.category}
    </span>
    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">{notice.title}</h3>
    <p className="text-gray-600 dark:text-gray-400 flex-grow mb-4">{notice.content}</p>
    {notice.file && (
        <a href={notice.file.url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm text-brand-primary dark:text-brand-accent hover:underline">
          <FileIcon className="w-4 h-4 mr-2"/>
          {notice.file.name}
        </a>
    )}
    <div className="border-t dark:border-gray-600 mt-4 pt-2 text-sm text-gray-500 dark:text-gray-500">
      <span>By {notice.author}</span> &bull; <span>{notice.date}</span>
    </div>
  </Card>
);

const Dashboard: React.FC = () => {
    const upcomingEvents = MOCK_NOTICES.slice(0, 3);
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Dashboard</h2>
            <Card>
                <h3 className="text-xl font-semibold mb-4">Important & Upcoming Events</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {upcomingEvents.map(notice => <NoticeItem key={notice.id} notice={notice} />)}
                </div>
            </Card>
        </div>
    );
};

const NoticeListView: React.FC<{category: NoticeCategory | 'All'}> = ({ category }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const filteredNotices = useMemo(() => {
        return MOCK_NOTICES
            .filter(notice => category === 'All' || notice.category === category)
            .filter(notice => notice.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [category, searchTerm]);

    return (
         <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">{category}</h2>
            <input
                type="text"
                placeholder="Search notices..."
                className="w-full p-3 mb-6 rounded-md bg-white dark:bg-dark-surface border border-gray-300 dark:border-gray-600 focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            {filteredNotices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotices.map(notice => <NoticeItem key={notice.id} notice={notice} />)}
                </div>
            ) : (
                <Card className="text-center">
                    <p className="text-gray-500 dark:text-gray-400">No notices found in this category.</p>
                </Card>
            )}
        </div>
    );
};


const CollegeRadio: React.FC = () => {
    const [schedule] = useState<RadioSchedule[]>(MOCK_RADIO_SCHEDULE);
    const [currentTrack, setCurrentTrack] = useState<RadioSchedule>(schedule[0]);

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">College Radio</h2>
            <Card>
                <div className="space-y-4">
                    <div className="p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                        <p className="font-semibold text-lg dark:text-white">Now Playing: {currentTrack.title}</p>
                        <audio controls src={currentTrack.audioSrc} className="w-full mt-2">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2 dark:text-gray-200">Daily Schedule</h3>
                        <ul className="space-y-2">
                            {schedule.map(item => (
                                <li key={item.id} className={`p-3 rounded-md cursor-pointer transition-colors ${currentTrack.id === item.id ? 'bg-brand-secondary text-white' : 'bg-gray-50 dark:bg-dark-surface hover:bg-gray-200 dark:hover:bg-gray-700'}`} onClick={() => setCurrentTrack(item)}>
                                    <span className="font-bold">{item.time}:</span> {item.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
};

const GpaCalculator: React.FC = () => {
    const [branch, setBranch] = useState<string>('CSE');
    const [semester, setSemester] = useState<string>('Sem 1');
    const [grades, setGrades] = useState<{ [key: string]: string }>({});
    const [gpa, setGpa] = useState<number | null>(null);
    const currentSubjects = (GPA_DATA.subjects as any)[branch]?.[semester] || [];
    
    const handleGradeChange = (subjectName: string, grade: string) => {
        setGrades(prev => ({ ...prev, [subjectName]: grade }));
    };

    const calculateGpa = () => {
        let totalCredits = 0;
        let weightedSum = 0;
        currentSubjects.forEach((subject: { name: string, credits: number }) => {
            const grade = grades[subject.name];
            if (grade) {
                totalCredits += subject.credits;
                weightedSum += GPA_DATA.grades[grade as keyof typeof GPA_DATA.grades] * subject.credits;
            }
        });
        if (totalCredits > 0) {
            setGpa(weightedSum / totalCredits);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">GPA Calculator</h2>
            <Card>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                     <select value={branch} onChange={e => setBranch(e.target.value)} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text">
                         {GPA_DATA.branches.map(b => <option key={b} value={b}>{b}</option>)}
                     </select>
                     <select value={semester} onChange={e => setSemester(e.target.value)} className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text">
                        {GPA_DATA.semesters.map(s => <option key={s} value={s}>{s}</option>)}
                     </select>
                 </div>
                 <div className="space-y-3 mb-4">
                    {currentSubjects.map((subject: { name: string, credits: number }) => (
                        <div key={subject.name} className="flex items-center justify-between">
                            <label className="dark:text-gray-300">{subject.name} ({subject.credits} credits)</label>
                            <select onChange={e => handleGradeChange(subject.name, e.target.value)} className="w-24 p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent text-gray-900 dark:text-dark-text">
                                <option value="">Select</option>
                                {Object.keys(GPA_DATA.grades).map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                    ))}
                 </div>
                 <button onClick={calculateGpa} className="w-full bg-brand-primary text-white py-2 rounded-md hover:bg-brand-secondary">Calculate</button>
                 {gpa !== null && (
                     <div className="mt-4 text-center">
                         <h3 className="text-xl font-bold dark:text-white">Your GPA: <span className="text-brand-primary dark:text-brand-accent">{gpa.toFixed(2)}</span></h3>
                     </div>
                 )}
            </Card>
        </div>
    );
};

const StudentChat: React.FC = () => {
    const [messages] = useState(MOCK_CHAT_MESSAGES);
    const [newMessage, setNewMessage] = useState('');

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Event Discussion</h2>
            <Card className="flex flex-col h-[calc(100vh-250px)]">
                <div className="flex-grow bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-y-auto space-y-4">
                    {messages.map(msg => (
                        <div key={msg.id} className="flex flex-col">
                            <span className="font-bold text-sm text-brand-primary dark:text-brand-accent">{msg.user}</span>
                            <div className="bg-white dark:bg-dark-surface p-3 rounded-lg max-w-xs">{msg.text}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex gap-2">
                    <input type="text" value={newMessage} onChange={e => setNewMessage(e.target.value)} placeholder="Type a message..." className="flex-grow p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text" />
                    <button className="bg-brand-primary text-white px-4 py-2 rounded-md hover:bg-brand-secondary">Send</button>
                </div>
            </Card>
        </div>
    );
};

const CampusBuzz: React.FC<{user: User}> = ({user}) => {
    const [posts, setPosts] = useState<BuzzPost[]>(MOCK_BUZZ_POSTS);
    const [newPost, setNewPost] = useState('');

    const handlePost = () => {
        if(newPost.trim() === '') return;
        const post: BuzzPost = {
            id: `b${Date.now()}`,
            author: user.name,
            content: newPost,
            timestamp: 'Just now'
        };
        setPosts([post, ...posts]);
        setNewPost('');
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Campus Buzz</h2>
            <Card className="mb-6">
                <textarea 
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text"
                />
                <button onClick={handlePost} className="mt-2 w-full bg-brand-primary text-white py-2 rounded-md hover:bg-brand-secondary">Post</button>
            </Card>
            <div className="space-y-4">
                {posts.map(post => (
                    <Card key={post.id}>
                        <p className="text-gray-800 dark:text-gray-100">{post.content}</p>
                        <div className="mt-2 text-sm text-gray-500 dark:text-gray-500">
                            <span>By {post.author}</span> &bull; <span>{post.timestamp}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

const CollegeGallery: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">College Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_GALLERY_IMAGES.map(image => (
                    <Card key={image.id} className="p-0 overflow-hidden">
                        <img src={image.url} alt={image.caption} className="w-full h-48 object-cover"/>
                        <p className="p-4 text-center text-gray-700 dark:text-gray-300">{image.caption}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const ExternalLinks: React.FC = () => (
    <div>
        <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">External Links</h2>
        <Card>
            <ul className="space-y-3">
                <li><a href="#" className="text-lg text-brand-primary dark:text-brand-accent hover:underline">Official RGUKT Website</a></li>
                <li><a href="#" className="text-lg text-brand-primary dark:text-brand-accent hover:underline">Academic Resources</a></li>
                <li><a href="#" className="text-lg text-brand-primary dark:text-brand-accent hover:underline">Examination Portal</a></li>
            </ul>
        </Card>
    </div>
);


const NAV_ITEMS = [
    { name: 'Dashboard', icon: DashboardIcon, category: 'Dashboard' },
    { name: 'Club Events', icon: ClubIcon, category: NoticeCategory.CLUB },
    { name: 'Technical Events', icon: CodeIcon, category: NoticeCategory.TECHNICAL },
    { name: 'Non-Technical', icon: CelebrateIcon, category: NoticeCategory.NON_TECHNICAL },
    { name: 'College Updates', icon: BuildingIcon, category: NoticeCategory.COLLEGE },
    { name: 'Placements', icon: BriefcaseIcon, category: NoticeCategory.PLACEMENTS },
    { name: 'College Radio', icon: RadioIcon, category: 'Radio' },
    { name: 'GPA Calculator', icon: CalculatorIcon, category: 'GPA' },
    { name: 'Chat', icon: ChatIcon, category: 'Chat' },
    { name: 'Campus Buzz', icon: MegaphoneIcon, category: 'Buzz' },
    { name: 'Gallery', icon: GalleryIcon, category: 'Gallery' },
    { name: 'Links', icon: LinkIcon, category: 'Links' },
];

const Sidebar: React.FC<{ activeView: string; setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => (
    <aside className="w-64 bg-white dark:bg-dark-surface p-4 flex-shrink-0">
        <nav className="space-y-2">
            {NAV_ITEMS.map(item => (
                <button
                    key={item.name}
                    onClick={() => setActiveView(item.category)}
                    className={`w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                        activeView === item.category
                            ? 'bg-brand-primary text-white'
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                >
                    <item.icon className="w-5 h-5 mr-3" />
                    {item.name}
                </button>
            ))}
        </nav>
    </aside>
);

// --- Main Student Panel Component ---
const StudentPanel: React.FC<{ user: User }> = ({ user }) => {
  const [activeView, setActiveView] = useState('Dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'Dashboard': return <Dashboard />;
      case NoticeCategory.CLUB: return <NoticeListView category={NoticeCategory.CLUB} />;
      case NoticeCategory.TECHNICAL: return <NoticeListView category={NoticeCategory.TECHNICAL} />;
      case NoticeCategory.NON_TECHNICAL: return <NoticeListView category={NoticeCategory.NON_TECHNICAL} />;
      case NoticeCategory.COLLEGE: return <NoticeListView category={NoticeCategory.COLLEGE} />;
      case NoticeCategory.PLACEMENTS: return <NoticeListView category={NoticeCategory.PLACEMENTS} />;
      case 'Radio': return <CollegeRadio />;
      case 'GPA': return <GpaCalculator />;
      case 'Chat': return <StudentChat />;
      case 'Buzz': return <CampusBuzz user={user} />;
      case 'Gallery': return <CollegeGallery />;
      case 'Links': return <ExternalLinks />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex h-full">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-grow p-6 overflow-y-auto">
            {renderContent()}
        </main>
    </div>
  );
};

export default StudentPanel;