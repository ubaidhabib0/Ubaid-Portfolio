'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';

interface LogEntry {
  text: string;
  type: 'system' | 'input' | 'output' | 'error';
}

const CodeTerminal = () => {
  const { skills, projects } = usePortfolio();
  const [history, setHistory] = useState<LogEntry[]>([
    { text: 'System initialized. Welcome to Ubaid Ullah Portfolio CLI v2.0.0 (Next.js)', type: 'system' },
    { text: 'Type "help" to list available commands.', type: 'system' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep terminal scrolled to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on terminal card click
  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    
    const commandRaw = inputVal.trim();
    const command = commandRaw.toLowerCase();
    const newHistory = [...history, { text: `visitor@ubaid-portfolio:~$ ${commandRaw}`, type: 'input' as const }];

    if (!command) {
      setHistory(newHistory);
      setInputVal('');
      return;
    }

    let output = '';
    let responseType: 'output' | 'error' = 'output';

    switch (command) {
      case 'help':
        output = `Available commands:
  about    - Summary of who I am & educational status
  skills   - List my full-stack programming proficiencies
  projects - Summarize core projects I've built
  contact  - Display official channels to connect with me
  whoami   - Display active session user profile
  grad     - Detail expected graduation milestones & AUST credentials
  clear    - Clear this console window`;
        break;
      
      case 'about':
        output = `Ubaid Ullah | Software Engineering Student
6th Semester, Abbottabad University of Science and Technology (AUST)
Expected Graduation: Spring 2027

Passionate about full-stack architectures, P2P blockchain services, and automated auditing systems. Currently building security audit applications (DevGuard AI) and decentralized block ledgers.`;
        break;
      
      case 'skills':
        const categories: Record<string, string[]> = {};
        skills.forEach(s => {
          if (!categories[s.category]) categories[s.category] = [];
          categories[s.category].push(`${s.name} (${s.proficiency}%)`);
        });
        
        output = 'My Tech Stack:\n';
        Object.keys(categories).forEach(cat => {
          output += `\n[${cat}]\n  - ${categories[cat].join('\n  - ')}\n`;
        });
        break;
      
      case 'projects':
        output = 'Featured Projects:\n';
        projects.forEach(p => {
          output += `\n* ${p.title} (${p.category.toUpperCase()})
  Stack: ${p.technologies.slice(0, 4).join(', ')}${p.technologies.length > 4 ? '...' : ''}
  Details: ${p.description.substring(0, 120)}...\n`;
        });
        break;
      
      case 'contact':
        output = `Let's collaborate:
  Email    : ubaidhabiib@gmail.com
  WhatsApp : +92 312 0911667
  GitHub   : github.com/ubaidhabib0
  LinkedIn : linkedin.com/in/ubaidhabib0`;
        break;

      case 'whoami':
        output = `visitor@ubaid-portfolio
OS     : Node.js (Next.js App Router)
Role   : Technical Explorer / Guest Engineer
Access : Read Only`;
        break;

      case 'grad':
        output = `Milestones Tracker:
  Degree   : BS Software Engineering (BSSE)
  Status   : 6th Semester
  Expected : Spring 2027
  Location : Abbottabad University of Science and Technology (AUST), Abbottabad, Pakistan`;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        output = `Command not recognized: "${command}". Type "help" for a list of valid commands.`;
        responseType = 'error';
    }

    setHistory([...newHistory, { text: output, type: responseType }]);
    setInputVal('');
  };

  return (
    <section id="terminal" className="py-24 bg-[#03001e] relative overflow-hidden">
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Interactive <span className="text-gradient">Console</span>
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Explore my credentials and projects dynamically inside this retro-futuristic developer shell.
          </p>
        </div>

        <div 
          className="glass-panel border border-purple-500/20 shadow-[0_20px_50px_-20px_rgba(168,85,247,0.3)] hover:border-purple-500/30 transition-all duration-300 w-full rounded-2xl overflow-hidden cursor-text" 
          onClick={focusTerminal}
        >
          {/* Terminal Header bar */}
          <div className="flex items-center justify-between bg-black/40 border-b border-white/5 px-5 py-3.5">
            <div className="flex gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.3)]"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.3)]"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.3)]"></span>
            </div>
            <div className="text-gray-400 text-xs font-mono select-none">
              visitor@aust-shell:~
            </div>
            <div className="w-10"></div>
          </div>

          {/* Console logs output */}
          <div className="bg-black/60 p-6 h-[400px] overflow-y-auto font-mono text-sm leading-relaxed flex flex-col gap-2 scrollbar-thin scrollbar-thumb-purple-900 scrollbar-track-transparent">
            {history.map((log, index) => (
              <div 
                key={index} 
                className="whitespace-pre-wrap"
                style={{
                  color: log.type === 'input' ? '#22d3ee' : // cyan
                         log.type === 'error' ? '#f43f5e' : // rose
                         log.type === 'system' ? '#c084fc' : // light purple
                         '#f8fafc' // slate-50
                }}
              >
                {log.text}
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Shell prompt input */}
          <div className="bg-black/80 flex items-center gap-2 px-6 py-4 border-t border-white/5 font-mono text-sm">
            <span className="text-purple-400 select-none">visitor@ubaid-portfolio:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              className="flex-grow bg-transparent text-[#22d3ee] border-none outline-none focus:ring-0 p-0 m-0"
              autoComplete="off"
              spellCheck="false"
              aria-label="Terminal Input"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeTerminal;
