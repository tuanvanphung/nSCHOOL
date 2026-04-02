import React, { useState, useEffect } from 'react';
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

    const scorePercent = Math.round((finalScore / questions.length) * 100);
    
    let questionsHtml = '';
    questions.forEach((q, idx) => {
      const userAnswer = userAnswers[idx];
      const isCorrect = userAnswer === q.correctAnswer;
      const isUnanswered = userAnswer === undefined;
      
      const explanationSteps = q.explanation.split(/\.\s+|\.$/).filter(step => step.trim().length > 0).map(step => step.trim() + '.');
      const explanationHtml = explanationSteps.map(step => `<div style="margin-bottom: 4px;">• ${step}</div>`).join('');

      let optionsHtml = '';
      q.options.forEach((opt, oIdx) => {
        let optClass = 'p-2 text-xs rounded-lg border border-slate-100 text-slate-400';
        if (oIdx === q.correctAnswer) {
          optClass = 'p-2 text-xs rounded-lg border bg-green-50 border-green-200 text-green-700 font-bold';
        } else if (oIdx === userAnswer && !isCorrect) {
          optClass = 'p-2 text-xs rounded-lg border bg-red-50 border-red-200 text-red-700';
        }
        optionsHtml += `<div class="${optClass}">${String.fromCharCode(65 + oIdx)}. ${opt}</div>`;
      });

      questionsHtml += `
        <div class="p-5 rounded-2xl border bg-white shadow-sm mb-4 ${isCorrect ? 'border-green-100' : 'border-red-100'}">
          <div class="flex gap-4">
            <div class="flex-shrink-0 mt-1">
              ${isCorrect ? '<span class="text-green-500 text-xl font-bold">✓</span>' : '<span class="text-red-500 text-xl font-bold">✗</span>'}
            </div>
            <div class="flex-1">
              <p class="font-semibold text-slate-800 mb-3">
                ${idx + 1}. ${q.text}
                ${isUnanswered ? '<span class="ml-2 text-[10px] uppercase tracking-wider font-bold text-red-500 bg-red-50 px-2 py-1 rounded-md border border-red-100">Unanswered</span>' : ''}
              </p>
              
              <div class="grid grid-cols-2 gap-2 mb-4">
                ${optionsHtml}
              </div>

              ${!isCorrect ? `
                <div class="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="font-bold text-blue-900 text-sm">Step-by-Step Solution</span>
                  </div>
                  <div class="text-sm text-slate-700 leading-relaxed">
                    ${explanationHtml}
                  </div>
                </div>
              ` : `
                <div class="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                  <span class="font-bold text-slate-800 block mb-1">Explanation:</span>
                  ${explanationHtml}
                </div>
              `}
            </div>
          </div>
        </div>
      `;
    });

    const htmlString = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test Report - Grade 7 Math FAST Prep</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-50 p-8 font-sans">
  <div class="max-w-3xl mx-auto">
    <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center mb-8">
      <h1 class="text-3xl font-black text-slate-800 tracking-tight mb-2">Grade 7 Math FAST Prep</h1>
      <p class="text-slate-500 font-medium mb-6">Test Report generated on ${now.toLocaleString()}</p>
      
      <div class="inline-flex items-center justify-center w-32 h-32 rounded-full border-8 ${scorePercent >= 70 ? 'border-green-500 text-green-500' : 'border-blue-500 text-blue-500'} mb-4">
        <span class="text-4xl font-black">${scorePercent}%</span>
      </div>
      <p class="text-slate-600 font-medium">${finalScore} out of ${questions.length} correct</p>
    </div>
    
    <div class="space-y-4">
      <h3 class="text-xl font-bold px-2 text-slate-800">Detailed Review</h3>
      ${questionsHtml}
    </div>
  </div>
</body>
</html>`;

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
                  
                  const explanationSteps = q.explanation.split(/\.\s+|\.$/).filter(step => step.trim().length > 0).map(step => step.trim() + '.');

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
                                {explanationSteps.map((step, i) => (
                                  <div key={i} className="mb-1">• {step}</div>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="mt-4 p-3 bg-slate-50 rounded-xl text-xs text-slate-600 border border-slate-100">
                              <span className="font-bold text-slate-800 block mb-1">Explanation:</span>
                              {explanationSteps.map((step, i) => (
                                <div key={i} className="mb-1">• {step}</div>
                              ))}
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
