import React, { useState } from 'react';
import { User, AdminUser, AccessLog, Notice, NoticeCategory, BuzzPost } from '../types';
import { MOCK_ADMIN_USERS, MOCK_ACCESS_LOGS, MOCK_NOTICES, MOCK_BUZZ_POSTS, DashboardIcon, UserGroupIcon, ActivityLogIcon, UploadIcon, BriefcaseIcon, RadioIcon, MegaphoneIcon } from '../constants';
import Card from './ui/Card';

// --- Sub-Components for Central Panel ---

const Dashboard: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Central Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <Card className="text-center">
                    <h3 className="text-4xl font-bold text-brand-primary dark:text-brand-accent">{MOCK_ADMIN_USERS.length}</h3>
                    <p>Total Admins</p>
                </Card>
                 <Card className="text-center">
                    <h3 className="text-4xl font-bold text-brand-primary dark:text-brand-accent">{MOCK_ACCESS_LOGS.length}</h3>
                    <p>Recent Activities</p>
                </Card>
                <Card className="text-center">
                    <h3 className="text-4xl font-bold text-brand-primary dark:text-brand-accent">{MOCK_NOTICES.length}</h3>
                    <p>Total Notices</p>
                </Card>
            </div>
            <div className="mt-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">System Status</h3>
                 <Card>
                    <p className="text-green-600 dark:text-green-400">System is operating normally.</p>
                </Card>
            </div>
        </div>
    );
};

const ManageAdmins: React.FC = () => {
    const [admins, setAdmins] = useState<AdminUser[]>(MOCK_ADMIN_USERS);

    const handleStatusChange = (id: string, newStatus: 'Approved' | 'Pending' | 'Revoked') => {
        setAdmins(currentAdmins => 
            currentAdmins.map(admin => 
                admin.id === id ? { ...admin, status: newStatus } : admin
            )
        );
    };

    const getStatusColor = (status: 'Approved' | 'Pending' | 'Revoked') => {
        switch (status) {
            case 'Approved': return 'bg-green-200 text-green-800';
            case 'Pending': return 'bg-yellow-200 text-yellow-800';
            case 'Revoked': return 'bg-red-200 text-red-800';
        }
    }

    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Manage Admins</h2>
            <Card>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="p-3">Name</th>
                                <th className="p-3">Email</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {admins.map(admin => (
                                <tr key={admin.id} className="border-b dark:border-gray-700">
                                    <td className="p-3">{admin.name}</td>
                                    <td className="p-3">{admin.email}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(admin.status)}`}>
                                            {admin.status}
                                        </span>
                                    </td>
                                    <td className="p-3 space-x-2">
                                        <select
                                            value={admin.status}
                                            onChange={(e) => handleStatusChange(admin.id, e.target.value as 'Approved' | 'Pending' | 'Revoked')}
                                            className="text-sm p-1 rounded-md bg-gray-200 dark:bg-gray-700 border-transparent text-gray-900 dark:text-dark-text"
                                        >
                                            <option value="Approved">Approve</option>
                                            <option value="Pending">Set to Pending</option>
                                            <option value="Revoked">Revoke</option>
                                        </select>
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

const AccessLogs: React.FC = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">Access Logs</h2>
            <Card>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-100 dark:bg-gray-800">
                            <tr>
                                <th className="p-3">User</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Action</th>
                                <th className="p-3">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MOCK_ACCESS_LOGS.map(log => (
                                <tr key={log.id} className="border-b dark:border-gray-700">
                                    <td className="p-3">{log.user}</td>
                                    <td className="p-3">{log.role}</td>
                                    <td className="p-3">{log.action}</td>
                                    <td className="p-3">{log.timestamp}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

// --- Sub-Components from Admin Panel ---

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
            title, content, category,
            author: 'Central Panel',
            date: new Date().toISOString().split('T')[0],
            file: file && fileType ? { name: file.name, type: fileType, url: '#' } : undefined
        };
        onAddNotice(newNotice);
        setTitle(''); setContent(''); setCategory(NoticeCategory.GENERAL); setFile(null);
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
                    <input type="file" onChange={e => setFile(e.target.files ? e.target.files[0] : null)} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-accent file:text-brand-primary hover:file:bg-amber-200" accept="application/pdf,image/*,audio/*"/>
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
                            <tr><th className="p-3">Title</th><th className="p-3">Category</th><th className="p-3">Date</th><th className="p-3">Actions</th></tr>
                        </thead>
                        <tbody>
                            {notices.map(notice => (
                                <tr key={notice.id} className="border-b dark:border-gray-700">
                                    <td className="p-3">{notice.title}</td><td className="p-3">{notice.category}</td><td className="p-3">{notice.date}</td>
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

// --- Navigation ---
const NAV_ITEMS = [
    { name: 'Dashboard', icon: DashboardIcon, view: 'Dashboard' },
    { name: 'Manage Admins', icon: UserGroupIcon, view: 'Admins' },
    { name: 'Access Logs', icon: ActivityLogIcon, view: 'Logs' },
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

// --- Main Central Panel Component ---
const CentralPanel: React.FC<{ user: User }> = ({ user }) => {
    const [activeView, setActiveView] = useState('Dashboard');
    const [notices, setNotices] = useState<Notice[]>(MOCK_NOTICES);
    const [buzzPosts, setBuzzPosts] = useState<BuzzPost[]>(MOCK_BUZZ_POSTS);

    const addNotice = (notice: Notice) => {
        setNotices(prev => [notice, ...prev]);
        setActiveView('Manage');
    };

    const renderContent = () => {
        switch (activeView) {
            case 'Dashboard': return <Dashboard />;
            case 'Admins': return <ManageAdmins />;
            case 'Logs': return <AccessLogs />;
            case 'Upload': return <NoticeUploader onAddNotice={addNotice} />;
            case 'Manage': return <ManageEvents notices={notices} setNotices={setNotices} />;
            case 'Radio': return <ManageRadio />;
            case 'Buzz': return <ManageCampusBuzz buzzPosts={buzzPosts} setBuzzPosts={setBuzzPosts} />;
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

export default CentralPanel;