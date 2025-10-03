import React, { useState } from 'react';
import { Notice, NoticeCategory, RadioSchedule, User, BuzzPost } from '../types';
import { MOCK_NOTICES, MOCK_RADIO_SCHEDULE, MOCK_BUZZ_POSTS, DashboardIcon, UploadIcon, BriefcaseIcon, RadioIcon, MegaphoneIcon } from '../constants';
import Card from './ui/Card';

// --- Sub-Components for different views ---

const Dashboard: React.FC<{notices: Notice[], onNavigate: (view: string) => void}> = ({notices, onNavigate}) => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Admin Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <Card className="text-center">
                    <h3 className="text-4xl font-bold text-brand-primary dark:text-brand-accent">{notices.length}</h3>
                    <p>Total Notices</p>
                </Card>
                 <Card className="text-center">
                    <h3 className="text-4xl font-bold text-brand-primary dark:text-brand-accent">{MOCK_RADIO_SCHEDULE.length}</h3>
                    <p>Scheduled Radio Tracks</p>
                </Card>
                <Card className="text-center bg-brand-primary text-white hover:bg-brand-secondary cursor-pointer" onClick={() => onNavigate('Upload')}>
                    <UploadIcon className="w-10 h-10 mx-auto mb-2"/>
                    <h3 className="text-xl font-bold">Upload New Notice</h3>
                </Card>
            </div>
        </div>
    )
}

const NoticeUploader: React.FC<{ onAddNotice: (notice: Notice) => void }> = ({ onAddNotice }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState<NoticeCategory>(NoticeCategory.GENERAL);
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const getFileType = (file: File): 'pdf' | 'image' | 'audio' | undefined => {
            if (file.type.startsWith('image/')) return 'image';
            if (file.type.startsWith('audio/')) return 'audio';
            if (file.type === 'application/pdf') return 'pdf';
            return undefined;
        };
        
        const fileType = file ? getFileType(file) : undefined;

        if (file && !fileType) {
            alert("Unsupported file type. Please upload a PDF, image, or audio file.");
            return;
        }
        
        const newNotice: Notice = {
            id: `n${Date.now()}`,
            title,
            content,
            category,
            author: 'Admin User',
            date: new Date().toISOString().split('T')[0],
            file: file && fileType ? { name: file.name, type: fileType, url: '#' } : undefined
        };
        onAddNotice(newNotice);
        setTitle('');
        setContent('');
        setCategory(NoticeCategory.GENERAL);
        setFile(null);
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Upload New Notice</h2>
            <Card>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text" />
                    <textarea placeholder="Content" value={content} onChange={e => setContent(e.target.value)} required className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text h-32" />
                    <select value={category} onChange={e => setCategory(e.target.value as NoticeCategory)} className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text">
                        {Object.values(NoticeCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <input 
                        type="file" 
                        onChange={e => setFile(e.target.files ? e.target.files[0] : null)} 
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent file:text-brand-primary hover:file:bg-amber-200"
                        accept="application/pdf,image/*,audio/*"
                    />
                    <button type="submit" className="w-full bg-brand-primary text-white py-2 rounded-md hover:bg-brand-secondary">Upload Notice</button>
                </form>
            </Card>
        </div>
    );
};

const ManageEvents: React.FC<{ notices: Notice[], setNotices: React.Dispatch<React.SetStateAction<Notice[]>> }> = ({ notices, setNotices }) => {
    const deleteNotice = (id: string) => {
        setNotices(currentNotices => currentNotices.filter(n => n.id !== id));
    };
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Manage Notices</h2>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Category</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notices.map(notice => (
                                <tr key={notice.id} className="border-b dark:border-gray-700">
                                    <td className="p-3">{notice.title}</td>
                                    <td className="p-3">{notice.category}</td>
                                    <td className="p-3">{notice.date}</td>
                                    <td className="p-3 space-x-2">
                                        <button className="text-sm text-blue-500 hover:underline">Edit</button>
                                        <button onClick={() => deleteNotice(notice.id)} className="text-sm text-red-500 hover:underline">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

const ManageRadio: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Manage Radio Content</h2>
            <Card>
                <form className="space-y-4">
                    <input type="text" placeholder="Track Title" required className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text" />
                    <input type="text" placeholder="Schedule Time (e.g., 9:00 AM)" required className="w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent focus:ring-brand-primary focus:border-brand-primary text-gray-900 dark:text-dark-text" />
                    <input type="file" accept="audio/*" className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent file:text-brand-primary hover:file:bg-amber-200" />
                    <button type="submit" className="w-full bg-brand-primary text-white py-2 rounded-md hover:bg-brand-secondary">Schedule Track</button>
                </form>
            </Card>
        </div>
    );
};

const ManageCampusBuzz: React.FC<{ buzzPosts: BuzzPost[], setBuzzPosts: React.Dispatch<React.SetStateAction<BuzzPost[]>> }> = ({ buzzPosts, setBuzzPosts }) => {
    const deletePost = (id: string) => {
        setBuzzPosts(currentPosts => currentPosts.filter(p => p.id !== id));
    };
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Manage Campus Buzz</h2>
            <div className="space-y-4">
                {buzzPosts.map(post => (
                    <Card key={post.id} className="flex justify-between items-center">
                        <div>
                            <p>{post.content}</p>
                            <p className="text-sm text-gray-500">By {post.author} &bull; {post.timestamp}</p>
                        </div>
                        <button onClick={() => deletePost(post.id)} className="text-sm text-red-500 hover:underline">Delete</button>
                    </Card>
                ))}
            </div>
        </div>
    );
};


const NAV_ITEMS = [
    { name: 'Dashboard', icon: DashboardIcon, view: 'Dashboard' },
    { name: 'Upload Notice', icon: UploadIcon, view: 'Upload' },
    { name: 'Manage Notices', icon: BriefcaseIcon, view: 'Manage' },
    { name: 'Manage Radio', icon: RadioIcon, view: 'Radio' },
    { name: 'Manage Buzz', icon: MegaphoneIcon, view: 'Buzz' },
];

const Sidebar: React.FC<{ activeView: string; setActiveView: (view: string) => void }> = ({ activeView, setActiveView }) => (
    <aside className="w-64 bg-white dark:bg-dark-surface p-4 flex-shrink-0">
        <nav className="space-y-2">
            {NAV_ITEMS.map(item => (
                <button
                    key={item.name}
                    onClick={() => setActiveView(item.view)}
                    className={`w-full flex items-center px-4 py-2 text-left text-sm font-medium rounded-md transition-colors ${
                        activeView === item.view
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

// --- Main Admin Panel Component ---
const AdminPanel: React.FC<{ user: User }> = ({ user }) => {
    const [activeView, setActiveView] = useState('Dashboard');
    const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
    const [buzzPosts, setBuzzPosts] = useState<BuzzPost[]>(MOCK_BUZZ_POSTS);

    const addNotice = (notice: Notice) => {
        setNotices(prev => [notice, ...prev]);
        setActiveView('Manage');
    };

    const renderContent = () => {
        switch (activeView) {
            case 'Dashboard': return <Dashboard notices={notices} onNavigate={setActiveView} />;
            case 'Upload': return <NoticeUploader onAddNotice={addNotice} />;
            case 'Manage': return <ManageEvents notices={notices} setNotices={setNotices} />;
            case 'Radio': return <ManageRadio />;
            case 'Buzz': return <ManageCampusBuzz buzzPosts={buzzPosts} setBuzzPosts={setBuzzPosts} />;
            default: return <Dashboard notices={notices} onNavigate={setActiveView} />;
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

export default AdminPanel;