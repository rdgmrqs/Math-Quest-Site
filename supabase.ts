import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MathProblem } from '../types.ts';
import { CheckCircle2, XCircle, ChevronRight, Zap, Brain, Hash, Layers } from 'lucide-react';
import { translateText } from '../utils/translator.ts';
import { getMathExplanation } from '../utils/explanations.ts';

interface ProblemCardProps {
  problem: MathProblem;
  onSolve: (isCorrect: boolean) => void;
  lang?: 'en' | 'pt';
}

const MathVisualAid: React.FC<{ data: NonNullable<MathProblem['visualData']> }> = ({ data }) => {
  const getCellContent = (cell: string | number | null) => {
    if (cell === null || cell === '') return null;
    const strCell = cell.toString();

    if (strCell === '●' || strCell === '○') {
      return (
        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-[3px] border-[#2D3436] shadow-sm ${strCell === '●' ? 'bg-neo-purple' : 'bg-white'}`} />
      );
    }
    if (strCell === '웃') return <span className="text-3xl md:text-4xl">웃</span>;
    if (strCell === '▣') return <div className="w-8 h-8 bg-neo-pink border-[3px] border-[#2D3436] rounded-sm transform rotate-12 shadow-neo-sm" />;
    if (strCell === 'target') return <div className="w-8 h-8 border-[3px] border-[#2D3436] border-dashed rounded-full opacity-30" />;
    if (strCell === '▩') return <div className="w-10 h-10 bg-neo-blue border-2 border-[#2D3436] grid grid-cols-2 p-1 shadow-neo-sm"><div className="bg-white/20" /><div /><div /><div className="bg-white/20" /></div>;
    if (strCell === '🥢') return <span className="text-4xl transform rotate-45 inline-block">🥢</span>;
    if (strCell === '|') return <div className="w-1.5 h-full bg-[#2D3436] opacity-40 rounded-full" />;
    if (strCell === '-') return <div className="h-1.5 w-full bg-[#2D3436] opacity-40 rounded-full" />;
    
    if (strCell === '🌊') return <span className="text-3xl animate-pulse">🌊</span>;
    if (strCell === '☆') return <span className="text-3xl text-neo-yellow drop-shadow-sm">★</span>;
    if (strCell === '☉') return <span className="text-3xl text-neo-pink">☉</span>;
    
    // Game Pieces
    const pieceMap: Record<string, string> = {
      'pawn': '♟', 'knight': '♞', 'bishop': '♝', 'rook': '♜', 'queen': '♛', 'king': '♚',
      'w-pawn': '♙', 'w-knight': '♘', 'w-bishop': '♗', 'w-rook': '♖', 'w-queen': '♕', 'w-king': '♔',
      'star': '★', 'diamond': '◆', 'circle': '●', 'square': '■'
    };

    if (pieceMap[strCell]) {
      return (
        <span className={`text-4xl md:text-6xl select-none  ${strCell.startsWith('w-') ? 'text-slate-400 drop-shadow-[2px_2px_0px_rgba(255,255,255,1)]' : 'text-[#2D3436] drop-shadow-[2px_2px_0px_rgba(255,255,255,0.5)]'}`}>
          {pieceMap[strCell]}
        </span>
      );
    }

    return <span className="text-xl md:text-2xl font-black drop-shadow-sm">{strCell}</span>;
  };

  if (data.type === 'row' && data.row) {
    return (
      <div className="flex flex-col items-center gap-6 py-10 bg-slate-100/30 backdrop-blur-sm rounded-[48px] border-4 border-dashed border-slate-200 w-full overflow-hidden relative">
        <div className="absolute top-4 left-6 flex items-center gap-2 opacity-30">
          <Layers size={14} className="text-[#2D3436]" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em]">Pattern_Stream</span>
        </div>
        <div className="flex gap-4 justify-center flex-wrap px-8">
          {data.row.map((item, i) => {
            const isMarker = item === 'Y' || item === 'G' || item === 'R' || item === 'A' || item === 'V' || item === 'Vml';
            const colorClass = (item === 'G' || item === 'V') ? 'bg-neo-green' : 
                             (item === 'Y' || item === 'A') ? 'bg-neo-yellow' : 
                             (item === 'R' || item === 'Vml') ? 'bg-neo-pink' : 'bg-white';
            
            return (
              <motion.div 
                initial={{ y: 20, rotate: -5, opacity: 0 }}
                animate={{ y: 0, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 12, delay: i * 0.05 }}
                key={i} 
                className={`w-20 h-20 md:w-24 md:h-24 border-[5px] border-[#2D3436] rounded-3xl flex items-center justify-center font-black shadow-neo-sm text-3xl ${colorClass} hover:-translate-y-1 transition-transform cursor-default relative group`}
              >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                {isMarker ? '' : getCellContent(item)}
              </motion.div>
            );
          })}
        </div>
        <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.4em] mt-2 italic">{data.label || 'SEQUENCE.LOGIC.INIT'}</p>
      </div>
    );
  }

  if (data.type === 'grid' && data.grid) {
    const rows = data.grid.length;
    const cols = data.grid[0].length;
    const isBoard = data.style === 'chess' || data.style === 'checkers' || data.style === 'senet' || data.style === 'yote';
    
    return (
      <div className={`flex flex-col items-center gap-6 py-12 rounded-[56px] border-[6px] border-[#2D3436] shadow-neo w-full relative overflow-hidden ${isBoard ? 'bg-[#1e293b]' : 'bg-white'}`}>
        <div className="absolute top-6 left-8 flex items-center gap-2 opacity-20">
          <Hash size={16} className={isBoard ? 'text-white' : 'text-[#2D3436]'} />
          <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isBoard ? 'text-white' : 'text-[#2D3436]'}`}>Matrix_Resolve</span>
        </div>

        <div 
          className={`grid p-8 border-[4px] border-[#2D3436] rounded-[40px] shadow-neo-sm relative z-10 ${isBoard ? 'gap-0 bg-slate-200' : 'gap-4 bg-slate-50'}`}
          style={{ 
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` 
          }}
        >
          {data.grid.flat().map((cell, i) => {
            const rowIdx = Math.floor(i / cols);
            const colIdx = i % cols;
            const isDark = (rowIdx + colIdx) % 2 === 1;
            
            let cellBg = isBoard ? (isDark ? 'bg-slate-400' : 'bg-slate-100') : 'bg-white border-[4px] border-[#2D3436] font-display font-black shadow-neo-sm rounded-2xl hover:bg-slate-50 transition-colors';
            if (data.style === 'senet') {
              cellBg = isDark ? 'bg-[#D2B48C]' : 'bg-[#F5DEB3]';
              if (i === 26) cellBg = 'bg-blue-300';
              if (i === 25) cellBg = 'bg-yellow-200';
            }

            if (cell === null) cellBg = 'bg-transparent border-none shadow-none font-black text-slate-100';

            return (
              <div 
                key={i} 
                className={`${isBoard ? 'w-12 h-12 md:w-20 md:h-20' : 'w-16 h-16 md:w-24 md:h-24'} ${cell === null ? '' : 'border-[1px] border-[#2D3436]/10'} flex items-center justify-center relative overflow-hidden transition-all group ${cellBg}`}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20, delay: i * 0.02 + 0.3 }}
                  className="z-10 group-hover:scale-110 transition-transform"
                >
                  {getCellContent(cell)}
                </motion.div>
                {isBoard && (
                   <span className="absolute bottom-1 right-2 text-[8px] opacity-10 font-mono font-black italic">
                     {String.fromCharCode(65 + colIdx)}{rows - rowIdx}
                   </span>
                )}
              </div>
            );
          })}
        </div>
        <div className={`text-[10px] font-black uppercase tracking-[0.5em] px-8 py-3 rounded-full border-[3px] border-[#2D3436] shadow-neo-sm z-10 ${isBoard ? 'bg-neo-yellow text-[#2D3436] rotate-1' : 'bg-white text-[#2D3436] -rotate-1'}`}>
           {data.label || (isBoard ? 'STRATEGIC_SIM_v4.2' : 'LOGIC_MAPPING_v1.0')}
        </div>
      </div>
    );
  }

  // Simplified other variants for size
  return null;
};

const initializePuzzle = (size: number): (number | null)[] => {
  const total = size * size;
  const arr: (number | null)[] = Array.from({ length: total - 1 }, (_, i) => i + 1);
  arr.push(null);

  // Solvable random walk shuffle starting from solved state
  let blankIndex = total - 1;
  const numMoves = 100 + size * 30; // Adequate scrambles 
  for (let step = 0; step < numMoves; step++) {
    const neighbors: number[] = [];
    const r = Math.floor(blankIndex / size);
    const c = blankIndex % size;
    if (r > 0) neighbors.push((r - 1) * size + c);
    if (r < size - 1) neighbors.push((r + 1) * size + c);
    if (c > 0) neighbors.push(r * size + (c - 1));
    if (c < size - 1) neighbors.push(r * size + (c + 1));

    const nextIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
    arr[blankIndex] = arr[nextIndex];
    arr[nextIndex] = null;
    blankIndex = nextIndex;
  }
  return arr;
};

const checkIsSolved = (currentTiles: (number | null)[]): boolean => {
  if (currentTiles.length === 0) return false;
  if (currentTiles[currentTiles.length - 1] !== null) return false;
  for (let i = 0; i < currentTiles.length - 1; i++) {
    if (currentTiles[i] !== i + 1) return false;
  }
  return true;
};

// --- HEX GAME UTILS ---
const initializeHexBoard = (size: number): (string | null)[][] => {
  return Array.from({ length: size }, () => Array(size).fill(null));
};

const checkHexWinnerWithPath = (
  board: (string | null)[][],
  size: number,
  player: 'blue' | 'pink'
): [number, number][] | null => {
  const visited = Array.from({ length: size }, () => Array(size).fill(false));
  const parent = Array.from({ length: size }, () => Array(size).fill(null) as (null | [number, number])[]);
  const queue: [number, number][] = [];

  if (player === 'blue') {
    // Blue connects top (row 0) to bottom (row size - 1)
    for (let c = 0; c < size; c++) {
      if (board[0][c] === 'blue') {
        queue.push([0, c]);
        visited[0][c] = true;
      }
    }

    let endNode: [number, number] | null = null;
    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      if (r === size - 1) {
        endNode = [r, c];
        break;
      }

      const neighbors = [
        [r, c - 1], [r, c + 1],
        [r - 1, c], [r - 1, c + 1],
        [r + 1, c - 1], [r + 1, c]
      ];

      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          if (!visited[nr][nc] && board[nr][nc] === 'blue') {
            visited[nr][nc] = true;
            parent[nr][nc] = [r, c];
            queue.push([nr, nc]);
          }
        }
      }
    }

    if (endNode) {
      const path: [number, number][] = [];
      let curr: [number, number] | null = endNode;
      while (curr !== null) {
        path.push(curr);
        curr = parent[curr[0]][curr[1]];
      }
      return path;
    }
  } else {
    // Pink connects left (col 0) to right (col size - 1)
    for (let r = 0; r < size; r++) {
      if (board[r][0] === 'pink') {
        queue.push([r, 0]);
        visited[r][0] = true;
      }
    }

    let endNode: [number, number] | null = null;
    while (queue.length > 0) {
      const [r, c] = queue.shift()!;
      if (c === size - 1) {
        endNode = [r, c];
        break;
      }

      const neighbors = [
        [r, c - 1], [r, c + 1],
        [r - 1, c], [r - 1, c + 1],
        [r + 1, c - 1], [r + 1, c]
      ];

      for (const [nr, nc] of neighbors) {
        if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
          if (!visited[nr][nc] && board[nr][nc] === 'pink') {
            visited[nr][nc] = true;
            parent[nr][nc] = [r, c];
            queue.push([nr, nc]);
          }
        }
      }
    }

    if (endNode) {
      const path: [number, number][] = [];
      let curr: [number, number] | null = endNode;
      while (curr !== null) {
        path.push(curr);
        curr = parent[curr[0]][curr[1]];
      }
      return path;
    }
  }

  return null;
};

const getHexAIMove = (board: (string | null)[][], size: number): [number, number] | null => {
  const emptyCells: [number, number][] = [];
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === null) {
        emptyCells.push([r, c]);
      }
    }
  }

  if (emptyCells.length === 0) return null;

  let bestCell = emptyCells[0];
  let bestScore = -Infinity;

  for (const [r, c] of emptyCells) {
    let score = 0;

    const center = (size - 1) / 2;
    const distToCenter = Math.abs(r - center) + Math.abs(c - center);
    score += (size * 2 - distToCenter);

    const neighbors = [
      [r, c - 1], [r, c + 1],
      [r - 1, c], [r - 1, c + 1],
      [r + 1, c - 1], [r + 1, c]
    ];

    for (const [nr, nc] of neighbors) {
      if (nr >= 0 && nr < size && nc >= 0 && nc < size) {
        const val = board[nr][nc];
        if (val === 'pink') {
          score += 15;
        } else if (val === 'blue') {
          score += 10;
        }
      }
    }

    if (c === 0 || c === size - 1) {
      score += 12;
    }

    score += Math.random() * 3;

    if (score > bestScore) {
      bestScore = score;
      bestCell = [r, c];
    }
  }

  return bestCell;
};

const getHexVertices = (cx: number, cy: number, r: number) => {
  const pts: { x: number; y: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const rad = (Math.PI / 180) * (60 * i - 30);
    pts.push({ x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) });
  }
  return pts;
};

interface GameGuide {
  howToPlay: string[];
  winningMoves: string[];
}

const getGameGuide = (category: string, currentLang: 'pt' | 'en'): GameGuide => {
  if (currentLang === 'pt') {
    switch (category) {
      case 'Hex':
        return {
          howToPlay: [
            "Os jogadores se alternam colocando uma peça de sua cor (Azul para você, Rosa para a IA) em qualquer hexágono vazio.",
            "O tabuleiro de Hex possui uma grade em forma de losango, com bordas Azuis no topo/base e bordas Rosas nas laterais."
          ],
          winningMoves: [
            "Sua jogada vencedora é conectar as bordas Azuis superior e inferior com um caminho contínuo e ininterrupto de hexágonos Azuis.",
            "Tente bloquear os caminhos do oponente antes que ele conecte as bordas laterais Rosas.",
            "Matematicamente, não existem empates no Hex. Se você impedir o caminho do oponente, você inevitavelmente criará o seu."
          ]
        };
      case '15 Puzzle':
        return {
          howToPlay: [
            "Clique em qualquer bloco numerado que esteja adjacente ao espaço vazio para deslizá-lo.",
            "Use o espaço vazio de forma inteligente para manobrar os números ao redor da grade."
          ],
          winningMoves: [
            "A jogada vencedora é ordenar todas as peças em sequência numérica de 1 a 15, deixando o espaço vazio no canto inferior direito.",
            "Dica: Tente resolver o quebra-cabeça de cima para baixo, linha por linha (primeiro complete a linha do 1 ao 4, depois do 5 ao 8, etc.)."
          ]
        };
      case 'Sudoku':
        return {
          howToPlay: [
            "Selecione uma célula vazia para ativá-la e clique nos números de 1 a 9 no painel numérico para preenchê-la.",
            "Insira os dígitos de forma que nenhuma regra de linha, coluna ou bloco de 3x3 seja quebrada."
          ],
          winningMoves: [
            "A condição de vitória é preencher o tabuleiro completo de 9x9 onde cada linha, coluna e bloco de 3x3 contenha exatamente todos os números de 1 a 9 sem nenhuma repetição."
          ]
        };
      case 'Magic Squares':
        return {
          howToPlay: [
            "Clique nas células vazias da grade 3x3 para alternar entre os números de 1 a 9 disponíveis.",
            "Cada número de 1 a 9 deve ser posicionado exatamente uma vez no quadrado."
          ],
          winningMoves: [
            "A vitória é alcançada quando a soma dos números em cada uma das 3 linhas, 3 colunas e 2 diagonais principais for exatamente 15.",
            "Jogada Vencedora Fundamental: O número 5 DEVE obrigatoriamente estar posicionado na célula central do quadrado!",
            "Estratégia dos Cantos: Posicione os números pares (2, 4, 6, 8) nos cantos para equilibrar as equações das diagonais."
          ]
        };
      case 'Ouri':
        return {
          howToPlay: [
            "Clique em uma de suas casas (as 6 casas inferiores da sua fileira) para colher as sementes.",
            "O sistema distribuirá as sementes uma a uma no sentido anti-horário ao longo das casas."
          ],
          winningMoves: [
            "Jogada Vencedora (Captura): Quando a última semente da sua semeadura cair em uma casa do oponente deixando-a com exatamente 2 ou 3 sementes, você as captura!",
            "Vitória do Jogo: O jogador que capturar 24 sementes ou mais vence o jogo e resolve a missão de Ouri."
          ]
        };
      case 'Senet':
        return {
          howToPlay: [
            "Clique em 'Lançar Varetas' para jogar as 4 varetas egípcias que funcionam como dados (os lados planos voltados para cima determinam o rolo de 1 a 5).",
            "Clique em uma de suas peças (com a letra P) para movê-la ao longo do tabuleiro em formato de 'S'."
          ],
          winningMoves: [
            "A vitória consiste em mover e retirar com sucesso todas as suas 5 peças do tabuleiro antes do oponente.",
            "Tática do Escudo: Mantenha duas de suas peças lado a lado. Peças adjacentes protegem umas às outras e não podem ser trocadas ou capturadas pela IA!",
            "Evite a Casa da Água (casa 27), que afoga sua peça e a manda de volta à Casa do Renascimento (casa 15)!"
          ]
        };
      case 'Game of 24':
        return {
          howToPlay: [
            "Clique nos 4 números e operadores aritméticos (+, -, *, /) disponíveis para montar uma expressão matemática.",
            "Você pode usar parênteses para agrupar e definir a ordem de preferência dos cálculos."
          ],
          winningMoves: [
            "A expressão matemática final construída deve utilizar os 4 números iniciais exatamente uma vez e resultar no valor exato de 24.",
            "Estratégia das Fatorações: Busque construir multiplicações chaves de 24, tais como 8 x 3, 6 x 4, 12 x 2, ou divisões como 48 / 2.",
            "Fórmulas Avançadas: Soluções às vezes requerem frações intermediárias (ex: 8 dividido por (3 menos 8/3))."
          ]
        };
      default:
        return {
          howToPlay: ["Siga as instruções indicadas no desafio para responder e prosseguir."],
          winningMoves: ["Insira ou selecione a alternativa correta correspondente à questão matemática."]
        };
    }
  } else {
    switch (category) {
      case 'Hex':
        return {
          howToPlay: [
            "Players take turns placing a piece of their color (Blue for you, Pink for the AI) on any empty hexagon.",
            "The Hex board has a diamond grid structure, with Blue borders at the top/bottom and Pink borders on the sides."
          ],
          winningMoves: [
            "Your winning move is connecting the top and bottom Blue borders with a continuous, unbroken path of Blue hexagons.",
            "Block your opponent's path before they can connect their Pink lateral borders.",
            "Hex mathematically cannot end in a draw. If you block the opponent, you are guaranteed to secure your own win."
          ]
        };
      case '15 Puzzle':
        return {
          howToPlay: [
            "Click any numbered tile adjacent to the empty slot to slide it into that empty space.",
            "Use the empty space strategically to maneuver tiles around the grid."
          ],
          winningMoves: [
            "The winning move is to arrange all numbers sequentially from 1 to 15, leaving the empty slot in the bottom-right corner.",
            "Tip: Solve row by row! Complete the first row (1 to 4) first, then the second row (5 to 8), and so on."
          ]
        };
      case 'Sudoku':
        return {
          howToPlay: [
            "Select an empty cell and use the keypad below to fill it with numbers from 1 to 9.",
            "Ensure that no row, column, or 3x3 block constraints are violated."
          ],
          winningMoves: [
            "The winning condition is a complete 9x9 board where every row, column, and 3x3 block contains digits 1 to 9 exactly once without repeats."
          ]
        };
      case 'Magic Squares':
        return {
          howToPlay: [
            "Click on the empty cells of the 3x3 grid to cycle through the available numbers from 1 to 9.",
            "Each number must be used exactly once."
          ],
          winningMoves: [
            "Victory is achieved when the sum of every horizontal row, vertical column, and both main diagonals equals exactly 15.",
            "Fundamental Winning Play: The number 5 MUST be placed in the center cell of the grid!",
            "Corner Strategy: Place even numbers (2, 4, 6, 8) in the corners to balance the diagonal equations."
          ]
        };
      case 'Ouri':
        return {
          howToPlay: [
            "Click on one of your 6 houses (the bottom row) containing seeds to sow them.",
            "Seeds are distributed one by one counter-clockwise around the board."
          ],
          winningMoves: [
            "Winning Move (Capture): When the last seed of your sow lands in an opponent's house leaving it with exactly 2 or 3 seeds, you capture them!",
            "Game Victory: The player who captures 24 or more seeds wins the game and completes the quest."
          ]
        };
      case 'Senet':
        return {
          howToPlay: [
            "Click 'Throw Sticks' to roll the 4 Egyptian casting sticks (the flat side face-up determines your roll of 1 to 5).",
            "Click one of your pieces (marked with 'P') to advance it along the S-shaped path."
          ],
          winningMoves: [
            "Victory consists of moving and bearing all 5 of your pieces off the board before your opponent does.",
            "Shield Tactic: Keep two of your pieces adjacent. Allied pieces next to each other protect one another and cannot be swapped/captured by the AI!",
            "Avoid the House of Water (square 27), which drowns your piece back to the House of Rebirth (square 15)!"
          ]
        };
      case 'Game of 24':
        return {
          howToPlay: [
            "Click on the 4 numbers and available operators (+, -, *, /) to construct a mathematical expression.",
            "Use parentheses to group and specify the priority order of operations."
          ],
          winningMoves: [
            "The final equation must use all 4 numbers exactly once and evaluate to exactly 24.",
            "Factoring Strategy: Look for major factorizations of 24, such as 8 x 3, 6 x 4, 12 x 2, or divisions like 48 / 2.",
            "Advanced Formulas: Some solutions involve fractions (e.g., 8 divided by (3 minus 8/3))."
          ]
        };
      default:
        return {
          howToPlay: ["Follow the instructions given in the challenge to submit your answer."],
          winningMoves: ["Submit or select the correct answer to solve the math puzzle."]
        };
    }
  }
};

export const ProblemCard: React.FC<ProblemCardProps> = ({ problem, onSolve, lang = 'en' }) => {
  const [userInput, setUserInput] = React.useState('');
  const [feedback, setFeedback] = React.useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = React.useState(false);
  const [showGuide, setShowGuide] = React.useState(true);
  const [showExplanation, setShowExplanation] = React.useState(false);

  const mathExplanation = getMathExplanation(problem.category, lang === 'pt' ? 'pt' : 'en');

  // 15 Puzzle specific states
  const [gridSize, setGridSize] = React.useState<number>(4);
  const [tiles, setTiles] = React.useState<(number | null)[]>([]);
  const [moveCount, setMoveCount] = React.useState<number>(0);

  // Hex specific states
  const [hexSize, setHexSize] = React.useState<number>(5);
  const [hexBoard, setHexBoard] = React.useState<(string | null)[][]>([]);
  const [hexTurn, setHexTurn] = React.useState<'blue' | 'pink'>('blue');
  const [hexMode, setHexMode] = React.useState<'vs-ai' | '2-players'>('vs-ai');
  const [hexWinner, setHexWinner] = React.useState<'blue' | 'pink' | null>(null);
  const [hexWinningPath, setHexWinningPath] = React.useState<[number, number][]>([]);
  const [hexMoveCount, setHexMoveCount] = React.useState<number>(0);
  const [isAiThinking, setIsAiThinking] = React.useState<boolean>(false);

  // Sudoku specific states
  const [sudokuGrid, setSudokuGrid] = React.useState<(number | null)[]>(Array(81).fill(null));
  const [sudokuOriginal, setSudokuOriginal] = React.useState<boolean[]>(Array(81).fill(false));
  const [selectedSudokuIdx, setSelectedSudokuIdx] = React.useState<number | null>(null);

  // Magic Squares specific states
  const [magicGrid, setMagicGrid] = React.useState<(number | null)[]>(Array(9).fill(null));
  const [magicOriginal, setMagicOriginal] = React.useState<boolean[]>(Array(9).fill(false));

  // Game of 24 specific states
  const [game24Tokens, setGame24Tokens] = React.useState<string[]>([]);
  const [game24UsedIndices, setGame24UsedIndices] = React.useState<number[]>([]);
  const game24Numbers = React.useMemo(() => {
    const matches = problem.question.match(/\b\d+\b/g);
    if (matches) {
      const candidates = matches.map(Number).filter(n => n !== 24);
      if (candidates.length >= 4) {
        return candidates.slice(0, 4);
      }
    }
    return [6, 4, 3, 2];
  }, [problem.question]);

  // Ouri (Mancala) specific states
  const [ouriPits, setOuriPits] = React.useState<number[]>([]);
  const [ouriTurn, setOuriTurn] = React.useState<'player' | 'ai'>('player');
  const [ouriWinner, setOuriWinner] = React.useState<string | null>(null);

  // Senet specific states
  const [senetP1, setSenetP1] = React.useState<number[]>([1, 3, 5, 7, 9]);
  const [senetP2, setSenetP2] = React.useState<number[]>([2, 4, 6, 8, 10]);
  const [senetTurn, setSenetTurn] = React.useState<'player' | 'ai'>('player');
  const [senetRoll, setSenetRoll] = React.useState<number | null>(null);
  const [senetSticks, setSenetSticks] = React.useState<number[]>([1, 1, 1, 1]);
  const [senetWinner, setSenetWinner] = React.useState<string | null>(null);
  const [senetLog, setSenetLog] = React.useState<string[]>([]);
  const [senetHoveredPawn, setSenetHoveredPawn] = React.useState<number | null>(null);
  const [senetShowRules, setSenetShowRules] = React.useState<boolean>(false);

  // Tangram specific states
  const [tangramPositions, setTangramPositions] = React.useState<{ rotation: number; slot: number }[]>([]);
  const [tangramSelected, setTangramSelected] = React.useState<number | null>(null);

  // Stomachion specific states
  const [stomachionPieces, setStomachionPieces] = React.useState<number[]>(Array(14).fill(0));

  const t = lang === 'pt' ? {
    challenge: 'DESAFIO',
    hintShow: 'Lógica do Jogo',
    hintHide: 'Ocultar Detalhes',
    placeholder: 'Sua resposta...',
    submit: 'ENVIAR',
    pointsUp: 'pts em disputa',
    correct: 'EXCELENTE!',
    incorrect: 'INCORRETO',
    explanationShow: '🎓 Explicação Matemática',
    explanationHide: '🎓 Ocultar Explicação',
    mathConcept: 'Conceito Matemático:',
    difficulty: {
      easy: 'FÁCIL',
      medium: 'MÉDIO',
      hard: 'DIFÍCIL',
    }
  } : {
    challenge: 'CHALLENGE',
    hintShow: 'Game Logic',
    hintHide: 'Hide Details',
    placeholder: 'Solve here...',
    submit: 'SUBMIT',
    pointsUp: 'pts for grabs',
    correct: 'EXCELLENT!',
    incorrect: 'INCORRECT',
    explanationShow: '🎓 Mathematical Explanation',
    explanationHide: '🎓 Hide Explanation',
    mathConcept: 'Mathematical Concept:',
    difficulty: {
      easy: 'EASY',
      medium: 'MEDIUM',
      hard: 'HARD',
    }
  };

  React.useEffect(() => {
    setShowHint(false);
    setShowGuide(false);
    setShowExplanation(false);
  }, [problem.id]);

  React.useEffect(() => {
    if (problem.category === '15 Puzzle') {
      setTiles(initializePuzzle(gridSize));
      setMoveCount(0);
    }
  }, [problem.id, gridSize, problem.category]);

  React.useEffect(() => {
    if (problem.category === 'Hex') {
      setHexBoard(initializeHexBoard(hexSize));
      setHexTurn('blue');
      setHexWinner(null);
      setHexWinningPath([]);
      setHexMoveCount(0);
      setIsAiThinking(false);
    }
  }, [problem.id, hexSize, problem.category]);

  React.useEffect(() => {
    if (problem.category === 'Hex' && hexTurn === 'pink' && hexMode === 'vs-ai' && !hexWinner) {
      setIsAiThinking(true);
      const timer = setTimeout(() => {
        const move = getHexAIMove(hexBoard, hexSize);
        if (move) {
          const [r, c] = move;
          const nextBoard = hexBoard.map((rowArr) => [...rowArr]);
          nextBoard[r][c] = 'pink';
          setHexBoard(nextBoard);
          setHexMoveCount(prev => prev + 1);

          const winPath = checkHexWinnerWithPath(nextBoard, hexSize, 'pink');
          if (winPath) {
            setHexWinner('pink');
            setHexWinningPath(winPath);
            setFeedback('incorrect');
            setTimeout(() => {
              onSolve(false);
              setFeedback(null);
            }, 2500);
          } else {
            setHexTurn('blue');
          }
        }
        setIsAiThinking(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hexTurn, hexMode, hexBoard, hexSize, hexWinner, problem.category]);

  const handleHexCellClick = (r: number, c: number) => {
    if (problem.category !== 'Hex') return;
    if (hexWinner || isAiThinking) return;
    if (!hexBoard[r] || hexBoard[r][c] !== null) return;

    const currentTurn = hexTurn;
    const nextBoard = hexBoard.map((rowArr) => [...rowArr]);
    nextBoard[r][c] = currentTurn;
    setHexBoard(nextBoard);
    setHexMoveCount(prev => prev + 1);

    const winPath = checkHexWinnerWithPath(nextBoard, hexSize, currentTurn);
    if (winPath) {
      setHexWinner(currentTurn);
      setHexWinningPath(winPath);
      
      if (currentTurn === 'blue') {
        setFeedback('correct');
        setTimeout(() => {
          onSolve(true);
          setFeedback(null);
        }, 2500);
      } else {
        // In 2 players mode, if Pink wins, treat as solved
        setFeedback('correct');
        setTimeout(() => {
          onSolve(true);
          setFeedback(null);
        }, 2500);
      }
    } else {
      setHexTurn(currentTurn === 'blue' ? 'pink' : 'blue');
    }
  };

  const handleHexReset = () => {
    setHexBoard(initializeHexBoard(hexSize));
    setHexTurn('blue');
    setHexWinner(null);
    setHexWinningPath([]);
    setHexMoveCount(0);
    setIsAiThinking(false);
  };

  // --- INTERACTIVE GAMES INITIALIZER & HOOKS ---
  React.useEffect(() => {
    if (problem.category === 'Sudoku') {
      const orig = Array(81).fill(false);
      const grid = Array(81).fill(null);
      // Solvable 9x9 Sudoku
      const solved = [
        5, 3, 4,  6, 7, 8,  9, 1, 2,
        6, 7, 2,  1, 9, 5,  3, 4, 8,
        1, 9, 8,  3, 4, 2,  5, 6, 7,

        8, 5, 9,  7, 6, 1,  4, 2, 3,
        4, 2, 6,  8, 5, 3,  7, 9, 1,
        7, 1, 3,  9, 2, 4,  8, 5, 6,

        9, 6, 1,  5, 3, 7,  2, 8, 4,
        2, 8, 7,  4, 1, 9,  6, 3, 5,
        3, 4, 5,  2, 8, 6,  1, 7, 9
      ];
      const easyIndices = [
        0, 1, 2, 5, 7, 8,
        9, 11, 12, 14, 15, 17,
        18, 20, 21, 23, 24, 26,
        27, 28, 30, 31, 33, 35,
        36, 37, 39, 41, 43, 44,
        45, 47, 49, 50, 52, 53,
        54, 56, 57, 59, 60, 62,
        63, 65, 66, 68, 69, 71,
        72, 73, 75, 78, 79, 80
      ];
      const mediumIndices = [
        0, 2, 5, 8,
        10, 12, 13, 16,
        18, 21, 22, 25,
        29, 31, 32, 34,
        36, 40, 44,
        46, 48, 49, 51,
        55, 58, 59, 62,
        64, 67, 68, 70,
        72, 75, 78, 80
      ];
      const hardIndices = [
        0, 8,
        11, 15,
        19, 22, 25,
        30, 33,
        40,
        47, 50,
        55, 58, 61,
        65, 69,
        72, 80
      ];

      let keep = easyIndices;
      if (problem.difficulty === 'medium') keep = mediumIndices;
      if (problem.difficulty === 'hard') keep = hardIndices;

      keep.forEach(idx => {
        grid[idx] = solved[idx];
        orig[idx] = true;
      });
      setSudokuGrid(grid);
      setSudokuOriginal(orig);
      setSelectedSudokuIdx(null);
    }

    if (problem.category === 'Magic Squares') {
      const orig = Array(9).fill(false);
      const grid = Array(9).fill(null);
      const solved = [
        8, 1, 6,
        3, 5, 7,
        4, 9, 2
      ];
      // Progressive difficulty: easy keeps 6, medium keeps 4, hard keeps 2
      let keep = [1, 4, 5, 6, 7, 8];
      if (problem.difficulty === 'medium') {
        keep = [1, 4, 5, 8];
      } else if (problem.difficulty === 'hard') {
        keep = [4, 7];
      }
      keep.forEach(idx => {
        grid[idx] = solved[idx];
        orig[idx] = true;
      });
      setMagicGrid(grid);
      setMagicOriginal(orig);
    }

    if (problem.category === 'Game of 24') {
      setGame24Tokens([]);
      setGame24UsedIndices([]);
    }

    if (problem.category === 'Ouri') {
      const initial = Array(14).fill(0);
      for (let i = 0; i < 6; i++) {
        initial[i] = 4;
        initial[i + 7] = 4;
      }
      setOuriPits(initial);
      setOuriTurn('player');
      setOuriWinner(null);
    }

    if (problem.category === 'Senet') {
      setSenetP1([1, 3, 5, 7, 9]);
      setSenetP2([2, 4, 6, 8, 10]);
      setSenetTurn('player');
      setSenetRoll(null);
      setSenetSticks([1, 1, 1, 1]);
      setSenetWinner(null);
      setSenetLog([lang === 'pt' ? '🐫 O jogo começou! Role as varetas para começar.' : '🐫 Game started! Roll the casting sticks to begin.']);
      setSenetHoveredPawn(null);
    }

    if (problem.category === 'Tangram') {
      setTangramPositions([
        { rotation: 90, slot: -1 },
        { rotation: 180, slot: -1 },
        { rotation: 0, slot: -1 },
        { rotation: 270, slot: -1 },
        { rotation: 90, slot: -1 },
        { rotation: 180, slot: -1 },
        { rotation: 0, slot: -1 },
      ]);
      setTangramSelected(null);
    }

    if (problem.category === 'Stomachion') {
      // 14 Stomachion pieces scrambled
      setStomachionPieces([90, 180, 270, 0, 90, 180, 270, 0, 90, 180, 270, 0, 90, 180]);
    }
  }, [problem.id, problem.category, problem.difficulty]);

  // Ouri AI turn trigger
  React.useEffect(() => {
    if (problem.category === 'Ouri' && ouriTurn === 'ai' && !ouriWinner) {
      const timer = setTimeout(() => {
        const validPits = [7, 8, 9, 10, 11, 12].filter(idx => ouriPits[idx] > 0);
        if (validPits.length === 0) {
          concludeOuri(ouriPits);
          return;
        }

        const choice = validPits[Math.floor(Math.random() * validPits.length)];
        const nextPits = [...ouriPits];
        let seeds = nextPits[choice];
        nextPits[choice] = 0;

        let curr = choice;
        while (seeds > 0) {
          if (curr === 5) curr = 7;
          else if (curr === 12) curr = 0;
          else curr += 1;

          nextPits[curr]++;
          seeds--;
        }

        let captureCurr = curr;
        while (captureCurr >= 0 && captureCurr <= 5 && (nextPits[captureCurr] === 2 || nextPits[captureCurr] === 3)) {
          nextPits[13] += nextPits[captureCurr];
          nextPits[captureCurr] = 0;
          if (captureCurr === 7) captureCurr = 5;
          else if (captureCurr === 0) captureCurr = 12;
          else captureCurr -= 1;
        }

        setOuriPits(nextPits);

        if (checkOuriEnd(nextPits)) {
          concludeOuri(nextPits);
        } else {
          setOuriTurn('player');
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [ouriTurn, ouriPits, ouriWinner, problem.category]);

  // Senet AI turn trigger
  React.useEffect(() => {
    if (problem.category === 'Senet' && senetTurn === 'ai' && !senetWinner) {
      const timer = setTimeout(() => {
        const sticks = Array.from({ length: 4 }, () => Math.random() > 0.5 ? 1 : 0);
        const sum = sticks.reduce((a, b) => a + b, 0);
        const rollVal = sum === 0 ? 5 : sum;
        setSenetSticks(sticks);

        const validMoves = senetP2
          .map((pos, idx) => ({ pos, idx }))
          .filter(item => {
            if (item.pos === 99) return false;
            const target = item.pos + rollVal;
            if (target > 30) return false;
            const oppCount = senetP1.filter(p => p === target).length;
            return oppCount < 2;
          });

        const rollMsg = lang === 'pt'
          ? `🤖 AI tirou ${rollVal} nas varetas!`
          : `🤖 AI rolled ${rollVal}!`;
        setSenetLog(prev => [rollMsg, ...prev].slice(0, 8));

        if (validMoves.length === 0) {
          const noMoveMsg = lang === 'pt'
            ? `🤖 AI não possui movimentos válidos! Turno do jogador.`
            : `🤖 AI has no valid moves! Your turn.`;
          setSenetLog(prev => [noMoveMsg, ...prev].slice(0, 8));
          setSenetTurn('player');
          return;
        }

        const { idx, pos } = validMoves[Math.floor(Math.random() * validMoves.length)];
        const nextP1 = [...senetP1];
        const nextP2 = [...senetP2];
        const target = pos + rollVal;

        let actionMsg = '';
        if (target === 30) {
          nextP2[idx] = 99;
          actionMsg = lang === 'pt'
            ? `🤖 AI retirou uma peça do tabuleiro!`
            : `🤖 AI bore off a piece!`;
        } else if (target === 27) {
          const isLifeOccupied = nextP1.includes(15) || nextP2.includes(15);
          nextP2[idx] = isLifeOccupied ? 1 : 15;
          actionMsg = lang === 'pt'
            ? `💀 AI caiu na Casa da Água e voltou para a ${isLifeOccupied ? 'casa 1' : 'casa 15'}!`
            : `💀 AI fell into the House of Water and returned to ${isLifeOccupied ? 'square 1' : 'square 15'}!`;
        } else {
          const oppCount = senetP1.filter(p => p === target).length;
          if (oppCount === 1) {
            const oppIdx = senetP1.indexOf(target);
            nextP1[oppIdx] = pos;
            actionMsg = lang === 'pt'
              ? `⚔️ AI capturou sua peça na casa ${target}! Trocando para a casa ${pos}.`
              : `⚔️ AI captured your piece at ${target}! Swapped to ${pos}.`;
          } else {
            actionMsg = lang === 'pt'
              ? `🤖 AI moveu da casa ${pos} para a casa ${target}.`
              : `🤖 AI moved from square ${pos} to ${target}.`;
          }
          nextP2[idx] = target;
        }
        setSenetLog(prev => [actionMsg, ...prev].slice(0, 8));

        setSenetP2(nextP2);
        setSenetP1(nextP1);

        if (nextP2.every(p => p === 99)) {
          setSenetWinner('ai');
          setFeedback('incorrect');
          setTimeout(() => {
            onSolve(false);
            setFeedback(null);
          }, 2500);
        } else {
          setSenetTurn('player');
        }
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [senetTurn, senetP1, senetP2, senetWinner, problem.category, lang]);

  // --- SUDOKU LOGIC ---
  const checkSudokuSolved = (grid: (number | null)[]) => {
    if (grid.some(cell => cell === null)) return false;
    
    // Check rows
    for (let r = 0; r < 9; r++) {
      const row = [];
      for (let c = 0; c < 9; c++) {
        row.push(grid[r * 9 + c]);
      }
      if (new Set(row).size !== 9) return false;
    }
    
    // Check columns
    for (let c = 0; c < 9; c++) {
      const col = [];
      for (let r = 0; r < 9; r++) {
        col.push(grid[r * 9 + c]);
      }
      if (new Set(col).size !== 9) return false;
    }
    
    // Check 3x3 boxes
    for (let br = 0; br < 3; br++) {
      for (let bc = 0; bc < 3; bc++) {
        const box = [];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            box.push(grid[(br * 3 + r) * 9 + (bc * 3 + c)]);
          }
        }
        if (new Set(box).size !== 9) return false;
      }
    }
    
    return true;
  };

  const handleSudokuCellClick = (idx: number) => {
    if (sudokuOriginal[idx]) return;
    setSelectedSudokuIdx(idx);
  };

  const handleSudokuNumberPadClick = (num: number | null) => {
    if (selectedSudokuIdx === null) return;
    if (sudokuOriginal[selectedSudokuIdx]) return;
    const nextGrid = [...sudokuGrid];
    nextGrid[selectedSudokuIdx] = num;
    setSudokuGrid(nextGrid);

    if (checkSudokuSolved(nextGrid)) {
      setFeedback('correct');
      setTimeout(() => {
        onSolve(true);
        setFeedback(null);
      }, 2500);
    }
  };

  // --- MAGIC SQUARES LOGIC ---
  const checkMagicSolved = (grid: (number | null)[]) => {
    if (grid.some(cell => cell === null)) return false;
    const set = new Set(grid);
    if (set.size !== 9) return false;
    if (Array.from(set).some(val => val! < 1 || val! > 9)) return false;

    const sums = [
      grid[0]! + grid[1]! + grid[2]!,
      grid[3]! + grid[4]! + grid[5]!,
      grid[6]! + grid[7]! + grid[8]!,
      grid[0]! + grid[3]! + grid[6]!,
      grid[1]! + grid[4]! + grid[7]!,
      grid[2]! + grid[5]! + grid[8]!,
      grid[0]! + grid[4]! + grid[8]!,
      grid[2]! + grid[4]! + grid[6]!
    ];
    return sums.every(s => s === 15);
  };

  const handleMagicCellClick = (idx: number) => {
    if (magicOriginal[idx]) return;
    const nextGrid = [...magicGrid];
    const curr = nextGrid[idx];
    if (curr === null) {
      nextGrid[idx] = 1;
    } else if (curr === 9) {
      nextGrid[idx] = null;
    } else {
      nextGrid[idx] = curr + 1;
    }
    setMagicGrid(nextGrid);

    if (checkMagicSolved(nextGrid)) {
      setFeedback('correct');
      setTimeout(() => {
        onSolve(true);
        setFeedback(null);
      }, 2500);
    }
  };

  // --- GAME OF 24 LOGIC ---
  const handleGame24NumberClick = (num: number, index: number) => {
    if (game24UsedIndices.includes(index)) return;
    setGame24Tokens([...game24Tokens, num.toString()]);
    setGame24UsedIndices([...game24UsedIndices, index]);
  };

  const handleGame24OpClick = (op: string) => {
    setGame24Tokens([...game24Tokens, op]);
  };

  const handleGame24Clear = () => {
    setGame24Tokens([]);
    setGame24UsedIndices([]);
  };

  const handleGame24Undo = () => {
    if (game24Tokens.length === 0) return;
    const last = game24Tokens[game24Tokens.length - 1];
    const nextTokens = game24Tokens.slice(0, -1);
    setGame24Tokens(nextTokens);

    const isNumVal = !isNaN(parseFloat(last));
    if (isNumVal) {
      const nextUsed = [...game24UsedIndices];
      nextUsed.pop();
      setGame24UsedIndices(nextUsed);
    }
  };

  const handleGame24Verify = () => {
    if (game24UsedIndices.length !== 4) return;
    const formula = game24Tokens.join('');
    if (/[^0-9+\-*/().\s]/.test(formula)) return;

    try {
      const res = new Function(`return (${formula})`)();
      if (res === 24) {
        setFeedback('correct');
        setTimeout(() => {
          onSolve(true);
          setFeedback(null);
        }, 2500);
      } else {
        setFeedback('incorrect');
        setTimeout(() => {
          setFeedback(null);
        }, 1500);
      }
    } catch {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
      }, 1500);
    }
  };

  // --- OURI LOGIC ---
  const handleOuriPitClick = (pitIdx: number) => {
    if (ouriWinner) return;
    if (ouriTurn !== 'player') return;
    if (pitIdx < 0 || pitIdx > 5) return;
    if (ouriPits[pitIdx] === 0) return;

    const nextPits = [...ouriPits];
    let seeds = nextPits[pitIdx];
    nextPits[pitIdx] = 0;

    let curr = pitIdx;
    while (seeds > 0) {
      if (curr === 5) curr = 7;
      else if (curr === 12) curr = 0;
      else curr += 1;

      nextPits[curr]++;
      seeds--;
    }

    let captureCurr = curr;
    while (captureCurr >= 7 && captureCurr <= 12 && (nextPits[captureCurr] === 2 || nextPits[captureCurr] === 3)) {
      nextPits[6] += nextPits[captureCurr];
      nextPits[captureCurr] = 0;
      if (captureCurr === 7) captureCurr = 5;
      else if (captureCurr === 0) captureCurr = 12;
      else captureCurr -= 1;
    }

    setOuriPits(nextPits);

    if (checkOuriEnd(nextPits)) {
      concludeOuri(nextPits);
    } else {
      setOuriTurn('ai');
    }
  };

  const checkOuriEnd = (pits: number[]) => {
    const playerHasMoves = pits.slice(0, 6).some(s => s > 0);
    const opponentHasMoves = pits.slice(7, 13).some(s => s > 0);
    return !playerHasMoves || !opponentHasMoves || pits[6] >= 24 || pits[13] >= 24;
  };

  const concludeOuri = (pits: number[]) => {
    const finalPits = [...pits];
    let pScore = finalPits[6];
    let oScore = finalPits[13];

    for (let i = 0; i < 6; i++) {
      pScore += finalPits[i];
      finalPits[i] = 0;
    }
    for (let i = 7; i < 13; i++) {
      oScore += finalPits[i];
      finalPits[i] = 0;
    }

    finalPits[6] = pScore;
    finalPits[13] = oScore;
    setOuriPits(finalPits);

    if (pScore > oScore) {
      setOuriWinner('player');
      setFeedback('correct');
      setTimeout(() => {
        onSolve(true);
        setFeedback(null);
      }, 2500);
    } else {
      setOuriWinner('ai');
      setFeedback('incorrect');
      setTimeout(() => {
        onSolve(false);
        setFeedback(null);
      }, 2500);
    }
  };

  // --- SENET LOGIC ---
  const handleSenetRoll = () => {
    if (senetWinner || senetTurn !== 'player' || senetRoll !== null) return;
    const sticks = Array.from({ length: 4 }, () => Math.random() > 0.5 ? 1 : 0);
    const sum = sticks.reduce((a, b) => a + b, 0);
    const rollVal = sum === 0 ? 5 : sum;

    setSenetSticks(sticks);
    setSenetRoll(rollVal);

    const hasValidMove = senetP1.some(pos => {
      if (pos === 99) return false;
      const target = pos + rollVal;
      if (target > 30) return false;
      const opponentCount = senetP2.filter(p => p === target).length;
      return opponentCount < 2;
    });

    const rollMsg = lang === 'pt'
      ? `🎲 Você tirou ${rollVal} nas varetas!`
      : `🎲 You rolled ${rollVal}!`;
    setSenetLog(prev => [rollMsg, ...prev].slice(0, 8));

    if (!hasValidMove) {
      const noMoveMsg = lang === 'pt'
        ? `🤷‍♂️ Sem movimentos válidos! Seu turno acabou.`
        : `🤷‍♂️ No valid moves! Your turn ends.`;
      setSenetLog(prev => [noMoveMsg, ...prev].slice(0, 8));
      setTimeout(() => {
        setSenetRoll(null);
        setSenetTurn('ai');
      }, 1500);
    }
  };

  const handleSenetPawnClick = (pawnIdx: number) => {
    if (senetWinner || senetTurn !== 'player' || senetRoll === null) return;
    const startPos = senetP1[pawnIdx];
    const targetPos = startPos + senetRoll;

    if (targetPos > 30) return;

    const opponentCount = senetP2.filter(pos => pos === targetPos).length;
    if (opponentCount >= 2) return;

    const nextP1 = [...senetP1];
    const nextP2 = [...senetP2];

    let actionMsg = '';
    if (targetPos === 30) {
      nextP1[pawnIdx] = 99;
      actionMsg = lang === 'pt'
        ? `🎉 Você retirou uma peça do tabuleiro!`
        : `🎉 You bore off a piece!`;
    } else if (targetPos === 27) {
      const isLifeOccupied = nextP1.includes(15) || nextP2.includes(15);
      nextP1[pawnIdx] = isLifeOccupied ? 1 : 15;
      actionMsg = lang === 'pt'
        ? `💀 Sua peça caiu na Casa da Água e voltou para a ${isLifeOccupied ? 'casa 1' : 'casa 15'}!`
        : `💀 Your piece fell into the House of Water and returned to ${isLifeOccupied ? 'square 1' : 'square 15'}!`;
    } else {
      if (opponentCount === 1) {
        const oppPawnIdx = senetP2.indexOf(targetPos);
        nextP2[oppPawnIdx] = startPos;
        actionMsg = lang === 'pt'
          ? `⚔️ Você capturou a peça da AI na casa ${targetPos}! Trocando para a casa ${startPos}.`
          : `⚔️ You captured the AI piece at ${targetPos}! Swapped to ${startPos}.`;
      } else {
        actionMsg = lang === 'pt'
          ? `🏃‍♂️ Você moveu de ${startPos} para ${targetPos}.`
          : `🏃‍♂️ You moved from ${startPos} to ${targetPos}.`;
      }
      nextP1[pawnIdx] = targetPos;
    }

    setSenetLog(prev => [actionMsg, ...prev].slice(0, 8));
    setSenetHoveredPawn(null);
    setSenetP1(nextP1);
    setSenetP2(nextP2);
    setSenetRoll(null);

    if (nextP1.every(pos => pos === 99)) {
      setSenetWinner('player');
      setFeedback('correct');
      setTimeout(() => {
        onSolve(true);
        setFeedback(null);
      }, 2500);
    } else {
      setSenetTurn('ai');
    }
  };

  // --- TANGRAM LOGIC ---
  const handleTangramPieceSelect = (pieceIdx: number) => {
    setTangramSelected(pieceIdx);
  };

  const handleTangramRotate = (direction: 'left' | 'right') => {
    if (tangramSelected === null) return;
    const next = [...tangramPositions];
    const currentRot = next[tangramSelected].rotation;
    const delta = direction === 'left' ? -90 : 90;
    next[tangramSelected].rotation = (currentRot + delta + 360) % 360;
    setTangramPositions(next);
    checkTangramSolved(next);
  };

  const handleTangramSlotClick = (slotIdx: number) => {
    const pieceInSlotIdx = tangramPositions.findIndex(p => p.slot === slotIdx);
    if (pieceInSlotIdx !== -1) {
      // Slot is occupied! Return this piece to the tray and select it
      const next = [...tangramPositions];
      next[pieceInSlotIdx].slot = -1;
      setTangramPositions(next);
      setTangramSelected(pieceInSlotIdx);
      return;
    }

    if (tangramSelected === null) return;
    const next = [...tangramPositions];
    next[tangramSelected].slot = slotIdx;
    setTangramPositions(next);
    setTangramSelected(null);
    checkTangramSolved(next);
  };

  const checkTangramSolved = (positions: { rotation: number; slot: number }[]) => {
    const targets = [0, 90, 180, 270, 0, 90, 180];
    const isSolved = positions.every((p, idx) => p.slot === idx && p.rotation === targets[idx]);
    if (isSolved) {
      setFeedback('correct');
      setTimeout(() => {
        onSolve(true);
        setFeedback(null);
      }, 2500);
    }
  };

  // --- STOMACHION LOGIC ---
  const handleStomachionPieceClick = (pieceIdx: number) => {
    const nextRotations = [...stomachionPieces];
    nextRotations[pieceIdx] = (nextRotations[pieceIdx] + 90) % 360;
    setStomachionPieces(nextRotations);

    const isSolved = nextRotations.every(rot => rot === 0);
    if (isSolved) {
      setFeedback('correct');
      setTimeout(() => {
        onSolve(true);
        setFeedback(null);
      }, 2500);
    }
  };

  const handleTileClick = (tileIndex: number) => {
    if (feedback === 'correct') return;

    const blankIndex = tiles.indexOf(null);
    if (blankIndex === -1) return;

    const rTile = Math.floor(tileIndex / gridSize);
    const cTile = tileIndex % gridSize;
    const rBlank = Math.floor(blankIndex / gridSize);
    const cBlank = blankIndex % gridSize;

    const dist = Math.abs(rTile - rBlank) + Math.abs(cTile - cBlank);
    if (dist === 1) {
      const nextTiles = [...tiles];
      nextTiles[blankIndex] = tiles[tileIndex];
      nextTiles[tileIndex] = null;
      
      setTiles(nextTiles);
      setMoveCount(prev => prev + 1);

      if (checkIsSolved(nextTiles)) {
        setFeedback('correct');
        setTimeout(() => {
          onSolve(true);
          setFeedback(null);
        }, 2200);
      }
    }
  };

  const handleReset = () => {
    setTiles(initializePuzzle(gridSize));
    setMoveCount(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput) return;
    
    let isCorrect = false;
    if (typeof problem.answer === 'number') {
      isCorrect = parseFloat(userInput) === problem.answer;
    } else {
      isCorrect = userInput.trim().toLowerCase() === problem.answer.toString().toLowerCase();
    }
    
    if (isCorrect) {
      setFeedback('correct');
      setShowExplanation(true);
      setTimeout(() => {
        onSolve(true);
        setUserInput('');
        setFeedback(null);
      }, 2000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        onSolve(false);
        setFeedback(null);
      }, 1000);
    }
  };

  const choiceLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
  const isInteractive = ['Hex', '15 Puzzle', 'Sudoku', 'Magic Squares', 'Ouri', 'Senet', 'Game of 24'].includes(problem.category);

  const getInteractiveInstructions = (category: string, currentLang: 'pt' | 'en') => {
    if (currentLang === 'pt') {
      switch (category) {
        case 'Hex':
          return "Conecte as bordas azuis (superior e inferior) com um caminho contínuo de células Azuis. Clique nas células para posicionar suas peças e bloqueie a IA para vencer!";
        case '15 Puzzle':
          return "Ordene os números sequencialmente de 1 a 15, deixando o espaço vazio no canto inferior direito. Clique em qualquer peça adjacente ao espaço vazio para movê-la!";
        case 'Sudoku':
          return "Resolva o tabuleiro de Sudoku real preenchendo todas as células vazias com números de 1 a 9. Cada linha, coluna e subgrade 3x3 deve conter todos os dígitos de 1 a 9 sem repetições!";
        case 'Magic Squares':
          return "Organize os números de 1 a 9 no quadrado mágico 3x3 de modo que a soma de todas as linhas, colunas e diagonais seja exatamente 15! Clique nas células vazias para alternar e posicionar os números.";
        case 'Game of 24':
          return "Use os 4 números fornecidos exatamente uma vez com as operações básicas (+, -, *, /) e parênteses para construir uma expressão que resulte exatamente em 24!";
        case 'Ouri':
          return "Jogue o clássico Ouri contra a IA. Semeie sementes no sentido anti-horário e capture as sementes do oponente ao terminar com 2 ou 3 sementes em suas casas. Vença capturando 24 ou mais sementes!";
        case 'Senet':
          return "Jogue o ancestral jogo egípcio Senet contra a IA. Lance as varetas para rolar de 1 a 5, avance suas peças no tabuleiro em formato de S e retire todas as suas peças do tabuleiro para vencer!";
        default:
          return problem.question;
      }
    } else {
      switch (category) {
        case 'Hex':
          return "Connect the blue edges (top and bottom) with a continuous path of Blue cells. Click cells to place your pieces and block the AI to win!";
        case '15 Puzzle':
          return "Order the numbers sequentially from 1 to 15, leaving the empty slot in the bottom-right corner. Click any tile adjacent to the empty slot to slide it!";
        case 'Sudoku':
          return "Solve the real Sudoku board by filling all empty cells with numbers from 1 to 9. Each row, column, and 3x3 subgrid must contain digits 1 to 9 without repetitions!";
        case 'Magic Squares':
          return "Arrange the numbers from 1 to 9 in the 3x3 grid such that every row, column, and diagonal sums to exactly 15! Click empty cells to cycle and place numbers.";
        case 'Game of 24':
          return "Use the 4 given numbers exactly once with basic operators (+, -, *, /) and parentheses to construct a mathematical expression that equals exactly 24!";
        case 'Ouri':
          return "Play the classic Ouri game against the AI. Sow seeds counter-clockwise and capture opponent seeds when ending with 2 or 3 seeds in their houses. Win by capturing 24 or more seeds!";
        case 'Senet':
          return "Play the ancient Egyptian game Senet against the AI. Throw the sticks to roll 1 to 5, advance your pieces along the S-shaped path, and bear all your pieces off the board to win!";
        default:
          return problem.question;
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-[48px] border-[10px] border-[#2D3436] shadow-neo-lg relative overflow-hidden flex flex-col min-h-[600px]"
    >
      {/* Decorative System Header */}
      <div className="bg-[#2D3436] px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-neo-pink" />
            <div className="w-2 h-2 rounded-full bg-neo-yellow" />
            <div className="w-2 h-2 rounded-full bg-neo-green" />
          </div>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] font-mono italic">Task.Simulation_OS.v4</span>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-[9px] font-black text-neo-green uppercase tracking-[0.3em] font-mono animate-pulse">Status: Processing</div>
        </div>
      </div>

      <div className="p-4 md:p-12 flex-1 flex flex-col">
        <div className="flex flex-wrap items-center justify-between gap-6 mb-8 shrink-0">
          <div className="flex items-center gap-3">
            <div className={`px-5 py-2.5 rounded-xl border-[3px] border-[#2D3436] font-black text-[10px] uppercase tracking-[0.2em] shadow-neo-sm italic ${
              problem.difficulty === 'easy' ? 'bg-neo-green text-[#2D3436]' :
              problem.difficulty === 'medium' ? 'bg-neo-yellow text-[#2D3436]' :
              'bg-neo-pink text-white'
            }`}>
              {t.difficulty[problem.difficulty]}
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-2.5 bg-[#2D3436] rounded-xl text-white font-black shadow-neo-sm">
             <Zap size={14} fill="currentColor" className="text-neo-yellow" />
             <span className="font-mono text-xs tracking-tighter uppercase">{problem.points} XP</span>
          </div>
        </div>

        {isInteractive && (
          <div className="mb-6 flex flex-col gap-4 shrink-0">
            {/* Unified beautiful top-aligned Game Title & Instructions Header */}
            <div className="bg-slate-50 dark:bg-zinc-900 rounded-[32px] p-6 border-[4px] border-[#2D3436] dark:border-white/20 relative overflow-hidden group shadow-neo-sm">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                 <Brain size={120} />
              </div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                <div className="space-y-1 flex-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-neo-purple/10 border border-[#2D3436]/20 rounded-full text-neo-purple font-mono text-[9px] font-black uppercase tracking-wider">
                    🕹️ {problem.category}
                  </span>
                  <h2 className="text-xl md:text-2xl text-[#2D3436] dark:text-white leading-tight font-black uppercase italic mt-1.5">
                    {getInteractiveInstructions(problem.category, lang === 'pt' ? 'pt' : 'en')}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowGuide(!showGuide)}
                    className="px-4 py-2 bg-neo-blue text-white hover:bg-opacity-90 border-[3px] border-[#2D3436] rounded-xl font-black text-[10px] uppercase tracking-wider shadow-neo-sm hover:shadow-neo transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    📖 {showGuide ? (lang === 'pt' ? 'Ocultar Guia' : 'Hide Guide') : (lang === 'pt' ? 'Guia do Jogo' : 'Game Guide')}
                  </button>

                  {problem.hint && (
                    <button
                      type="button"
                      onClick={() => setShowHint(!showHint)}
                      className="px-4 py-2 bg-neo-yellow hover:bg-[#FFEAA7] text-[#2D3436] border-[3px] border-[#2D3436] rounded-xl font-black text-[10px] uppercase tracking-wider shadow-neo-sm hover:shadow-neo transition-all cursor-pointer"
                    >
                      💡 {showHint ? t.hintHide : t.hintShow}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowExplanation(!showExplanation)}
                    className="px-4 py-2 bg-neo-pink text-white hover:bg-opacity-90 border-[3px] border-[#2D3436] rounded-xl font-black text-[10px] uppercase tracking-wider shadow-neo-sm hover:shadow-neo transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    🎓 {showExplanation ? t.explanationHide : t.explanationShow}
                  </button>
                  
                  {/* Neon Active Win Indicator badge */}
                  <div className="px-4 py-2 bg-neo-green/10 border-[3px] border-[#2D3436] rounded-xl flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-neo-green animate-pulse" />
                    <span className="font-mono text-[9px] font-black text-[#2D3436] dark:text-white/80 uppercase tracking-wider">
                      {lang === 'pt' ? 'Jogo Direto' : 'Direct Play'}
                    </span>
                  </div>
                </div>
              </div>

              {problem.hint && (
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full bg-amber-50 dark:bg-amber-950/20 border-[3px] border-dashed border-[#2D3436]/40 rounded-2xl p-4 overflow-hidden"
                    >
                      <p className="font-mono text-[11px] font-black text-[#2D3436]/70 dark:text-white/70 leading-relaxed uppercase">
                        🔧 {translateText(problem.hint, lang === 'pt' ? 'pt' : 'en')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25 }}
                    className="w-full bg-neo-pink/5 dark:bg-neo-pink/10 border-[3px] border-neo-pink rounded-2xl p-5 overflow-hidden text-left"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-[#2D3436] dark:text-white font-black text-xs md:text-sm uppercase tracking-wide">
                      <span>🎓</span>
                      <span className="text-zinc-500 dark:text-zinc-400">{t.mathConcept}</span>
                      <span className="text-neo-pink bg-neo-pink/10 px-2 py-0.5 rounded-lg border border-neo-pink/30 font-mono text-xs font-black">
                        {mathExplanation.concept}
                      </span>
                    </div>
                    <p className="font-sans text-xs md:text-sm font-medium text-[#2D3436] dark:text-zinc-300 leading-relaxed">
                      {mathExplanation.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {showGuide && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="w-full bg-[#FCFBF4] dark:bg-zinc-900 border-[4px] border-[#2D3436] dark:border-white/20 rounded-[28px] overflow-hidden flex flex-col shadow-neo-sm text-[#2D3436] dark:text-white"
                  >
                    {/* Retro Booklet Top Bar */}
                    <div className="bg-[#2D3436] dark:bg-zinc-800 text-white px-6 py-3.5 flex items-center justify-between border-b-[4px] border-[#2D3436]">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">📖</span>
                        <span className="font-mono text-xs font-black uppercase tracking-[0.2em]">
                          {lang === 'pt' ? 'MANUAL DE INSTRUÇÕES DA MISSÃO' : 'MISSION INSTRUCTION HANDBOOK'}
                        </span>
                      </div>
                      <span className="font-mono text-[9px] font-bold text-neo-yellow uppercase bg-[#2D3436] px-2 py-0.5 border border-white/20 rounded">
                        {problem.category} v1.0
                      </span>
                    </div>

                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#2D3436]/10">
                      {/* Como Jogar (How to Play) Column */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-neo-blue/15 border-2 border-neo-blue flex items-center justify-center text-neo-blue font-black">
                            1
                          </div>
                          <h4 className="font-black text-sm uppercase tracking-wider text-neo-blue italic">
                            {lang === 'pt' ? 'Regras de Como Jogar' : 'Rules & How to Play'}
                          </h4>
                        </div>
                        
                        <ul className="space-y-3.5 pl-1">
                          {getGameGuide(problem.category, lang === 'pt' ? 'pt' : 'en').howToPlay.map((step, idx) => (
                            <li key={idx} className="font-mono text-xs font-bold leading-relaxed flex items-start gap-3 text-slate-700 dark:text-zinc-300">
                              <span className="text-neo-blue text-base leading-none select-none">▸</span>
                              <span className="flex-1">{step}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Jogadas Vencedoras (Winning Moves / Strategy) Column */}
                      <div className="space-y-4 pt-6 md:pt-0 md:pl-8">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-neo-pink/15 border-2 border-neo-pink flex items-center justify-center text-neo-pink font-black">
                            2
                          </div>
                          <h4 className="font-black text-sm uppercase tracking-wider text-neo-pink italic">
                            {lang === 'pt' ? 'Jogadas Vencedoras & Estratégia' : 'Winning Moves & Tactics'}
                          </h4>
                        </div>

                        <ul className="space-y-3.5 pl-1">
                          {getGameGuide(problem.category, lang === 'pt' ? 'pt' : 'en').winningMoves.map((strategy, idx) => (
                            <li key={idx} className="font-mono text-xs font-bold leading-relaxed flex items-start gap-3 text-slate-700 dark:text-zinc-300">
                              <span className="text-neo-pink text-base leading-none select-none">★</span>
                              <span className="flex-1">{strategy}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Footer Tips Badge */}
                    <div className="bg-slate-100 dark:bg-zinc-800/40 px-6 py-3 border-t-2 border-[#2D3436]/10 flex flex-wrap items-center justify-between gap-4">
                      <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
                        {lang === 'pt' ? '💡 Dica: Siga o manual para obter a pontuação máxima.' : '💡 Hint: Follow the manual to secure maximum points.'}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowGuide(false)}
                        className="text-[10px] font-black text-neo-pink uppercase tracking-wider hover:underline focus:outline-none"
                      >
                        [ {lang === 'pt' ? 'Ocultar Manual' : 'Minimize Manual'} ]
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        <div className="flex flex-col flex-1 min-h-0">
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
            {problem.category === 'Hex' ? (
          <div className="flex-1 flex flex-col">
            {/* Banner info */}
            <div className="bg-slate-50 rounded-[32px] p-6 border-[4px] border-[#2D3436] relative overflow-hidden mb-6">
              <h3 className="text-xl md:text-2xl text-[#2D3436] font-black uppercase italic leading-none flex flex-wrap items-center gap-2">
                <span>🛑 {lang === 'pt' ? 'Jogo de Hex Interativo' : 'Interactive Hex Game'}</span>
                {hexWinner && (
                  <span className={`text-xs px-3 py-1 rounded-lg border-2 border-[#2D3436] ${
                    hexWinner === 'blue' ? 'bg-neo-blue text-white' : 'bg-neo-pink text-white'
                  }`}>
                    🎉 {hexWinner === 'blue' 
                      ? (lang === 'pt' ? 'AZUL VENCEU!' : 'BLUE WINS!') 
                      : (lang === 'pt' ? 'ROSA VENCEU!' : 'PINK WINS!')}
                  </span>
                )}
              </h3>
              <p className="font-mono text-[10px] font-black text-[#2D3436]/60 uppercase tracking-widest mt-2 leading-relaxed">
                {lang === 'pt' 
                  ? 'Conecte as bordas AZUIS superior/inferior. A IA (ou P2) tenta conectar as bordas ROSA esquerda/direita.' 
                  : 'Connect the TOP and BOTTOM blue edges. AI (or P2) connects the LEFT and RIGHT pink edges.'}
              </p>
            </div>

            {/* Selector Size & Mode Controls */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 bg-slate-50 dark:bg-zinc-900 p-6 rounded-3xl border-[4px] border-[#2D3436] dark:border-white/20 shrink-0">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="block text-[10px] font-black text-[#2D3436]/40 dark:text-white/40 uppercase tracking-[0.2em] italic font-mono">
                    {lang === 'pt' ? 'Tamanho do Tabuleiro' : 'Board Size'}
                  </span>
                  <span className="font-mono text-[10px] font-black text-neo-purple uppercase bg-neo-purple/10 dark:bg-neo-purple/30 px-2.5 py-0.5 rounded-lg border-2 border-[#2D3436]/10">
                    {hexSize}x{hexSize} ({hexSize * hexSize} {lang === 'pt' ? 'células' : 'cells'})
                  </span>
                </div>
                
                {/* Plus / Minus Step Controls */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={isAiThinking || hexSize <= 3}
                    onClick={() => setHexSize(prev => Math.max(3, prev - 1))}
                    className={`w-10 h-10 rounded-xl font-black text-lg border-[3px] border-[#2D3436] shadow-neo-sm transition-all flex items-center justify-center cursor-pointer select-none ${
                      isAiThinking || hexSize <= 3
                        ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed dark:bg-zinc-800'
                        : 'bg-white text-[#2D3436] hover:bg-slate-100 hover:-translate-y-0.5 active:translate-y-0 dark:bg-zinc-800 dark:text-white'
                    }`}
                  >
                    -
                  </button>
                  
                  {/* Neobrutalist Range Slider */}
                  <div className="flex-1 px-1 flex items-center">
                    <input
                      type="range"
                      min="3"
                      max="13"
                      value={hexSize}
                      disabled={isAiThinking}
                      onChange={(e) => setHexSize(parseInt(e.target.value))}
                      className="w-full h-3 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-neo-purple border-[2.5px] border-[#2D3436]"
                    />
                  </div>

                  <button
                    type="button"
                    disabled={isAiThinking || hexSize >= 13}
                    onClick={() => setHexSize(prev => Math.min(13, prev + 1))}
                    className={`w-10 h-10 rounded-xl font-black text-lg border-[3px] border-[#2D3436] shadow-neo-sm transition-all flex items-center justify-center cursor-pointer select-none ${
                      isAiThinking || hexSize >= 13
                        ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed dark:bg-zinc-800'
                        : 'bg-white text-[#2D3436] hover:bg-slate-100 hover:-translate-y-0.5 active:translate-y-0 dark:bg-zinc-800 dark:text-white'
                    }`}
                  >
                    +
                  </button>
                </div>

                {/* Preset Fast Selection Tabs */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {[5, 7, 9, 11].map((s) => {
                    const presetLabelsPt: Record<number, string> = {
                      5: 'Rápido',
                      7: 'Médio',
                      9: 'Desafio',
                      11: 'Mestre'
                    };
                    const presetLabelsEn: Record<number, string> = {
                      5: 'Fast',
                      7: 'Medium',
                      9: 'Challenge',
                      11: 'Master'
                    };
                    return (
                      <button
                        key={s}
                        type="button"
                        disabled={isAiThinking}
                        onClick={() => setHexSize(s)}
                        className={`px-2.5 py-1.5 rounded-xl text-[9px] font-black border-2 border-[#2D3436] shadow-neo-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex-1 min-w-[55px] ${
                          hexSize === s 
                            ? 'bg-neo-purple text-white shadow-none' 
                            : 'bg-white text-[#2D3436] hover:bg-slate-100 dark:bg-zinc-800 dark:text-white'
                        }`}
                      >
                        <span className="block leading-none">{s}x{s}</span>
                        <span className="block text-[7px] opacity-65 mt-0.5 uppercase tracking-wider font-mono">
                          {lang === 'pt' ? presetLabelsPt[s] : presetLabelsEn[s]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <span className="block text-[10px] font-black text-[#2D3436]/40 dark:text-white/40 uppercase tracking-[0.2em] italic font-mono">
                  {lang === 'pt' ? 'Modo de Jogo' : 'Game Mode'}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={isAiThinking}
                    onClick={() => {
                      setHexMode('vs-ai');
                      handleHexReset();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black border-2 border-[#2D3436] dark:border-white/20 shadow-neo-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                      hexMode === 'vs-ai' 
                        ? 'bg-neo-purple text-white shadow-none border-neo-purple' 
                        : 'bg-white text-[#2D3436] hover:bg-slate-100 dark:bg-zinc-800 dark:text-white'
                    }`}
                  >
                    🤖 {lang === 'pt' ? 'Contra IA' : 'VS AI'}
                  </button>
                  <button
                    type="button"
                    disabled={isAiThinking}
                    onClick={() => {
                      setHexMode('2-players');
                      handleHexReset();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[10px] font-black border-2 border-[#2D3436] dark:border-white/20 shadow-neo-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                      hexMode === '2-players' 
                        ? 'bg-neo-purple text-white shadow-none border-neo-purple' 
                        : 'bg-white text-[#2D3436] hover:bg-slate-100 dark:bg-zinc-800 dark:text-white'
                    }`}
                  >
                    👥 {lang === 'pt' ? '2 Jogadores' : '2 Players'}
                  </button>
                </div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-zinc-900 p-4 rounded-2xl border-2 border-[#2D3436] dark:border-white/20 mb-6 shrink-0 font-mono text-[#2D3436] dark:text-white">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#2D3436]/50 dark:text-white/50 uppercase">
                  {lang === 'pt' ? 'Turno:' : 'Turn:'}
                </span>
                {hexWinner ? (
                  <span className="text-xs font-black uppercase text-neo-green">
                    {lang === 'pt' ? 'Fim de jogo!' : 'Game Over!'}
                  </span>
                ) : isAiThinking ? (
                  <span className="text-xs font-black uppercase text-neo-pink animate-pulse flex items-center gap-1">
                    <span>⚡</span> {lang === 'pt' ? 'IA pensando...' : 'AI thinking...'}
                  </span>
                ) : (
                  <span className={`text-xs px-2 py-0.5 rounded border-2 border-[#2D3436] font-black uppercase ${
                    hexTurn === 'blue' ? 'bg-neo-blue text-white' : 'bg-neo-pink text-white'
                  }`}>
                    {hexTurn === 'blue' 
                      ? (lang === 'pt' ? 'Azul 🔵' : 'Blue 🔵') 
                      : (lang === 'pt' ? 'Rosa 🌸' : 'Pink 🌸')}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <span className="text-[10px] font-black text-[#2D3436]/40 dark:text-white/40 uppercase block leading-none">
                    {lang === 'pt' ? 'Jogadas' : 'Moves'}
                  </span>
                  <span className="text-lg font-black text-[#2D3436] dark:text-white">{hexMoveCount}</span>
                </div>

                <button
                  type="button"
                  onClick={handleHexReset}
                  className="px-3 py-1.5 bg-neo-yellow hover:bg-[#FFEAA7] text-[#2D3436] border-2 border-[#2D3436] dark:border-white/20 rounded-xl font-black text-[10px] uppercase shadow-neo-sm hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  🔄 {lang === 'pt' ? 'Reiniciar' : 'Reset'}
                </button>
              </div>
            </div>

            {/* Board render with SVG */}
            <div className="flex-1 flex items-center justify-center p-2 min-h-[350px] overflow-auto">
              <div className="max-w-xl md:max-w-2xl w-full bg-[#FCFBF4] dark:bg-zinc-900/60 p-6 md:p-8 rounded-[40px] border-[5px] border-[#2D3436] dark:border-white/20 shadow-neo">
                <svg
                  viewBox={`0 0 ${2 * 35 + 1.5 * (hexSize - 1) * (Math.sqrt(3) * 22) + 2 * 22} ${2 * 35 + (hexSize - 1) * (1.5 * 22) + 2 * 22}`}
                  className="w-full h-auto drop-shadow-md select-none"
                >
                  {/* Outer connections lines / borders */}
                  {/* Top Blue border */}
                  <path
                    d={Array.from({ length: hexSize }, (_, c) => {
                      const cx = 35 + c * (Math.sqrt(3) * 22);
                      const cy = 35;
                      const v = getHexVertices(cx, cy, 22);
                      return `M ${v[4].x} ${v[4].y} L ${v[5].x} ${v[5].y} L ${v[0].x} ${v[0].y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#4D96FF"
                    strokeWidth={8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.8}
                  />
                  {/* Bottom Blue border */}
                  <path
                    d={Array.from({ length: hexSize }, (_, c) => {
                      const cx = 35 + c * (Math.sqrt(3) * 22) + (hexSize - 1) * (Math.sqrt(3) * 22) / 2;
                      const cy = 35 + (hexSize - 1) * (1.5 * 22);
                      const v = getHexVertices(cx, cy, 22);
                      return `M ${v[3].x} ${v[3].y} L ${v[2].x} ${v[2].y} L ${v[1].x} ${v[1].y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#4D96FF"
                    strokeWidth={8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.8}
                  />
                  {/* Left Pink border */}
                  <path
                    d={Array.from({ length: hexSize }, (_, r) => {
                      const cx = 35 + r * (Math.sqrt(3) * 22) / 2;
                      const cy = 35 + r * (1.5 * 22);
                      const v = getHexVertices(cx, cy, 22);
                      return `M ${v[5].x} ${v[5].y} L ${v[4].x} ${v[4].y} L ${v[3].x} ${v[3].y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#FF6B6B"
                    strokeWidth={8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.8}
                  />
                  {/* Right Pink border */}
                  <path
                    d={Array.from({ length: hexSize }, (_, r) => {
                      const cx = 35 + (hexSize - 1) * (Math.sqrt(3) * 22) + r * (Math.sqrt(3) * 22) / 2;
                      const cy = 35 + r * (1.5 * 22);
                      const v = getHexVertices(cx, cy, 22);
                      return `M ${v[0].x} ${v[0].y} L ${v[1].x} ${v[1].y} L ${v[2].x} ${v[2].y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#FF6B6B"
                    strokeWidth={8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity={0.8}
                  />

                  {/* Draw grid of Hexagons */}
                  {hexBoard.map((rowArr, r) => 
                    rowArr.map((cell, c) => {
                      const cx = 35 + c * (Math.sqrt(3) * 22) + r * (Math.sqrt(3) * 22) / 2;
                      const cy = 35 + r * (1.5 * 22);
                      const vertices = getHexVertices(cx, cy, 22);
                      const pointsStr = vertices.map(v => `${v.x},${v.y}`).join(' ');

                      const isWinningCell = hexWinningPath.some(([wr, wc]) => wr === r && wc === c);
                      
                      let fillColor = '#FFFFFF';
                      let hoverColor = 'hover:fill-slate-100';
                      if (cell === 'blue') {
                        fillColor = '#4D96FF';
                      } else if (cell === 'pink') {
                        fillColor = '#FF6B6B';
                      }

                      return (
                        <g key={`${r}-${c}`} className="cursor-pointer">
                          <polygon
                            points={pointsStr}
                            onClick={() => handleHexCellClick(r, c)}
                            fill={fillColor}
                            stroke="#2D3436"
                            strokeWidth={2.5}
                            className={`transition-all duration-150 ${cell === null ? hoverColor : ''} ${
                              isWinningCell ? 'animate-pulse stroke-neo-yellow stroke-[4px]' : ''
                            }`}
                          />
                          {/* Inner circle for additional polish */}
                          {cell !== null && (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={22 * 0.45}
                              fill="none"
                              stroke="#FFFFFF"
                              strokeWidth={3}
                              opacity={0.7}
                              className={isWinningCell ? 'animate-spin' : ''}
                            />
                          )}
                          {/* Subtle text label */}
                          {hexSize <= 7 && cell === null && (
                            <text
                              x={cx}
                              y={cy + 3}
                              textAnchor="middle"
                              className="text-[8px] font-mono font-bold fill-slate-300 pointer-events-none"
                            >
                              {r},{c}
                            </text>
                          )}
                        </g>
                      );
                    })
                  )}
                </svg>
              </div>
            </div>
          </div>
        ) : problem.category === '15 Puzzle' ? (
          <div className="flex-1 flex flex-col">
            {/* Banner info */}
            <div className="bg-slate-50 rounded-[32px] p-6 border-[4px] border-[#2D3436] relative overflow-hidden mb-6">
              <h3 className="text-xl md:text-2xl text-[#2D3436] font-black uppercase italic leading-none">
                🧩 {lang === 'pt' ? 'Jogo dos 15 Interativo' : 'Interactive 15 Puzzle'}
              </h3>
              <p className="font-mono text-[10px] font-black text-[#2D3436]/60 uppercase tracking-widest mt-2 leading-relaxed">
                {lang === 'pt' 
                  ? 'Ordene os números seqüencialmente. Clique em qualquer peça adjacente ao espaço vazio para movê-la!' 
                  : 'Arrange the tiles in consecutive order. Click any tile adjacent to the empty slot to slide it!'}
              </p>
            </div>

            {/* Selector Grid Size & Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 bg-slate-50 dark:bg-zinc-900 p-5 rounded-3xl border-[3px] border-[#2D3436] dark:border-white/20 shrink-0 text-[#2D3436] dark:text-white">
              <div className="space-y-3 text-center sm:text-left w-full sm:w-auto">
                <span className="block text-[10px] font-black text-[#2D3436]/40 dark:text-white/40 uppercase tracking-[0.2em] italic font-mono">
                  {lang === 'pt' ? 'Tamanho do Quadrado' : 'Square Side Size'}
                </span>
                <div className="flex gap-2.5 justify-center sm:justify-start">
                  {[3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setGridSize(s)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-black border-2 border-[#2D3436] dark:border-white/20 shadow-neo-sm transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                        gridSize === s 
                          ? 'bg-neo-purple text-white border-neo-purple' 
                          : 'bg-white text-[#2D3436] hover:bg-slate-100 dark:bg-zinc-800 dark:text-white'
                      }`}
                    >
                      {s}x{s} {s === 3 ? '(8)' : s === 4 ? '(15)' : '(24)'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-[#2D3436]/10 dark:border-white/10 pt-4 sm:pt-0 shrink-0">
                <div className="text-left sm:text-right">
                  <span className="block text-[10px] font-black text-[#2D3436]/40 dark:text-white/40 uppercase tracking-[0.2em] italic font-mono leading-none mb-1">
                    {lang === 'pt' ? 'Movimentos' : 'Moves'}
                  </span>
                  <span className="text-3xl font-black italic tracking-tighter text-[#2D3436] dark:text-white font-mono leading-none">
                    {moveCount}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-3.5 bg-neo-yellow hover:bg-[#FFEAA7] text-[#2D3436] border-[3px] border-[#2D3436] dark:border-white/20 rounded-2xl font-black text-xs uppercase tracking-wider shadow-neo-sm hover:shadow-neo transition-all cursor-pointer"
                >
                  🔄 {lang === 'pt' ? 'Embaralhar' : 'Scramble'}
                </button>
              </div>
            </div>

            {/* Big Interactive Slide Grid */}
            <div className="flex-1 flex items-center justify-center p-4 min-h-[380px]">
              <div 
                className="grid p-6 bg-[#2D3436] dark:bg-zinc-800 border-[12px] border-[#2D3436] dark:border-zinc-700 rounded-[56px] shadow-neo-lg max-w-xl w-full aspect-square gap-4 relative"
                style={{
                  gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                  gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
                }}
              >
                {tiles.map((tile, idx) => {
                  const isCorrectPos = tile !== null && tile === idx + 1;

                  if (tile === null) {
                    return (
                      <div 
                        key={`empty-${idx}`} 
                        className="bg-[#2D3436]/70 dark:bg-zinc-900 rounded-[28px] border-4 border-dashed border-white/20"
                      />
                    );
                  }

                  return (
                    <motion.button
                      key={tile}
                      type="button"
                      layoutId={`puztile-${tile}`}
                      onClick={() => handleTileClick(idx)}
                      whileHover={{ scale: 1.05, zIndex: 10 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: 'spring', stiffness: 350, damping: 26 }}
                      className={`w-full h-full rounded-[28px] border-[5px] border-[#2D3436] dark:border-white/20 flex items-center justify-center font-display font-black shadow-neo-md transition-all duration-150 relative cursor-pointer select-none ${
                        isCorrectPos 
                          ? 'bg-neo-green text-white border-neo-green-dark shadow-none' 
                          : 'bg-white text-[#2D3436] hover:bg-slate-50 dark:bg-zinc-700 dark:text-white'
                      }`}
                    >
                      <span className="text-3xl md:text-5xl font-black tracking-tighter leading-none italic">
                        {tile}
                      </span>
                      {isCorrectPos && (
                        <div className="absolute top-2.5 right-2.5 text-[12px] opacity-80">✨</div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : problem.category === 'Sudoku' ? (
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-50 dark:bg-zinc-900 rounded-[32px] p-6 border-[4px] border-[#2D3436] dark:border-white/20 relative overflow-hidden mb-6">
              <h3 className="text-xl md:text-2xl text-[#2D3436] dark:text-white font-black uppercase italic leading-none">
                🔢 {lang === 'pt' ? 'Sudoku 9x9 Real' : 'Real 9x9 Sudoku'}
              </h3>
              <p className="font-mono text-[10px] font-black text-[#2D3436]/60 dark:text-white/60 uppercase tracking-widest mt-2 leading-relaxed">
                {lang === 'pt' 
                  ? 'O jogo de Sudoku real completo! Clique em qualquer célula vazia para selecioná-la e, em seguida, clique nos números do teclado numérico abaixo para preenchê-la.' 
                  : 'The complete real Sudoku board! Click any empty cell to select it, then use the number pad below to input values from 1 to 9.'}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center py-8 bg-slate-50 dark:bg-zinc-900 rounded-[48px] border-[4px] border-[#2D3436] dark:border-white/20 gap-8 w-full">
              <div className="w-full overflow-x-auto px-6 flex justify-center">
                <div className="grid grid-cols-9 p-6 bg-[#2D3436] dark:bg-zinc-800 rounded-[48px] shadow-neo-lg border-[10px] border-[#2D3436] dark:border-zinc-700 min-w-[500px] max-w-xl md:max-w-2xl w-full">
                {sudokuGrid.map((val, idx) => {
                  const isOrig = sudokuOriginal[idx];
                  const isSelected = selectedSudokuIdx === idx;
                  const isRightBorder = (idx % 9 === 2 || idx % 9 === 5);
                  const isBottomBorder = (Math.floor(idx / 9) === 2 || Math.floor(idx / 9) === 5);

                  return (
                    <div 
                      key={idx} 
                      className={`flex items-center justify-center p-0.5 ${
                        isRightBorder ? 'border-r-[6px] border-r-white/50 pr-2' : ''
                      } ${
                        isBottomBorder ? 'border-b-[6px] border-b-white/50 pb-2' : ''
                      }`}
                    >
                      <motion.button
                        whileTap={isOrig ? {} : { scale: 0.95 }}
                        onClick={() => handleSudokuCellClick(idx)}
                        className={`w-9 h-9 xs:w-11 xs:h-11 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center rounded-xl text-sm sm:text-lg md:text-2xl font-black transition-all border-3 ${
                          isOrig 
                            ? 'bg-slate-300 text-slate-700 border-slate-400 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600 cursor-not-allowed' 
                            : isSelected
                              ? 'bg-neo-blue text-white ring-4 ring-neo-blue/50 scale-105 z-10 border-neo-blue'
                              : val 
                                ? 'bg-neo-yellow text-[#2D3436] border-[#2D3436] shadow-inner' 
                                : 'bg-white dark:bg-zinc-900 text-transparent border-dashed border-[#2D3436]/20 hover:bg-slate-50'
                        }`}
                      >
                        {val || ''}
                      </motion.button>
                    </div>
                  );
                })}
              </div>
            </div>

              {/* Number Pad */}
              <div className="mt-4 flex flex-wrap justify-center gap-3 max-w-xl w-full px-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                  <motion.button
                    key={num}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSudokuNumberPadClick(num)}
                    disabled={selectedSudokuIdx === null}
                    className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center rounded-2xl border-[4px] border-[#2D3436] font-black text-lg md:text-2xl shadow-neo-sm transition-all ${
                      selectedSudokuIdx === null
                        ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600'
                        : 'bg-white hover:bg-slate-100 text-[#2D3436] dark:bg-zinc-700 dark:text-white cursor-pointer'
                    }`}
                  >
                    {num}
                  </motion.button>
                ))}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSudokuNumberPadClick(null)}
                  disabled={selectedSudokuIdx === null}
                  className={`px-6 h-12 sm:h-14 md:h-16 flex items-center justify-center rounded-2xl border-[4px] border-[#2D3436] font-black text-xs md:text-sm shadow-neo-sm transition-all ${
                    selectedSudokuIdx === null
                      ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed dark:bg-zinc-800 dark:text-zinc-600'
                      : 'bg-neo-pink text-white hover:opacity-95 cursor-pointer'
                  }`}
                >
                  {lang === 'pt' ? 'Limpar' : 'Clear'}
                </motion.button>
              </div>
            </div>
          </div>
        ) : problem.category === 'Magic Squares' ? (
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-50 dark:bg-zinc-900 rounded-[32px] p-6 border-[4px] border-[#2D3436] dark:border-white/20 relative overflow-hidden mb-6">
              <h3 className="text-xl md:text-2xl text-[#2D3436] dark:text-white font-black uppercase italic leading-none">
                🔮 {lang === 'pt' ? 'Quadrado Mágico Interativo' : 'Interactive Magic Square'}
              </h3>
              <p className="font-mono text-[10px] font-black text-[#2D3436]/60 dark:text-white/60 uppercase tracking-widest mt-2 leading-relaxed">
                {lang === 'pt' 
                  ? 'A soma de todas as linhas, colunas e diagonais deve ser exatamente 15, usando números únicos de 1 a 9! Clique nos blocos vazios para alternar os números.' 
                  : 'The sum of every row, column, and diagonal must equal 15, using distinct numbers from 1 to 9! Click empty cells to cycle numbers.'}
              </p>
            </div>

            <div className="flex flex-col items-center justify-center py-8 bg-slate-50 dark:bg-zinc-900 rounded-[48px] border-[4px] border-[#2D3436] dark:border-white/20 gap-8 w-full">
              <div className="w-full overflow-x-auto px-6 flex justify-center">
                <div className="relative p-10 md:p-12 bg-[#2D3436] dark:bg-zinc-800 rounded-[56px] shadow-neo-lg flex flex-col gap-6 min-w-[360px] max-w-xl md:max-w-2xl w-full items-center border-[10px] border-[#2D3436] dark:border-zinc-700">
                <div className="grid grid-cols-3 gap-5">
                  {magicGrid.map((val, idx) => {
                    const isOrig = magicOriginal[idx];
                    return (
                      <motion.button
                        key={idx}
                        whileTap={isOrig ? {} : { scale: 0.95 }}
                        onClick={() => handleMagicCellClick(idx)}
                        className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex items-center justify-center rounded-[28px] border-[5px] border-[#2D3436] text-4xl md:text-5xl font-black transition-all ${
                          isOrig 
                            ? 'bg-slate-300 text-slate-700 border-slate-400 dark:bg-zinc-700 dark:text-zinc-300 dark:border-zinc-600 cursor-not-allowed' 
                            : val 
                              ? 'bg-neo-blue text-white border-neo-blue-dark shadow-neo-sm' 
                              : 'bg-white dark:bg-zinc-900 text-transparent border-dashed border-[#2D3436]/20 hover:bg-slate-50'
                        }`}
                      >
                        {val || ''}
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-4 w-full grid grid-cols-2 gap-4 text-xs font-mono text-white/95 bg-black/30 p-4 rounded-2xl border border-white/10">
                  <div>
                    <span className="block font-bold underline mb-1 text-neo-yellow">Linhas / Rows:</span>
                    <span className="block">L1: {magicGrid[0]||0}+{magicGrid[1]||0}+{magicGrid[2]||0} = {(magicGrid[0]||0)+(magicGrid[1]||0)+(magicGrid[2]||0)}</span>
                    <span className="block">L2: {magicGrid[3]||0}+{magicGrid[4]||0}+{magicGrid[5]||0} = {(magicGrid[3]||0)+(magicGrid[4]||0)+(magicGrid[5]||0)}</span>
                    <span className="block">L3: {magicGrid[6]||0}+{magicGrid[7]||0}+{magicGrid[8]||0} = {(magicGrid[6]||0)+(magicGrid[7]||0)+(magicGrid[8]||0)}</span>
                  </div>
                  <div>
                    <span className="block font-bold underline mb-1 text-neo-yellow">Colunas / Cols:</span>
                    <span className="block">C1: {magicGrid[0]||0}+{magicGrid[3]||0}+{magicGrid[6]||0} = {(magicGrid[0]||0)+(magicGrid[3]||0)+(magicGrid[6]||0)}</span>
                    <span className="block">C2: {magicGrid[1]||0}+{magicGrid[4]||0}+{magicGrid[7]||0} = {(magicGrid[1]||0)+(magicGrid[4]||0)+(magicGrid[7]||0)}</span>
                    <span className="block">C3: {magicGrid[2]||0}+{magicGrid[5]||0}+{magicGrid[8]||0} = {(magicGrid[2]||0)+(magicGrid[5]||0)+(magicGrid[8]||0)}</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        ) : problem.category === 'Game of 24' ? (
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-50 dark:bg-zinc-900 rounded-[32px] p-6 border-[4px] border-[#2D3436] dark:border-white/20 relative overflow-hidden mb-6">
              <h3 className="text-xl md:text-2xl text-[#2D3436] dark:text-white font-black uppercase italic leading-none">
                🎯 {lang === 'pt' ? 'Jogo dos 24 Interativo' : 'Interactive Game of 24'}
              </h3>
              <p className="font-mono text-[10px] font-black text-[#2D3436]/60 dark:text-white/60 uppercase tracking-widest mt-2 leading-relaxed">
                {lang === 'pt' 
                  ? 'Use exatamente uma vez os números 6, 4, 3 e 2 e combine-os com os operadores matemáticos para que a expressão resulte em exatamente 24!' 
                  : 'Use each of the numbers 6, 4, 3, and 2 exactly once, combining them with mathematical operators to construct an expression that equals exactly 24!'}
              </p>
            </div>

            <div className="flex flex-col items-center py-8 bg-slate-50 dark:bg-zinc-900 rounded-[48px] border-[4px] border-[#2D3436] dark:border-white/20 gap-8">
              <div className="w-full max-w-xl md:max-w-2xl p-8 bg-[#2D3436] rounded-[36px] text-right font-mono min-h-[110px] flex flex-col justify-between shadow-neo border-[5px] border-[#1E1E24]">
                <div className="text-white/50 text-[10px] uppercase tracking-wider font-bold">{lang === 'pt' ? 'Expressão' : 'Expression'}</div>
                <div className="text-3xl font-black text-neo-yellow truncate mt-1">
                  {game24Tokens.join(' ') || '...'}
                </div>
              </div>

              <div className="space-y-6 w-full max-w-xl md:max-w-2xl bg-white dark:bg-zinc-900/40 p-6 md:p-8 rounded-[40px] border-[4px] border-[#2D3436] shadow-neo-sm">
                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">{lang === 'pt' ? 'Números Disponíveis' : 'Available Numbers'}</span>
                  <div className="grid grid-cols-4 gap-4">
                    {game24Numbers.map((num, idx) => {
                      const isUsed = game24UsedIndices.includes(idx);
                      return (
                        <motion.button
                          key={idx}
                          whileTap={isUsed ? {} : { scale: 0.95 }}
                          onClick={() => handleGame24NumberClick(num, idx)}
                          disabled={isUsed}
                          className={`py-5 rounded-[22px] border-[4px] border-[#2D3436] text-3xl font-black shadow-neo-sm transition-all ${
                            isUsed 
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none dark:bg-zinc-800 border-slate-400' 
                              : 'bg-white text-[#2D3436] hover:bg-slate-100 dark:bg-zinc-700 dark:text-white dark:hover:bg-zinc-600 hover:-translate-y-0.5'
                          }`}
                        >
                          {num}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className="block text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">{lang === 'pt' ? 'Operadores' : 'Operators'}</span>
                  <div className="grid grid-cols-6 gap-3">
                    {['+', '-', '*', '/', '(', ')'].map(op => (
                      <motion.button
                        key={op}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGame24OpClick(op)}
                        className="py-4 rounded-[18px] border-[3px] border-[#2D3436] bg-slate-100 text-[#2D3436] dark:bg-zinc-800 dark:text-white font-mono font-black text-2xl hover:bg-slate-200 dark:hover:bg-zinc-700 shadow-neo-sm hover:-translate-y-0.5"
                      >
                        {op}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-2">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGame24Undo}
                    className="py-4 rounded-[18px] border-[3px] border-[#2D3436] bg-neo-pink text-white font-mono font-black text-sm uppercase tracking-wider hover:opacity-95 shadow-neo hover:-translate-y-0.5 transition-transform"
                  >
                    {lang === 'pt' ? 'Desfazer' : 'Undo'}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGame24Clear}
                    className="py-4 rounded-[18px] border-[3px] border-[#2D3436] bg-slate-400 text-white font-mono font-black text-sm uppercase tracking-wider hover:opacity-95 shadow-neo hover:-translate-y-0.5 transition-transform"
                  >
                    {lang === 'pt' ? 'Limpar' : 'Clear'}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleGame24Verify}
                    className="py-4 rounded-[18px] border-[3px] border-[#2D3436] bg-neo-green text-[#2D3436] font-mono font-black text-sm uppercase tracking-wider hover:opacity-95 shadow-neo hover:-translate-y-0.5 transition-transform"
                  >
                    {lang === 'pt' ? 'Verificar' : 'Verify'}
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        ) : problem.category === 'Ouri' ? (
          <div className="flex-1 flex flex-col">
            <div className="bg-slate-50 dark:bg-zinc-900 rounded-[32px] p-6 border-[4px] border-[#2D3436] dark:border-white/20 relative overflow-hidden mb-6">
              <h3 className="text-xl md:text-2xl text-[#2D3436] dark:text-white font-black uppercase italic leading-none">
                🌾 {lang === 'pt' ? 'Jogo de Ouri (Mancala)' : 'Interactive Ouri (Mancala)'}
              </h3>
              <p className="font-mono text-[10px] font-black text-[#2D3436]/60 dark:text-white/60 uppercase tracking-widest mt-2 leading-relaxed">
                {lang === 'pt' 
                  ? 'Semear e capturar sementes! Clique em uma de suas casas (fileira inferior) com sementes para distribuí-las no sentido anti-horário.' 
                  : 'Sow and capture seeds! Click on one of your pits (bottom row) with seeds to distribute them counter-clockwise around the board.'}
              </p>
            </div>

            <div className="flex flex-col items-center py-8 bg-slate-50 dark:bg-zinc-900 rounded-[36px] border-[4px] border-[#2D3436] dark:border-white/20 gap-6 w-full">
              <div className="flex items-center gap-4 font-mono text-sm uppercase font-black text-[#2D3436] dark:text-white">
                <span>{lang === 'pt' ? 'Turno:' : 'Turn:'}</span>
                <span className={`px-4 py-1.5 rounded-xl text-xs font-bold shadow-neo-sm ${ouriTurn === 'player' ? 'bg-neo-blue text-white border border-[#2D3436] dark:border-white/20' : 'bg-neo-pink text-white border border-[#2D3436] dark:border-white/20'}`}>
                  {ouriTurn === 'player' ? (lang === 'pt' ? 'Você' : 'You') : (lang === 'pt' ? 'Pensando...' : 'Thinking...')}
                </span>
              </div>

              {/* Big Wood-Themed Mancala Board with horizontal scroll */}
              <div className="w-full overflow-x-auto px-6">
                <div className="min-w-[800px] lg:min-w-0 w-full bg-amber-100 dark:bg-amber-950 p-6 md:p-10 rounded-[48px] border-[8px] md:border-[10px] border-amber-950 dark:border-amber-900 flex items-center justify-between gap-6 md:gap-8 shadow-neo-lg relative">
                {/* AI Store (Pit 13) */}
                <div className="w-24 h-60 sm:h-80 bg-amber-200 dark:bg-amber-900/60 rounded-[36px] border-[4px] border-amber-950 flex flex-col items-center justify-between p-5 shadow-inner">
                  <span className="text-[11px] font-mono font-black uppercase text-amber-900 dark:text-amber-200">AI</span>
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-4xl font-black text-amber-950 dark:text-white">{ouriPits[13] || 0}</div>
                    {/* Visual seeds in store */}
                    {(() => {
                      const count = ouriPits[13] || 0;
                      if (count === 0) return null;
                      const dotsToShow = Math.min(count, 12);
                      const extra = count > 12 ? count - 12 : 0;
                      return (
                        <div className="flex flex-wrap items-center justify-center gap-1 max-w-[50px] mt-2">
                          {Array.from({ length: dotsToShow }).map((_, i) => (
                            <span key={i} className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 border border-emerald-850 shadow-sm" />
                          ))}
                          {extra > 0 && <span className="text-[9px] font-black text-emerald-800 dark:text-emerald-300">+{extra}</span>}
                        </div>
                      );
                    })()}
                  </div>
                  <span className="text-[9px] font-mono text-amber-900/60 dark:text-amber-300/60 uppercase font-bold">{lang === 'pt' ? 'Pontos' : 'Points'}</span>
                </div>

                {/* 12 Pits Container */}
                <div className="flex-1 flex flex-col gap-10">
                  {/* AI Pits (top row, from 12 down to 7) */}
                  <div className="grid grid-cols-6 gap-3">
                    {[12, 11, 10, 9, 8, 7].map(idx => (
                      <div
                        key={idx}
                        className="h-28 sm:h-36 rounded-[32px] bg-amber-200/80 dark:bg-amber-900/40 border-[4px] border-amber-950 flex flex-col items-center justify-center relative p-3 shadow-inner"
                      >
                        <div className="text-3xl font-black text-amber-950 dark:text-white leading-none">{ouriPits[idx]}</div>
                        {/* Visual seeds inside AI pit */}
                        {(() => {
                          const count = ouriPits[idx] || 0;
                          if (count === 0) return null;
                          const dotsToShow = Math.min(count, 6);
                          const extra = count > 6 ? count - 6 : 0;
                          return (
                            <div className="flex flex-wrap items-center justify-center gap-0.5 max-w-[42px] mt-2">
                              {Array.from({ length: dotsToShow }).map((_, i) => (
                                <span key={i} className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-sm border border-emerald-800" />
                              ))}
                              {extra > 0 && <span className="text-[8px] font-black text-emerald-800 dark:text-emerald-300">+{extra}</span>}
                            </div>
                          );
                        })()}
                        <div className="text-[8px] opacity-40 font-mono text-amber-950 dark:text-white/60 absolute bottom-1">#{idx}</div>
                      </div>
                    ))}
                  </div>

                  {/* Player Pits (bottom row, from 0 to 5) */}
                  <div className="grid grid-cols-6 gap-3">
                    {[0, 1, 2, 3, 4, 5].map(idx => {
                      const hasSeeds = ouriPits[idx] > 0;
                      return (
                        <motion.button
                          key={idx}
                          whileHover={hasSeeds && ouriTurn === 'player' ? { scale: 1.05 } : {}}
                          whileTap={hasSeeds && ouriTurn === 'player' ? { scale: 0.95 } : {}}
                          onClick={() => handleOuriPitClick(idx)}
                          disabled={ouriTurn !== 'player' || !hasSeeds}
                          className={`h-28 sm:h-36 rounded-[32px] border-[4px] border-amber-950 flex flex-col items-center justify-center relative p-3 shadow-inner transition-all ${
                            hasSeeds && ouriTurn === 'player'
                              ? 'bg-amber-300 dark:bg-amber-800 hover:bg-amber-400 dark:hover:bg-amber-700 cursor-pointer text-amber-950 dark:text-white ring-4 ring-neo-blue/40'
                              : 'bg-amber-200/80 dark:bg-amber-900/40 opacity-80 cursor-not-allowed text-amber-950/70 dark:text-white/50'
                          }`}
                        >
                          <div className="text-3xl font-black leading-none">{ouriPits[idx]}</div>
                          {/* Visual seeds inside player pit */}
                          {(() => {
                            const count = ouriPits[idx] || 0;
                            if (count === 0) return null;
                            const dotsToShow = Math.min(count, 6);
                            const extra = count > 6 ? count - 6 : 0;
                            return (
                              <div className="flex flex-wrap items-center justify-center gap-0.5 max-w-[42px] mt-2">
                                {Array.from({ length: dotsToShow }).map((_, i) => (
                                  <span key={i} className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 shadow-sm border border-emerald-800" />
                                ))}
                                {extra > 0 && <span className="text-[8px] font-black text-emerald-800 dark:text-emerald-300">+{extra}</span>}
                              </div>
                            );
                          })()}
                          <div className="text-[8px] opacity-40 font-mono absolute bottom-1">#{idx}</div>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Player Store (Pit 6) */}
                <div className="w-24 h-60 sm:h-80 bg-amber-200 dark:bg-amber-900/60 rounded-[36px] border-[4px] border-amber-950 flex flex-col items-center justify-between p-5 shadow-inner">
                  <span className="text-[11px] font-mono font-black uppercase text-amber-900 dark:text-amber-200">{lang==='pt'?'Você':'You'}</span>
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-4xl font-black text-amber-950 dark:text-white">{ouriPits[6] || 0}</div>
                    {/* Visual seeds in player store */}
                    {(() => {
                      const count = ouriPits[6] || 0;
                      if (count === 0) return null;
                      const dotsToShow = Math.min(count, 12);
                      const extra = count > 12 ? count - 12 : 0;
                      return (
                        <div className="flex flex-wrap items-center justify-center gap-1 max-w-[50px] mt-2">
                          {Array.from({ length: dotsToShow }).map((_, i) => (
                            <span key={i} className="w-2.5 h-2.5 rounded-full bg-emerald-600 dark:bg-emerald-400 border border-emerald-850 shadow-sm" />
                          ))}
                          {extra > 0 && <span className="text-[9px] font-black text-emerald-800 dark:text-emerald-300">+{extra}</span>}
                        </div>
                      );
                    })()}
                  </div>
                  <span className="text-[9px] font-mono text-amber-900/60 dark:text-amber-300/60 uppercase font-bold">{lang === 'pt' ? 'Pontos' : 'Points'}</span>
                </div>
              </div>
            </div>
            </div>
          </div>
        ) : problem.category === 'Senet' ? (
          <div className="flex-1 flex flex-col gap-6">
            <div className="bg-slate-50 dark:bg-zinc-900 rounded-[32px] p-6 border-[4px] border-[#2D3436] dark:border-white/20 relative overflow-hidden">
              <h3 className="text-xl md:text-2xl text-[#2D3436] dark:text-white font-black uppercase italic leading-none flex items-center gap-2">
                <span>🐪</span> {lang === 'pt' ? 'Jogo de Senet Interativo' : 'Interactive Senet Game'}
              </h3>
              <p className="font-mono text-[10px] font-black text-[#2D3436]/60 dark:text-white/60 uppercase tracking-widest mt-2 leading-relaxed">
                {lang === 'pt' 
                  ? 'Avançe as suas peças no tabuleiro em formato de S. Lance as varetas para rolar de 1 a 5, depois mova suas peças clicando nelas!' 
                  : 'Advance your pieces in an S-shaped path. Throw casting sticks to roll 1-5, and move by clicking your pieces!'}
              </p>
            </div>

            {/* Collapsible Rules Guide Accordion */}
            <div className="w-full">
              <button
                type="button"
                onClick={() => setSenetShowRules(!senetShowRules)}
                className="w-full py-3.5 px-6 bg-white dark:bg-zinc-800 border-[3px] border-[#2D3436] dark:border-white/20 rounded-[20px] font-mono font-black text-xs uppercase tracking-wider flex items-center justify-between shadow-neo-sm hover:bg-slate-50 dark:hover:bg-zinc-700 transition-all cursor-pointer"
              >
                <span className="flex items-center gap-2">📖 {lang === 'pt' ? 'Como Jogar Senet (Regras & Casas Especiais)' : 'How to Play Senet (Rules & Special Houses)'}</span>
                <motion.span
                  animate={{ rotate: senetShowRules ? 180 : 0 }}
                  className="inline-block font-sans text-[10px]"
                >
                  ▼
                </motion.span>
              </button>
              
              <AnimatePresence>
                {senetShowRules && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 p-6 sm:p-8 bg-amber-50 dark:bg-zinc-950 border-[3px] border-[#2D3436] dark:border-white/10 rounded-[28px] font-sans text-xs sm:text-sm text-[#2D3436] dark:text-slate-300 space-y-4 shadow-inner leading-relaxed">
                      <p className="font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider">
                        {lang === 'pt' ? '📜 História e Objetivo' : '📜 History and Objective'}
                      </p>
                      <p>
                        {lang === 'pt'
                          ? 'O Senet é o jogo de tabuleiro mais antigo conhecido na humanidade, jogado no Egito Antigo desde 3000 a.C. Seu objetivo é guiar as suas 5 peças (P) em um trilho no formato de S até retirá-las do tabuleiro pela casa 30, antes que a AI faça o mesmo com as dela.'
                          : 'Senet is the oldest known board game in human history, played in Ancient Egypt since 3000 BC. Your objective is to guide your 5 pieces (P) along an S-shaped track and bear them off the board through square 30 before the AI does.'}
                      </p>
                      
                      <p className="font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider">
                        {lang === 'pt' ? '🎮 Regras Básicas' : '🎮 Basic Rules'}
                      </p>
                      <ul className="list-disc list-inside space-y-2 pl-2">
                        <li>
                          <strong>{lang === 'pt' ? 'Caminho em S:' : 'S-Track Path:'}</strong>{' '}
                          {lang === 'pt'
                            ? 'O tabuleiro serpentia: esquerda para direita na primeira fileira (1-10), direita para esquerda na segunda (11-20), e esquerda para direita na última (21-30).'
                            : 'The board snakes: left-to-right on the top row (1-10), right-to-left on the middle row (11-20), and left-to-right on the bottom row (21-30).'}
                        </li>
                        <li>
                          <strong>{lang === 'pt' ? 'Lançamento de Varetas:' : 'Sticks roll:'}</strong>{' '}
                          {lang === 'pt'
                            ? 'Dita o número de casas que você anda. Role de 1 a 5 baseado no número de lados brancos/claros para cima (se todos forem escuros, vale 5).'
                            : 'Dictates your move distance. Roll 1 to 5 based on the flat/light sides facing up (all dark sides counts as 5).'}
                        </li>
                        <li>
                          <strong>{lang === 'pt' ? 'Capturas e Defesas:' : 'Capturing and Shielding:'}</strong>{' '}
                          {lang === 'pt'
                            ? 'Cair em uma casa com uma única peça inimiga faz as peças trocarem de lugar (captura por troca). Se 2 ou mais peças inimigas estiverem adjacentes, elas estão protegidas e você não pode cair ali.'
                            : 'Landing on a single enemy piece swaps your positions. If 2 or more enemy pieces are adjacent, they block your landing (shielded).'}
                        </li>
                      </ul>

                      <p className="font-bold text-amber-900 dark:text-amber-400 uppercase tracking-wider">
                        {lang === 'pt' ? '🏺 Significado das Casas Especiais' : '🏺 Meaning of Special Houses'}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                        <div className="p-3.5 bg-white dark:bg-zinc-900 border-[2px] border-[#2D3436] dark:border-white/15 rounded-xl">
                          <span className="font-black text-rose-500">❤️ {lang === 'pt' ? 'Casa 15 (Casa do Renascimento):' : 'Square 15 (House of Rebirth):'}</span>{' '}
                          {lang === 'pt' ? 'Sua peça volta para cá se você afogar na água da casa 27. Se a casa 15 estiver ocupada, volta para a casa 1.' : 'Your piece respawns here if you drown in square 27. If square 15 is blocked, it returns to square 1.'}
                        </div>
                        <div className="p-3.5 bg-white dark:bg-zinc-900 border-[2px] border-[#2D3436] dark:border-white/15 rounded-xl">
                          <span className="font-black text-amber-500">✨ {lang === 'pt' ? 'Casa 26 (Casa da Beleza):' : 'Square 26 (House of Beauty):'}</span>{' '}
                          {lang === 'pt' ? 'Parada obrigatória auspiciosa. Todas as peças precisam parar aqui antes de tentar cruzar as últimas casas.' : 'Auspicious stop. All pieces must stop here before attempting to cross the final hazard row.'}
                        </div>
                        <div className="p-3.5 bg-white dark:bg-zinc-900 border-[2px] border-[#2D3436] dark:border-white/15 rounded-xl">
                          <span className="font-black text-blue-500">🌊 {lang === 'pt' ? 'Casa 27 (Casa da Água):' : 'Square 27 (House of Water):'}</span>{' '}
                          {lang === 'pt' ? 'O abismo perigoso. Cair aqui afoga sua peça e a manda de volta à Casa 15.' : 'A deadly hazard. Landing here drowns your piece and returns it to Square 15.'}
                        </div>
                        <div className="p-3.5 bg-white dark:bg-zinc-900 border-[2px] border-[#2D3436] dark:border-white/15 rounded-xl">
                          <span className="font-black text-purple-500">Ⅲ, Ⅱ, 👁️ {lang === 'pt' ? 'Casas 28, 29 e 30:' : 'Squares 28, 29, and 30:'}</span>{' '}
                          {lang === 'pt' ? 'Exigem rolagem exata (3, 2 e 1) para retirar a peça do tabuleiro com segurança.' : 'Requires exact rolls (3, 2, or 1) to bear your piece safely off the board.'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col items-center py-8 bg-slate-50 dark:bg-zinc-900 rounded-[36px] border-[4px] border-[#2D3436] dark:border-white/20 gap-6">
              {/* Turn & Sticks controls */}
              <div className="flex flex-wrap items-center justify-between w-full px-6 gap-6">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase font-black text-slate-500">{lang === 'pt' ? 'Turno:' : 'Turn:'}</span>
                  <span className={`px-4 py-1.5 rounded-xl text-xs font-black border-2 border-[#2D3436] ${senetTurn === 'player' ? 'bg-neo-blue text-white' : 'bg-neo-pink text-white'}`}>
                    {senetTurn === 'player' ? (lang === 'pt' ? 'Seu' : 'Yours') : (lang === 'pt' ? 'AI' : 'AI')}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex gap-1.5">
                    {senetSticks.map((stick, idx) => (
                      <div
                        key={idx}
                        className={`w-4 h-12 sm:w-5 sm:h-16 border-[3px] border-[#2D3436] rounded-xl transition-all shadow-neo-sm ${
                          stick === 1 ? 'bg-amber-100 shadow-inner' : 'bg-[#2D3436]'
                        }`}
                        title={stick === 1 ? 'Flat (White)' : 'Round (Dark)'}
                      />
                    ))}
                  </div>
                  {senetRoll !== null && (
                    <span className="text-base font-mono font-black text-neo-pink uppercase bg-white dark:bg-zinc-800 border-[3px] border-[#2D3436] px-3.5 py-1.5 rounded-xl shadow-neo-sm">
                      +{senetRoll}
                    </span>
                  )}
                </div>

                {senetTurn === 'player' && senetRoll === null && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSenetRoll}
                    className="px-6 py-3 rounded-2xl bg-neo-yellow text-[#2D3436] border-[3px] border-[#2D3436] font-mono font-black text-xs md:text-sm uppercase tracking-wider shadow-neo-sm hover:shadow-neo hover:translate-y-[-2px] transition-all cursor-pointer"
                  >
                    🎲 {lang === 'pt' ? 'Lançar Varetas' : 'Throw Sticks'}
                  </motion.button>
                )}
              </div>

              {/* Robust Wooden Senet Board Container with horizontal scroll */}
              <div className="w-full overflow-x-auto px-6">
                <div className="min-w-[900px] lg:min-w-0 w-full bg-amber-50 dark:bg-amber-950 p-10 md:p-14 rounded-[56px] border-[12px] border-amber-950 dark:border-amber-900 flex flex-col gap-6 shadow-neo-lg">
                {[
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
                  [20, 19, 18, 17, 16, 15, 14, 13, 12, 11],
                  [21, 22, 23, 24, 25, 26, 27, 28, 29, 30]
                ].map((row, rIdx) => (
                  <div key={rIdx} className="grid grid-cols-10 gap-4 md:gap-5">
                    {row.map(sqNum => {
                      const hasP1 = senetP1.includes(sqNum);
                      const hasP2 = senetP2.includes(sqNum);
                      const p1Idx = senetP1.indexOf(sqNum);
                      const isSpecial = [15, 26, 27, 28, 29, 30].includes(sqNum);

                      // Calculate if this pawn can move
                      const target = sqNum + (senetRoll || 0);
                      const isValidTarget = target <= 30 && senetP2.filter(p => p === target).length < 2;
                      const canMoveThisPawn = hasP1 && senetTurn === 'player' && senetRoll !== null && isValidTarget;

                      // Highlight predicted target on hover
                      const isTargetOfHovered = senetHoveredPawn !== null && senetRoll !== null && (sqNum === senetHoveredPawn + senetRoll);

                      return (
                        <motion.button
                          key={sqNum}
                          onClick={() => {
                            if (canMoveThisPawn) handleSenetPawnClick(p1Idx);
                          }}
                          onMouseEnter={() => {
                            if (canMoveThisPawn) {
                              setSenetHoveredPawn(sqNum);
                            }
                          }}
                          onMouseLeave={() => {
                            setSenetHoveredPawn(null);
                          }}
                          disabled={!canMoveThisPawn}
                          className={`aspect-square rounded-[24px] border-[4.5px] border-[#2D3436] dark:border-white/20 flex flex-col items-center justify-center relative p-3 transition-all ${
                            isSpecial 
                              ? 'bg-amber-200 dark:bg-amber-900/60 border-dashed border-amber-950 shadow-inner' 
                              : 'bg-amber-100 dark:bg-amber-950/40 text-[#2D3436] dark:text-white'
                          } ${isTargetOfHovered ? 'ring-[5px] ring-dashed ring-neo-blue ring-offset-2 bg-neo-blue/20 dark:bg-neo-blue/40 animate-pulse z-10' : ''} ${
                            canMoveThisPawn ? 'ring-[5px] ring-neo-blue cursor-pointer scale-[1.07] z-10 hover:bg-amber-300 dark:hover:bg-amber-800' : ''
                          }`}
                        >
                          <span className="text-[12px] md:text-sm font-mono font-black absolute top-1.5 left-2.5 text-slate-500/80">{sqNum}</span>
                          
                          {sqNum === 15 && <span className="text-xl md:text-2xl font-bold absolute bottom-1.5 right-2.5" title="House of Rebirth">❤️</span>}
                          {sqNum === 26 && <span className="text-xl md:text-2xl font-bold absolute bottom-1.5 right-2.5" title="House of Beauty">✨</span>}
                          {sqNum === 27 && <span className="text-xl md:text-2xl font-bold absolute bottom-1.5 right-2.5" title="House of Water">🌊</span>}
                          {sqNum === 28 && <span className="text-sm md:text-base font-mono font-black absolute bottom-1.5 right-2.5" title="House of Three Truths">Ⅲ</span>}
                          {sqNum === 29 && <span className="text-sm md:text-base font-mono font-black absolute bottom-1.5 right-2.5" title="House of Two Judges">Ⅱ</span>}
                          {sqNum === 30 && <span className="text-xl md:text-2xl font-bold absolute bottom-1.5 right-2.5" title="House of Horus">👁️</span>}
 
                          {hasP1 && (
                            <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-full border-[4px] border-[#2D3436] bg-neo-blue shadow-neo-md flex items-center justify-center font-black text-white text-[12px] sm:text-lg">
                              P
                            </div>
                          )}
                          {hasP2 && (
                            <div className="w-9 h-9 sm:w-14 sm:h-14 rounded-full border-[4px] border-[#2D3436] bg-neo-pink shadow-neo-md flex items-center justify-center font-black text-white text-[12px] sm:text-lg">
                              AI
                            </div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

              {/* Game Log Banner */}
              <div className="w-full max-w-5xl md:max-w-6xl px-6 mt-2">
                <div className="bg-[#2D3436] dark:bg-zinc-800 text-white rounded-[24px] border-[4px] border-[#2D3436] p-4 flex flex-col gap-2 shadow-neo-sm h-36 overflow-y-auto font-mono text-xs">
                  <div className="text-[10px] font-black uppercase text-neo-yellow border-b border-white/10 pb-1.5 tracking-wider flex justify-between items-center">
                    <span>📜 {lang === 'pt' ? 'Histórico de Jogadas' : 'Gameplay Log'}</span>
                    <span className="text-[8px] text-white/50">{lang === 'pt' ? 'Recentes primeiro' : 'Latest first'}</span>
                  </div>
                  {senetLog.length === 0 ? (
                    <div className="text-white/40 italic flex items-center justify-center h-full">
                      {lang === 'pt' ? 'Nenhuma jogada registrada ainda.' : 'No plays logged yet.'}
                    </div>
                  ) : (
                    <div className="space-y-1.5 pr-2">
                      {senetLog.map((log, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className={`flex items-start gap-2 ${idx === 0 ? 'text-neo-yellow font-bold text-xs' : 'text-white/70'}`}
                        >
                          <span className="text-[10px] opacity-40">[{senetLog.length - idx}]</span>
                          <span>{log}</span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-10 relative shrink-0">
              <div className="bg-slate-50 rounded-[32px] p-6 md:p-10 border-[4px] border-[#2D3436] relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] rotate-12 group-hover:rotate-0 transition-transform duration-700">
                   <Brain size={160} />
                </div>
                <div className="flex flex-col gap-6 relative z-10">
                  <h2 className="text-3xl md:text-5xl lg:text-6xl text-[#2D3436] leading-[0.95] tracking-tighter font-black uppercase italic">
                    {translateText(problem.question, lang === 'pt' ? 'pt' : 'en')}
                  </h2>
                </div>
              </div>
              
              <div className="mt-4 flex flex-wrap items-center gap-3">
                {problem.hint && (
                  <button
                    type="button"
                    onClick={() => setShowHint(!showHint)}
                    className="px-5 py-2.5 bg-neo-yellow/20 hover:bg-neo-yellow text-[#2D3436] border-[3px] border-[#2D3436] rounded-xl font-black text-[10px] uppercase tracking-wider shadow-neo-sm hover:shadow-neo transition-all cursor-pointer"
                  >
                    💡 {showHint ? t.hintHide : t.hintShow}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="px-5 py-2.5 bg-neo-pink/20 hover:bg-neo-pink text-white hover:text-white bg-neo-pink border-[3px] border-[#2D3436] rounded-xl font-black text-[10px] uppercase tracking-wider shadow-neo-sm hover:shadow-neo transition-all cursor-pointer"
                >
                  🎓 {showExplanation ? t.explanationHide : t.explanationShow}
                </button>
              </div>

              {problem.hint && (
                <AnimatePresence>
                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.2 }}
                      className="w-full bg-amber-50 border-[3px] border-dashed border-[#2D3436]/40 rounded-2xl p-5 overflow-hidden mt-3"
                    >
                      <p className="font-mono text-xs md:text-sm font-black text-[#2D3436]/70 leading-relaxed uppercase">
                        🔧 {translateText(problem.hint, lang === 'pt' ? 'pt' : 'en')}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}

              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full bg-neo-pink/5 border-[3px] border-neo-pink rounded-2xl p-5 overflow-hidden text-left mt-3"
                  >
                    <div className="flex flex-wrap items-center gap-2 mb-2 text-[#2D3436] font-black text-xs md:text-sm uppercase tracking-wide">
                      <span>🎓</span>
                      <span className="text-zinc-500">{t.mathConcept}</span>
                      <span className="text-neo-pink bg-neo-pink/10 px-2 py-0.5 rounded-lg border border-neo-pink/30 font-mono text-[10px] md:text-xs font-black">
                        {mathExplanation.concept}
                      </span>
                    </div>
                    <p className="font-sans text-xs md:text-sm font-medium text-[#2D3436] leading-relaxed">
                      {mathExplanation.body}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {problem.visualData && (
              <div className="mb-10 flex-1">
                <MathVisualAid data={problem.visualData} />
              </div>
            )}

            <div className="mt-auto pt-6 shrink-0">
              {problem.inputType === 'choice' && problem.options && problem.options.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {problem.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      type="button"
                      whileHover={{ y: -6, scale: 1.02 }}
                      whileTap={{ y: 0, scale: 0.98 }}
                      onClick={() => {
                        setUserInput(opt.toString());
                        let isCorrect = false;
                        if (typeof problem.answer === 'number') {
                          isCorrect = parseFloat(opt.toString()) === problem.answer;
                        } else {
                          isCorrect = opt.toString().trim().toLowerCase() === problem.answer.toString().toLowerCase();
                        }

                        if (isCorrect) {
                          setFeedback('correct');
                          setShowExplanation(true);
                          setTimeout(() => {
                            onSolve(true);
                            setUserInput('');
                            setFeedback(null);
                          }, 2000);
                        } else {
                          setFeedback('incorrect');
                          setTimeout(() => {
                            onSolve(false);
                            setFeedback(null);
                          }, 1000);
                        }
                      }}
                      disabled={feedback === 'correct'}
                      className={`neo-btn min-h-[100px] p-6 text-xl md:text-3xl font-black shadow-neo-sm flex items-center justify-start gap-6 active:shadow-none transition-all text-left group overflow-hidden border-[6px] ${
                        feedback === 'incorrect' && userInput === opt.toString() ? 'bg-neo-pink text-white shake border-[#2D3436]' : 
                        feedback === 'correct' && (typeof problem.answer === 'number' ? parseFloat(opt.toString()) === problem.answer : opt.toString().toLowerCase() === problem.answer.toString().toLowerCase()) ? 'bg-neo-green text-white border-[#2D3436]' : 'bg-white hover:bg-slate-50 border-[#2D3436]'
                      }`}
                    >
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black transition-colors border-[4px] border-[#2D3436] ${
                        feedback === 'incorrect' && userInput === opt.toString() || feedback === 'correct' && (typeof problem.answer === 'number' ? parseFloat(opt.toString()) === problem.answer : opt.toString().toLowerCase() === problem.answer.toString().toLowerCase())
                        ? 'bg-black/20' : 'bg-white shadow-neo-sm'
                      }`}>
                        {choiceLabels[i]}
                      </div>
                      <span className="flex-1 tracking-tighter uppercase italic">{translateText(opt.toString(), lang === 'pt' ? 'pt' : 'en')}</span>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative group">
                  <div className="flex flex-col md:flex-row gap-6 relative z-10">
                    <input
                      autoFocus
                      type={typeof problem.answer === 'number' ? "number" : "text"}
                      step="any"
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      disabled={feedback === 'correct'}
                      placeholder={t.placeholder}
                      className={`flex-1 bg-slate-50 border-[6px] border-[#2D3436] rounded-[40px] px-10 py-10 text-5xl md:text-7xl font-black focus:outline-none transition-all shadow-neo-sm tracking-tighter italic uppercase ${
                        feedback === 'correct' ? 'text-neo-green border-neo-green' : 
                        feedback === 'incorrect' ? 'text-neo-pink shake border-neo-pink' :
                        'focus:bg-white focus:shadow-neo'
                      }`}
                    />
                    <button
                      type="submit"
                      disabled={!userInput || feedback === 'correct'}
                      className="bg-neo-purple text-white px-14 py-8 rounded-[40px] border-[6px] border-[#2D3436] flex items-center justify-center gap-4 h-auto text-4xl font-black italic uppercase tracking-tighter shadow-neo transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <span>{t.submit}</span>
                      <CheckCircle2 size={40} strokeWidth={4} className="fill-current" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1.2, y: -80 }}
            exit={{ opacity: 0, scale: 0.5, y: -120 }}
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-6 px-24 py-16 rounded-[64px] border-[10px] border-[#2D3436] shadow-neo z-[150] ${
              feedback === 'correct' ? 'bg-neo-green' : 'bg-neo-pink'
            }`}
          >
            {feedback === 'correct' ? (
              <>
                <CheckCircle2 size={80} className="text-white" />
                <span className="text-6xl font-black uppercase tracking-tighter text-white block">{t.correct}</span>
              </>
            ) : (
              <>
                <XCircle size={80} className="text-white" />
                <span className="text-5xl font-black uppercase tracking-tighter text-white">{t.incorrect}</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-3 flex shrink-0">
         <div className="flex-1 bg-neo-purple" />
         <div className="flex-1 bg-neo-pink" />
         <div className="flex-1 bg-neo-yellow" />
         <div className="flex-1 bg-neo-green" />
      </div>

      <style>{`
        .shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%, 90% { transform: translate3d(-2px, 0, 0); }
          20%, 80% { transform: translate3d(4px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-6px, 0, 0); }
          40%, 60% { transform: translate3d(6px, 0, 0); }
        }
      `}</style>
    </motion.div>
  );
};
