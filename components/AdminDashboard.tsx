import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileQuestion, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Save, 
  X,
  CheckCircle2,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { Question, User } from '../types';
import { MOCK_QUESTIONS } from '../constants';

interface AdminDashboardProps {
  onLogout: () => void;
}

// Mock Users Data
const MOCK_USERS: User[] = [
  { id: 'u1', name: 'John Doe', email: 'john@example.com', plan: 'Premium', status: 'Active', joinedDate: '2024-02-15' },
  { id: 'u2', name: 'Sarah Smith', email: 'sarah@test.com', plan: 'Free', status: 'Active', joinedDate: '2024-02-18' },
  { id: 'u3', name: 'Mike Johnson', email: 'mike@family.com', plan: 'Family', status: 'Active', joinedDate: '2024-02-20' },
  { id: 'u4', name: 'Emily Davis', email: 'emily@school.edu', plan: 'Free', status: 'Expired', joinedDate: '2023-11-05' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'users' | 'settings'>('overview');
  
  // CMS State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({});
  const [searchTerm, setSearchTerm] = useState('');

  // Login Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      loadQuestions();
    } else {
      alert('Invalid credentials! (Try admin/admin123)');
    }
  };

  // Load Questions from LocalStorage or Default
  const loadQuestions = () => {
    const stored = localStorage.getItem('cms_questions');
    if (stored) {
      try {
        setQuestions(JSON.parse(stored));
      } catch (e) {
        setQuestions([...MOCK_QUESTIONS]);
      }
    } else {
      setQuestions([...MOCK_QUESTIONS]);
    }
  };

  // Save Questions to LocalStorage
  const saveQuestions = (newQuestions: Question[]) => {
    setQuestions(newQuestions);
    localStorage.setItem('cms_questions', JSON.stringify(newQuestions));
  };

  const handleDeleteQuestion = (id: number) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const updated = questions.filter(q => q.id !== id);
      saveQuestions(updated);
    }
  };

  const handleEditQuestion = (q: Question) => {
    setCurrentQuestion(q);
    setIsEditing(true);
  };

  const handleAddNew = () => {
    setCurrentQuestion({
      id: Date.now(), // Generate rough ID
      text: '',
      options: ['', '', '', ''],
      correctIndex: 0,
      category: 'Road Rules',
      explanation: ''
    });
    setIsEditing(true);
  };

  const handleSaveQuestion = () => {
    if (!currentQuestion.text || !currentQuestion.options) return;

    let updatedQuestions = [...questions];
    const existingIndex = questions.findIndex(q => q.id === currentQuestion.id);

    if (existingIndex >= 0) {
      updatedQuestions[existingIndex] = currentQuestion as Question;
    } else {
      updatedQuestions.push(currentQuestion as Question);
    }

    saveQuestions(updatedQuestions);
    setIsEditing(false);
    setCurrentQuestion({});
  };

  // Filtered Questions
  const filteredQuestions = questions.filter(q => 
    q.text.toLowerCase().includes(searchTerm.toLowerCase()) || 
    q.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-brand-dark flex items-center justify-center p-4">
        <div className="bg-brand-primary w-full max-w-md p-8 rounded-2xl border border-slate-700 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-slate-400">Secure Access Only</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                placeholder="••••••••"
              />
            </div>
            <button type="submit" className="w-full bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold py-3 rounded-xl transition-colors">
              Login
            </button>
            <button type="button" onClick={onLogout} className="w-full text-slate-500 text-sm hover:text-white transition-colors">
              Return to Website
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark font-sans flex">
      {/* Sidebar */}
      <aside className="w-64 bg-brand-primary border-r border-slate-800 flex flex-col fixed h-full z-20">
        <div className="p-6 border-b border-slate-800">
           <span className="font-black text-xl tracking-tighter">
                <span className="text-red-500">USA</span>
                <span className="text-white mx-1.5">DRIVING</span>
           </span>
           <div className="text-xs text-slate-500 font-mono mt-1">ADMIN CONSOLE v1.0</div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'overview' ? 'bg-brand-accent text-brand-dark' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={18} />
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('questions')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'questions' ? 'bg-brand-accent text-brand-dark' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <FileQuestion size={18} />
            Question Bank
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-brand-accent text-brand-dark' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Users size={18} />
            Users
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${activeTab === 'settings' ? 'bg-brand-accent text-brand-dark' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Settings size={18} />
            Settings
          </button>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="w-full flex items-center gap-2 text-red-400 hover:text-red-300 px-4 py-2 text-sm font-medium transition-colors">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-in fade-in">
            <h2 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h2>
            
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-500/10 rounded-lg text-green-500"><DollarSign size={24} /></div>
                  <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-1 rounded">+12%</span>
                </div>
                <div className="text-3xl font-bold text-white">$4,250</div>
                <div className="text-slate-400 text-sm">Monthly Revenue</div>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500"><Users size={24} /></div>
                  <span className="text-blue-400 text-xs font-bold bg-blue-500/10 px-2 py-1 rounded">+24</span>
                </div>
                <div className="text-3xl font-bold text-white">1,204</div>
                <div className="text-slate-400 text-sm">Active Users</div>
              </div>

              <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500"><FileQuestion size={24} /></div>
                </div>
                <div className="text-3xl font-bold text-white">{questions.length}</div>
                <div className="text-slate-400 text-sm">Total Questions</div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {[1,2,3].map(i => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-slate-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-slate-400">
                        <Users size={16} />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">New Premium Subscription</div>
                        <div className="text-slate-500 text-xs">2 hours ago</div>
                      </div>
                    </div>
                    <div className="text-green-400 font-bold text-sm">+$19.99</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* QUESTIONS CMS TAB */}
        {activeTab === 'questions' && (
          <div className="animate-in fade-in h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Question Management (CMS)</h2>
              <button onClick={handleAddNew} className="bg-brand-accent hover:bg-brand-accentHover text-brand-dark px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors">
                <Plus size={18} />
                Add Question
              </button>
            </div>

            <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 mb-6 flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search questions..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-slate-500"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto bg-slate-800 rounded-2xl border border-slate-700">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-900/50 sticky top-0">
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ID</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Question Text</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredQuestions.map(q => (
                    <tr key={q.id} className="hover:bg-slate-700/50 transition-colors">
                      <td className="p-4 text-slate-400 text-sm font-mono">{q.id}</td>
                      <td className="p-4 text-white text-sm max-w-lg truncate">{q.text}</td>
                      <td className="p-4 text-slate-300 text-sm">
                        <span className="bg-slate-700 px-2 py-1 rounded text-xs">{q.category}</span>
                      </td>
                      <td className="p-4 text-right flex justify-end gap-2">
                        <button onClick={() => handleEditQuestion(q)} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDeleteQuestion(q.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredQuestions.length === 0 && (
                <div className="p-8 text-center text-slate-500">No questions found matching your search.</div>
              )}
            </div>
          </div>
        )}

        {/* USERS TAB */}
        {activeTab === 'users' && (
           <div className="animate-in fade-in">
              <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
              <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-900/50">
                    <tr>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Name</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {MOCK_USERS.map(user => (
                      <tr key={user.id} className="hover:bg-slate-700/50">
                        <td className="p-4 text-white font-medium">{user.name}</td>
                        <td className="p-4 text-slate-400 text-sm">{user.email}</td>
                        <td className="p-4">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${user.plan === 'Premium' ? 'bg-amber-500/10 text-amber-500' : user.plan === 'Family' ? 'bg-purple-500/10 text-purple-500' : 'bg-slate-700 text-slate-300'}`}>
                            {user.plan}
                          </span>
                        </td>
                        <td className="p-4">
                           <span className={`flex items-center gap-1.5 text-xs font-bold ${user.status === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                             <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                             {user.status}
                           </span>
                        </td>
                        <td className="p-4 text-slate-500 text-sm">{user.joinedDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        )}
      </main>

      {/* EDIT MODAL */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-brand-primary w-full max-w-2xl rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800">
              <h3 className="text-xl font-bold text-white">{currentQuestion.id ? 'Edit Question' : 'Add New Question'}</h3>
              <button onClick={() => setIsEditing(false)} className="text-slate-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Question Text</label>
                <textarea 
                  value={currentQuestion.text || ''}
                  onChange={e => setCurrentQuestion({...currentQuestion, text: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent h-24 resize-none"
                  placeholder="Enter the question here..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                    <select 
                      value={currentQuestion.category || 'Road Rules'}
                      onChange={e => setCurrentQuestion({...currentQuestion, category: e.target.value})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                    >
                      <option>Road Rules</option>
                      <option>Road Signs</option>
                      <option>Safety & Driver Behavior</option>
                      <option>Driving Laws</option>
                      <option>Environment & Road Surface</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Correct Answer Index (0-3)</label>
                    <input 
                      type="number" 
                      min="0" max="3"
                      value={currentQuestion.correctIndex || 0}
                      onChange={e => setCurrentQuestion({...currentQuestion, correctIndex: parseInt(e.target.value)})}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent"
                    />
                 </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Options</label>
                <div className="space-y-3">
                  {[0, 1, 2, 3].map(idx => (
                    <div key={idx} className="flex items-center gap-3">
                      <span className="text-slate-500 font-mono w-4">{String.fromCharCode(65+idx)}</span>
                      <input 
                        type="text"
                        value={currentQuestion.options?.[idx] || ''}
                        onChange={e => {
                          const newOptions = [...(currentQuestion.options || [])];
                          newOptions[idx] = e.target.value;
                          setCurrentQuestion({...currentQuestion, options: newOptions});
                        }}
                        className={`w-full bg-slate-900 border rounded-lg px-4 py-2 text-white focus:outline-none ${idx === currentQuestion.correctIndex ? 'border-green-500 ring-1 ring-green-500/50' : 'border-slate-700 focus:border-brand-accent'}`}
                        placeholder={`Option ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Explanation</label>
                <textarea 
                  value={currentQuestion.explanation || ''}
                  onChange={e => setCurrentQuestion({...currentQuestion, explanation: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent h-20 resize-none"
                  placeholder="Why is this the correct answer?"
                />
              </div>
            </div>

            <div className="p-6 border-t border-slate-700 bg-slate-800 flex justify-end gap-3">
              <button onClick={() => setIsEditing(false)} className="px-6 py-3 rounded-xl font-bold text-slate-400 hover:text-white hover:bg-slate-700 transition-colors">
                Cancel
              </button>
              <button onClick={handleSaveQuestion} className="bg-brand-accent hover:bg-brand-accentHover text-brand-dark px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-colors">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;