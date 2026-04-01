import React, { useState, useEffect } from 'react';
import { renderToString } from 'react-dom/server';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Brain,
  Timer,
  BarChart3,
  BookOpen,
  Send,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { generateQuestions, Question } from './questions';

export default function MathFastTest({ onBack }: { onBack: () => void }) {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'test' | 'results'>('welcome');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setQuestions(generateQuestions());
  }, []);

  const handleStartTest = () => {
    setCurrentStep('test');
    setUserAnswers({});
    setScore(0);
    setStartTime(Date.now());
    setIsSubmitted(false);
    window.scrollTo(0, 0);
  };

  const handleRegenerate = () => {
    setQuestions(generateQuestions());
  };

  const handleAnswer = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;

    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: optionIndex
    }));
  };

  const generateHTMLReport = (finalScore: number) => {
    const now = new Date();
    const yy = String(now.getFullYear()).slice(-2);
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const hh = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    const filename = `geminifast7_${yy}${mm}${dd}_${hh}${mins}.html`;

    const reportContent = (
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <title>Test Report - Grade 7 Math FAST Prep</title>
          <style dangerouslySetInnerHTML={{__html: `
            body { font-family: system-ui, -apple-system, sans-serif; color: #1e293b; line-height: 1.5; max-width: 800px; margin: 0 auto; padding: 2rem; background: #f8fafc; }
            .header { text-align: center; margin-bottom: 2rem; background: white; padding: 2rem; border-radius: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
            .score { font-size: 2.5rem; font-weight: bold; color: #2563eb; }
            .card { background: white; padding: 1.5rem; border-radius: 1rem; margin-bottom: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1); border: 1px solid #e2e8f0; }
            .correct-card { border-color: #bbf7d0; }
            .incorrect-card { border-color: #fecaca; }
            .status { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 0.375rem; font-size: 0.75rem; font-weight: bold; text-transform: uppercase; margin-left: 0.5rem; }
            .status-correct { background: #dcfce7; color: #166534; }
            .status-incorrect { background: #fee2e2; color: #991b1b; }
            .status-unanswered { background: #fef2f2; color: #ef4444; border: 1px solid #fecaca; }
            .explanation { margin-top: 1rem; padding: 1rem; background: #f0fdf4; border-radius: 0.5rem; font-size: 0.875rem; }
            .step-by-step { margin-top: 1rem; padding: 1rem; background: #eff6ff; border-radius: 0.5rem; font-size: 0.875rem; border: 1px solid #bfdbfe; }
            .diagram { margin: 1rem 0; padding: 1rem; background: #f8fafc; border-radius: 0.5rem; display: inline-block; }
          `}} />
        </head>
        <body>
          <div className="header">
            <h1>Grade 7 Math FAST Prep</h1>
            <p>Test Report generated on {now.toLocaleString()}</p>
            <div className="score">{Math.round((finalScore / questions.length) * 100)}%</div>
            <p>{finalScore} out of {questions.length} correct</p>
          </div>

          {questions.map((q, idx) => {
            const userAnswerIdx = userAnswers[idx];
            const isCorrect = userAnswerIdx === q.correctAnswer;
            const isUnanswered = userAnswerIdx === undefined;
            
            return (
              <div key={q.id} className={`card ${isCorrect ? 'correct-card' : 'incorrect-card'}`}>
                <h3 style={{marginTop: 0}}>
                  {idx + 1}. {q.text}
                  {isCorrect && <span className="status status-correct">Correct</span>}
                  {!isCorrect && !isUnanswered && <span className="status status-incorrect">Incorrect</span>}
                  {isUnanswered && <span className="status status-unanswered">Unanswered</span>}
                </h3>
                
                {q.diagram && <div className="diagram">{q.diagram}</div>}

                <div style={{marginBottom: '1rem'}}>
                  <strong>Your Answer:</strong> {isUnanswered ? 'None' : q.options[userAnswerIdx]}
                </div>
                
                {!isCorrect && (
                  <div style={{marginBottom: '1rem'}}>
                    <strong>Correct Answer:</strong> {q.options[q.correctAnswer]}
                  </div>
                )}

                <div className={isCorrect ? 'explanation' : 'step-by-step'}>
                  <strong>{isCorrect ? 'Explanation:' : 'Step-by-Step Solution:'}</strong><br/>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </body>
      </html>
    );

    const htmlString = "<!DOCTYPE html>\n" + renderToString(reportContent);
    const blob = new Blob([htmlString], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSubmit = () => {
    let finalScore = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        finalScore += 1;
      }
    });
    setScore(finalScore);
    setIsSubmitted(true);
    setCurrentStep('results');
    window.scrollTo(0, 0);
    generateHTMLReport(finalScore);
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const progress = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {currentStep === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-3xl shadow-xl p-8 text-center relative"
            >
              <button 
                onClick={onBack}
                className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 flex items-center gap-2 text-sm font-bold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight mb-3">Grade 7 Math FAST Prep</h1>
              <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                Dynamic practice test with randomized values. Every test is unique!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <BarChart3 className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <span className="block font-semibold text-sm">{questions.length} Questions</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <RefreshCw className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <span className="block font-semibold text-sm">Randomized</span>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <BookOpen className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <span className="block font-semibold text-sm">Full Review</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartTest}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg"
                >
                  Start Practice Test
                </button>
                <button
                  onClick={handleRegenerate}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Generate New Values
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'test' && (
            <motion.div
              key="test"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="sticky top-4 z-10 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-4 flex items-center justify-between border border-white/20">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Progress: {answeredCount}/{questions.length}
                  </div>
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-blue-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <button
                  onClick={handleSubmit}
                  className="ml-6 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-all"
                >
                  <Send className="w-4 h-4" /> Submit Test
                </button>
              </div>

              <div className="space-y-4">
                {questions.map((q, qIdx) => (
                  <div key={q.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
                    <div className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-sm">
                        {qIdx + 1}
                      </span>
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-4 leading-snug">{q.text}</h3>
                        
                        {q.diagram && (
                          <div className="mb-4 p-3 bg-slate-50 rounded-xl border border-slate-100 inline-block">
                            {q.diagram}
                          </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {q.options.map((option, oIdx) => {
                            const isSelected = userAnswers[qIdx] === oIdx;
                            return (
                              <button
                                key={oIdx}
                                onClick={() => handleAnswer(qIdx, oIdx)}
                                className={`p-3 text-left rounded-xl border transition-all text-sm flex items-center gap-3 ${
                                  isSelected 
                                    ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-100' 
                                    : 'border-slate-100 hover:border-slate-300 hover:bg-slate-50'
                                }`}
                              >
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  isSelected ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-500'
                                }`}>
                                  {String.fromCharCode(65 + oIdx)}
                                </span>
                                {option}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 pb-12 text-center">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-2xl transition-all shadow-xl"
                >
                  Submit Final Answers
                </button>
              </div>
            </motion.div>
          )}

          {currentStep === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-3xl shadow-xl p-8 text-center border border-slate-100">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-yellow-600" />
                </div>
                <h2 className="text-3xl font-bold mb-1">Test Results</h2>
                <p className="text-slate-500 mb-6">Review your performance below</p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-3xl font-black text-blue-600">
                      {Math.round((score / questions.length) * 100)}%
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Score</div>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-3xl font-bold text-slate-800">
                      {score}/{questions.length}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Correct</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => {
                      handleRegenerate();
                      handleStartTest();
                    }}
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> New Test
                  </button>
                  <button
                    onClick={handleStartTest}
                    className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-8 rounded-xl transition-all"
                  >
                    <RotateCcw className="w-4 h-4" /> Retake Same Test
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold px-2">Detailed Review</h3>
                {questions.map((q, idx) => {
                  const userAnswer = userAnswers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  const isUnanswered = userAnswer === undefined;

                  return (
                    <div 
                      key={q.id} 
                      className={`p-5 rounded-2xl border bg-white shadow-sm ${
                        isCorrect ? 'border-green-100' : 'border-red-100'
                      }`}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          {isCorrect ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800 mb-3">
                            {idx + 1}. {q.text}
                            {isUnanswered && <span className="ml-2 text-[10px] uppercase tracking-wider font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md border border-red-100">Unanswered</span>}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            {q.options.map((opt, oIdx) => (
                              <div 
                                key={oIdx}
                                className={`p-2 text-xs rounded-lg border ${
                                  oIdx === q.correctAnswer 
                                    ? 'bg-green-50 border-green-200 text-green-700 font-bold' 
                                    : oIdx === userAnswer && !isCorrect
                                      ? 'bg-red-50 border-red-200 text-red-700'
                                      : 'border-slate-100 text-slate-400'
                                }`}
                              >
                                {String.fromCharCode(65 + oIdx)}. {opt}
                              </div>
                            ))}
                          </div>

                          {!isCorrect ? (
                            <div className="mt-4 p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                              <div className="flex items-center gap-2 mb-2">
                                <BookOpen className="w-4 h-4 text-blue-600" />
                                <span className="font-bold text-blue-900 text-sm">Step-by-Step Solution</span>
                              </div>
                              <div className="text-sm text-slate-700 leading-relaxed">
                                {q.explanation}
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                              <span className="font-bold text-slate-800 block mb-1">Explanation:</span>
                              {q.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="text-center py-8">
                <button
                  onClick={() => setCurrentStep('welcome')}
                  className="text-slate-400 hover:text-slate-600 font-medium text-sm transition-colors"
                >
                  Back to Start Screen
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
