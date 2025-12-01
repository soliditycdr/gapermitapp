import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Bot, Loader2, SkipForward, ArrowLeft, RotateCcw, Home, Award, Bookmark } from 'lucide-react';
import { StateConfig, Question } from '../types';
import { MOCK_QUESTIONS } from '../constants';
import { getAIExplanation } from '../services/geminiService';

interface PracticePageProps {
  selectedState: StateConfig;
  onClose: () => void;
}

interface QuestionState {
  selectedOption: number | null;
  isSubmitted: boolean;
  aiExplanation: string | null;
}

const STORAGE_KEY = 'usa_driving_test_progress_v1';

const PracticePage: React.FC<PracticePageProps> = ({ selectedState, onClose }) => {
  // Shuffled questions
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
  
  // Current position in the shuffled array
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // History of visited indices for "Previous" functionality
  const [history, setHistory] = useState<number[]>([]);

  // States for each question by ID
  const [questionStates, setQuestionStates] = useState<Record<number, QuestionState>>({});
  
  // Bookmarked Question IDs
  const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [isTestComplete, setIsTestComplete] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  // Initialize: Load from storage OR shuffle new
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    let loaded = false;

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate that the saved session is for the current state and has valid questions
        if (parsed.stateCode === selectedState.code && parsed.shuffledQuestions?.length > 0) {
          setShuffledQuestions(parsed.shuffledQuestions);
          setCurrentIndex(parsed.currentIndex);
          setHistory(parsed.history);
          setQuestionStates(parsed.questionStates);
          setBookmarkedIds(parsed.bookmarkedIds || []);
          setIsTestComplete(parsed.isTestComplete);
          setShowIntro(true); // Always show intro initially, allow user to choose Resume
          loaded = true;
        }
      } catch (e) {
        console.error("Failed to load progress", e);
      }
    }

    if (!loaded) {
      // CMS INTEGRATION: Check for admin-managed questions
      const cmsQuestions = localStorage.getItem('cms_questions');
      let baseQuestions = MOCK_QUESTIONS;
      
      if (cmsQuestions) {
        try {
            const parsedCms = JSON.parse(cmsQuestions);
            if (Array.isArray(parsedCms) && parsedCms.length > 0) {
                baseQuestions = parsedCms;
                console.log("Loaded questions from CMS");
            }
        } catch(e) {
            console.error("Failed to parse CMS questions", e);
        }
      }

      // Fisher-Yates shuffle for new test
      const shuffled = [...baseQuestions];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      setShuffledQuestions(shuffled);
      setCurrentIndex(0);
      setHistory([]);
      setQuestionStates({});
      setBookmarkedIds([]);
      setIsTestComplete(false);
    }
    
    setIsInitialized(true);
  }, [selectedState.code]);

  // Save progress effect
  useEffect(() => {
    if (!isInitialized || shuffledQuestions.length === 0) return;

    const progress = {
      stateCode: selectedState.code,
      shuffledQuestions,
      currentIndex,
      history,
      questionStates,
      bookmarkedIds,
      isTestComplete
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [shuffledQuestions, currentIndex, history, questionStates, bookmarkedIds, isTestComplete, selectedState.code, isInitialized]);

  // Helpers for navigation logic
  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
        setHistory(prev => [...prev, currentIndex]);
        setCurrentIndex(prev => prev + 1);
    } else {
        setIsTestComplete(true);
    }
  };

  const handlePrevious = () => {
    if (history.length === 0) return;
    const newHistory = [...history];
    const prevIndex = newHistory.pop();
    if (prevIndex !== undefined) {
        setHistory(newHistory);
        setCurrentIndex(prevIndex);
    }
  };

  const handleSkip = () => {
    // Just move to next without submitting, but keep current in history so we can go back
    if (currentIndex < shuffledQuestions.length - 1) {
        setHistory(prev => [...prev, currentIndex]);
        setCurrentIndex(prev => prev + 1);
    }
  };

  const handleStartTest = () => {
    setShowIntro(false);
  }

  const handleResumeTest = () => {
    setShowIntro(false);
  }

  const handleStartNewTest = () => {
      handleRetake();
      setShowIntro(false);
  }

  // Get state for active question or default
  const activeQuestion = shuffledQuestions[currentIndex] || MOCK_QUESTIONS[0];
  const currentQState = questionStates[activeQuestion?.id] || {
    selectedOption: null,
    isSubmitted: false,
    aiExplanation: null
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTestComplete || !isInitialized || showIntro) return;

      switch (e.key) {
        case 'ArrowLeft':
          handlePrevious();
          break;
        case 'ArrowRight':
          // If submitted, go Next. If not, Skip.
          if (currentQState.isSubmitted) {
            handleNext();
          } else {
            handleSkip();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTestComplete, isInitialized, currentQState.isSubmitted, currentIndex, history, shuffledQuestions, showIntro]);

  if (!isInitialized || shuffledQuestions.length === 0) {
    return (
        <div className="min-h-screen bg-brand-dark flex items-center justify-center">
            <Loader2 className="animate-spin text-brand-accent" size={32} />
        </div>
    );
  }

  const isBookmarked = bookmarkedIds.includes(activeQuestion.id);

  const updateQuestionState = (qId: number, updates: Partial<QuestionState>) => {
    setQuestionStates(prev => ({
      ...prev,
      [qId]: {
        ...(prev[qId] || { selectedOption: null, isSubmitted: false, aiExplanation: null }),
        ...updates
      }
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    let answered = 0;
    
    shuffledQuestions.forEach(q => {
      const state = questionStates[q.id];
      if (state && state.isSubmitted) {
        answered++;
        if (state.selectedOption === q.correctIndex) {
          correct++;
        }
      }
    });
    
    return { correct, answered, total: shuffledQuestions.length };
  };

  const scoreData = calculateScore();

  const handleOptionSelect = (optIdx: number) => {
    if (currentQState.isSubmitted) return;
    
    // Immediate submission
    updateQuestionState(activeQuestion.id, { 
      selectedOption: optIdx, 
      isSubmitted: true 
    });
  };

  const toggleBookmark = () => {
    setBookmarkedIds(prev => 
      prev.includes(activeQuestion.id) 
        ? prev.filter(id => id !== activeQuestion.id)
        : [...prev, activeQuestion.id]
    );
  };

  const handleRetake = () => {
    // Clear storage for a fresh start
    localStorage.removeItem(STORAGE_KEY);
    
    // Shuffle new questions from CMS or Default
    const cmsQuestions = localStorage.getItem('cms_questions');
    let baseQuestions = MOCK_QUESTIONS;
    if (cmsQuestions) {
        try {
            const parsedCms = JSON.parse(cmsQuestions);
            if (Array.isArray(parsedCms) && parsedCms.length > 0) {
              baseQuestions = parsedCms;
            }
        } catch(e) {}
    }

    const shuffled = [...baseQuestions];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    // Reset state
    setShuffledQuestions(shuffled);
    setCurrentIndex(0);
    setHistory([]);
    setQuestionStates({});
    setBookmarkedIds([]);
    setIsTestComplete(false);
  };

  const handleReviewBookmarks = () => {
    // Filter only bookmarked questions from the main list
    const bookmarkedQs = shuffledQuestions.filter(q => bookmarkedIds.includes(q.id));
    
    if (bookmarkedQs.length === 0) return;

    // Reset state with only bookmarked questions
    setShuffledQuestions(bookmarkedQs);
    setCurrentIndex(0);
    setHistory([]);
    setQuestionStates({});
    setIsTestComplete(false);
    // Note: We keep bookmarkedIds as is
  };

  const handleExitResults = () => {
    // If exiting from results, we consider the session done.
    localStorage.removeItem(STORAGE_KEY);
    onClose();
  };

  const askAI = async () => {
    setIsLoadingAi(true);
    const explanation = await getAIExplanation(
      activeQuestion.text,
      activeQuestion.options[activeQuestion.correctIndex],
      selectedState
    );
    updateQuestionState(activeQuestion.id, { aiExplanation: explanation });
    setIsLoadingAi(false);
  };

  // --- INTRO VIEW ---
  if (showIntro) {
      // Improved logic: Show Resume if we have answered questions OR if we have navigated past the first question
      const hasProgress = (questionStates && Object.keys(questionStates).length > 0) || currentIndex > 0;
      
      return (
        <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 animate-in fade-in relative overflow-hidden">
            {/* Background blobs */}
            <div className="absolute top-20 left-20 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>

            <div className="bg-brand-primary w-full max-w-2xl rounded-3xl border border-slate-700 shadow-2xl p-8 md:p-12 relative z-10">
                <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-white transition-colors">
                    <X size={24} />
                </button>

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-brand-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-6 text-brand-accent">
                        <Award size={40} />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        {selectedState.name} Free Practice Test
                    </h1>
                    <p className="text-slate-400 text-lg max-w-md mx-auto">
                        Simulate the real exam environment with updated questions from the 2024 manual.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                        <div className="text-2xl font-bold text-white mb-1">{shuffledQuestions.length}</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wide">Questions</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                        <div className="text-2xl font-bold text-white mb-1">80%</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wide">Passing Score</div>
                    </div>
                     <div className="bg-slate-800 p-4 rounded-xl text-center border border-slate-700">
                        <div className="text-2xl font-bold text-white mb-1">~15m</div>
                        <div className="text-xs text-slate-400 uppercase tracking-wide">Duration</div>
                    </div>
                </div>

                <div className="space-y-4">
                    {hasProgress ? (
                        <div className="grid md:grid-cols-2 gap-4">
                            <button 
                                onClick={handleResumeTest}
                                className="w-full bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold py-4 rounded-xl flex flex-col items-center justify-center gap-1 transition-all shadow-lg hover:shadow-brand-accent/20 group"
                            >
                                <div className="flex items-center gap-2 group-hover:scale-105 transition-transform duration-200">
                                    <SkipForward size={24} />
                                    <span className="text-lg">Resume Progress</span>
                                </div>
                                <div className="text-xs font-semibold text-brand-dark/70 bg-brand-dark/10 px-3 py-1 rounded-full mt-1">
                                    Question {currentIndex + 1} of {shuffledQuestions.length} • Correct: {scoreData.correct}
                                </div>
                            </button>
                            <button 
                                onClick={handleStartNewTest}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-600"
                            >
                                <RotateCcw size={20} />
                                Start New Test
                            </button>
                        </div>
                    ) : (
                        <button 
                            onClick={handleStartTest}
                            className="w-full bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-accent/20 text-lg"
                        >
                            <CheckCircle size={24} />
                            Start Test Now
                        </button>
                    )}
                </div>
            </div>
        </div>
      );
  }

  // --- Results View ---
  if (isTestComplete) {
    const percentage = Math.round((scoreData.correct / scoreData.total) * 100);
    const passed = percentage >= 80;

    return (
        <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-6 animate-in fade-in">
            <div className="max-w-md w-full bg-brand-primary border border-slate-700 rounded-3xl p-8 text-center shadow-2xl">
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-6 border-4 ${passed ? 'bg-green-500/10 border-green-500 text-green-500' : 'bg-red-500/10 border-red-500 text-red-500'}`}>
                    {passed ? <Award size={48} /> : <AlertCircle size={48} />}
                </div>
                
                <h2 className="text-3xl font-bold text-white mb-2">{passed ? 'Test Passed!' : 'Needs Improvement'}</h2>
                <p className="text-slate-400 mb-8">{passed ? 'You are ready for the real exam.' : 'Keep practicing to master the rules.'}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-slate-800 p-4 rounded-xl">
                        <div className="text-sm text-slate-400 mb-1">Score</div>
                        <div className="text-2xl font-bold text-white">{percentage}%</div>
                    </div>
                    <div className="bg-slate-800 p-4 rounded-xl">
                        <div className="text-sm text-slate-400 mb-1">Correct</div>
                        <div className="text-2xl font-bold text-white">{scoreData.correct}/{scoreData.total}</div>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    {bookmarkedIds.length > 0 && (
                        <button 
                            onClick={handleReviewBookmarks}
                            className="w-full bg-slate-700 hover:bg-slate-600 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors border border-slate-600"
                        >
                            <Bookmark size={18} className="text-brand-accent" fill="currentColor" />
                            Retake {bookmarkedIds.length} Bookmarked
                        </button>
                    )}
                    <button 
                        onClick={handleRetake} 
                        className="w-full bg-brand-accent hover:bg-brand-accentHover text-brand-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                        <RotateCcw size={18} />
                        Retake Full Test
                    </button>
                    <button 
                        onClick={handleExitResults}
                        className="w-full bg-slate-800 hover:bg-slate-700 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                        <Home size={18} />
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
  }

  // --- Quiz Interface ---
  return (
    <div className="min-h-screen bg-brand-dark flex flex-col justify-center items-center py-6 px-4">
        {/* Main Card Container with Floating Effect */}
        <div className="w-full max-w-5xl bg-brand-dark md:bg-brand-primary md:border md:border-slate-800/50 md:shadow-2xl md:rounded-3xl overflow-hidden relative flex flex-col min-h-[600px] h-full">
            
            {/* Header with Full Width Progress Bar */}
            <div className="bg-brand-primary border-b border-slate-700 sticky top-0 z-20">
                <div className="px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-white">{selectedState.name} Free Practice</h1>
                            <div className="text-xs text-slate-400 flex items-center gap-2">
                                <span>Question {currentIndex + 1} of {shuffledQuestions.length}</span>
                                <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                                <span className={scoreData.correct > 0 ? "text-green-400" : "text-slate-500"}>Score: {scoreData.correct}</span>
                            </div>
                        </div>
                    </div>
                    {bookmarkedIds.length > 0 && (
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-slate-800 rounded-full border border-slate-700 text-xs text-slate-300">
                            <Bookmark size={12} fill="currentColor" className="text-brand-accent" />
                            <span>{bookmarkedIds.length} Saved</span>
                        </div>
                    )}
                </div>
                
                {/* Visual Progress Bar - Full Width */}
                <div className="w-full h-1.5 bg-slate-800">
                    <div 
                        className="h-full bg-brand-accent transition-all duration-300 ease-out shadow-[0_0_8px_rgba(45,212,191,0.6)]"
                        style={{ width: `${((currentIndex + 1) / shuffledQuestions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center max-w-4xl mx-auto w-full">
                <div className="grid md:grid-cols-[1fr,300px] gap-8 mb-8 items-start">
                <div className="relative pl-16">
                    {/* Question Number Box */}
                    <div className="absolute left-0 top-1 w-12 h-12 bg-brand-highlight rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg border border-orange-400">
                        {currentIndex + 1}
                    </div>

                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full bg-slate-800 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4 border border-slate-700">
                                {activeQuestion.category}
                            </span>
                            <h2 className="text-2xl font-semibold text-white leading-tight">
                                {activeQuestion.text}
                            </h2>
                        </div>
                        
                        {/* Bookmark Button */}
                        <button 
                            onClick={toggleBookmark}
                            className={`p-2 rounded-lg transition-all border ${isBookmarked ? 'bg-brand-accent/10 border-brand-accent text-brand-accent' : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-white hover:border-slate-500'}`}
                            title={isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
                        >
                            <Bookmark size={20} fill={isBookmarked ? "currentColor" : "none"} />
                        </button>
                    </div>
                </div>

                {/* Visual Aid Image Box */}
                <div className="hidden md:block">
                    <div className="bg-slate-900 rounded-2xl p-4 border border-slate-700 shadow-inner flex flex-col items-center justify-center min-h-[200px] text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-brand-accent/5 rounded-bl-full pointer-events-none"></div>
                        {activeQuestion.image ? (
                            <img 
                            src={activeQuestion.image} 
                            alt="Question visual aid" 
                            className="w-full h-auto rounded-lg max-h-[180px] object-contain relative z-10"
                            />
                        ) : (
                            <div className="text-slate-600 flex flex-col items-center relative z-10">
                                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-3 shadow-md">
                                    <span className="text-2xl">🚗</span>
                                </div>
                                <p className="text-xs font-medium text-slate-500">Visual Aid Unavailable</p>
                            </div>
                        )}
                        {activeQuestion.image && <p className="text-[10px] text-slate-500 mt-3 font-medium uppercase tracking-wide">Real Example</p>}
                    </div>
                </div>
                </div>

                <div className="space-y-3 mb-8">
                    {activeQuestion.options.map((option, idx) => {
                        let btnClass = "w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group relative overflow-hidden ";
                        let indicator = null;

                        if (currentQState.isSubmitted) {
                            if (idx === activeQuestion.correctIndex) {
                                // CORRECT: Green
                                btnClass += "bg-green-500/10 border-green-500 text-green-100 shadow-[0_0_15px_rgba(34,197,94,0.2)]";
                                indicator = <CheckCircle size={24} className="text-green-500 relative z-10" />;
                            } else if (idx === currentQState.selectedOption) {
                                // INCORRECT SELECTION: Red
                                btnClass += "bg-red-500/10 border-red-500 text-red-100";
                                indicator = <AlertCircle size={24} className="text-red-500 relative z-10" />;
                            } else {
                                // OTHERS: Dimmed
                                btnClass += "border-slate-800 bg-slate-800/50 text-slate-500 opacity-50";
                            }
                        } else {
                            // DEFAULT
                            btnClass += "bg-slate-800 border-slate-700 text-slate-300 hover:border-brand-accent hover:bg-slate-750 hover:text-white";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionSelect(idx)}
                                disabled={currentQState.isSubmitted}
                                className={btnClass}
                            >
                                <span className="relative z-10 font-medium">
                                    <span className="inline-block w-6 font-mono opacity-50 mr-2">{String.fromCharCode(97 + idx)}</span>
                                    {option}
                                </span>
                                {indicator}
                            </button>
                        );
                    })}
                </div>

                {/* Answer & Explanation Section */}
                {currentQState.isSubmitted && (
                    <div className="mb-8 animate-in slide-in-from-bottom-4 duration-500">
                        {/* Official Explanation Box */}
                        <div className="bg-brand-highlight text-white rounded-xl p-6 shadow-xl relative overflow-hidden mb-4 border border-orange-400">
                            <div className="relative z-10">
                                <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                    <CheckCircle size={20} className="text-white" />
                                    The correct answer is: {String.fromCharCode(65 + activeQuestion.correctIndex)}
                                </h3>
                                <p className="text-orange-50 font-medium leading-relaxed border-t border-white/20 pt-2">
                                    {activeQuestion.explanation || "Please review the manual for more details on this rule."}
                                </p>
                            </div>
                            {/* Decorative background element */}
                            <div className="absolute -bottom-4 -right-4 text-orange-600/20 rotate-12">
                                <CheckCircle size={120} fill="currentColor" />
                            </div>
                        </div>

                        {/* AI Tutor Option */}
                        {!currentQState.aiExplanation && !isLoadingAi && (
                            <button 
                            onClick={askAI}
                            className="flex items-center gap-2 text-sm text-slate-400 hover:text-brand-accent transition-colors ml-1"
                            >
                            <Bot size={16} />
                            Need more help? Ask AI Tutor
                            </button>
                        )}
                        
                        {isLoadingAi && (
                            <div className="flex items-center gap-2 text-slate-400 text-sm mt-2 ml-1">
                            <Loader2 size={16} className="animate-spin" />
                            Consulting AI...
                            </div>
                        )}

                        {currentQState.aiExplanation && (
                            <div className="bg-slate-800/50 border border-brand-accent/30 rounded-xl p-5 mt-4">
                            <div className="flex items-start gap-4">
                                <div className="bg-brand-accent/10 p-2 rounded-lg">
                                <Bot size={20} className="text-brand-accent" />
                                </div>
                                <div>
                                <h4 className="text-brand-accent text-sm font-bold uppercase tracking-wide mb-1">AI Tutor Insight</h4>
                                <p className="text-slate-300 text-sm leading-relaxed">{currentQState.aiExplanation}</p>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer Navigation */}
            <div className="bg-brand-primary border-t border-slate-700 p-6 sticky bottom-0 z-20 flex justify-between items-center">
                <div className="flex gap-3">
                    <button 
                        onClick={handlePrevious}
                        disabled={history.length === 0}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                        <ArrowLeft size={20} />
                        <span className="hidden sm:inline font-medium">Previous</span>
                    </button>
                    
                    {!currentQState.isSubmitted && (
                        <button 
                            onClick={handleSkip}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
                        >
                            <SkipForward size={20} />
                            <span className="hidden sm:inline font-medium">Skip</span>
                        </button>
                    )}
                </div>

                {currentQState.isSubmitted ? (
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-white text-brand-dark font-bold hover:bg-slate-200 rounded-full transition-colors flex items-center gap-2 shadow-lg"
                    >
                        {currentIndex === shuffledQuestions.length - 1 ? 'Finish Test' : 'Next Question'}
                        {currentIndex < shuffledQuestions.length - 1 && <ArrowLeft size={20} className="rotate-180" />}
                    </button>
                ) : (
                    <div className="text-sm text-slate-500 italic hidden sm:block">Select an option to continue</div>
                )}
            </div>
        </div>
    </div>
  );
};

export default PracticePage;