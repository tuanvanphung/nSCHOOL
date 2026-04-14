import React, { useState } from 'react';
import MathFastTest from './MathFastTest';
import ACTPrepTest from './ACTPrepTest';
import { Folder, ChevronRight, Calculator, GraduationCap } from 'lucide-react';

export default function App() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  if (activeProject === 'math-fast-7') {
    return <MathFastTest onBack={() => setActiveProject(null)} />;
  }

  if (activeProject === 'act-prep') {
    return <ACTPrepTest onBack={() => setActiveProject(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-4">My Projects</h1>
          <p className="text-slate-600 text-lg">Select a project to launch.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Project Card 1 */}
          <button 
            onClick={() => setActiveProject('math-fast-7')}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-300 transition-all text-left group flex flex-col h-full"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <Calculator className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-xl font-bold mb-2">Grade 7 Math FAST Prep</h2>
            <p className="text-slate-500 mb-6 flex-1">Dynamic practice test with randomized values. Generates unique 80-question tests covering all Grade 7 standards.</p>
            <div className="flex items-center text-blue-600 font-semibold text-sm">
              Launch Project <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Project Card 2 */}
          <button 
            onClick={() => setActiveProject('act-prep')}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-red-300 transition-all text-left group flex flex-col h-full"
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-600 transition-colors">
              <GraduationCap className="w-6 h-6 text-red-600 group-hover:text-white transition-colors" />
            </div>
            <h2 className="text-xl font-bold mb-2">ACT Math Prep</h2>
            <p className="text-slate-500 mb-6 flex-1">Dynamic 100-question practice test modeled after the last 5 years of ACT exams. Covers Algebra, Geometry, and Trig.</p>
            <div className="flex items-center text-red-600 font-semibold text-sm">
              Launch Project <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
