import React from 'react';
import { PermaScores } from '../types/perma';

interface PermaRadarChartProps {
  scores: PermaScores;
}

export const PermaRadarChart: React.FC<PermaRadarChartProps> = ({ scores }) => {
  const cx = 180;
  const cy = 165;
  const maxRadius = 102;
  const levels = [2, 4, 6, 8, 10];

  const axes = [
    { key: 'pos', short: 'P', label: 'Emoções Positivas', value: scores.pos, color: '#fbbf24' },
    { key: 'eng', short: 'E', label: 'Engajamento', value: scores.eng, color: '#22d3ee' },
    { key: 'rel', short: 'R', label: 'Relacionamentos', value: scores.rel, color: '#fb7185' },
    { key: 'mea', short: 'M', label: 'Sentido', value: scores.mea, color: '#a78bfa' },
    { key: 'acc', short: 'A', label: 'Realização', value: scores.acc, color: '#34d399' }
  ];

  const getPoint = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const radius = (Math.max(0, Math.min(10, value)) / 10) * maxRadius;
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle)
    };
  };

  const dataPoints = axes.map((axis, idx) => getPoint(idx, axis.value));
  const dataPolygon = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  // Healthy adult baseline reference (6.5)
  const baselinePoints = axes.map((_, idx) => getPoint(idx, 6.5));
  const baselinePolygon = baselinePoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');

  return (
    <div className="flex flex-col items-center w-full">
      <svg
        viewBox="0 0 360 330"
        className="w-full max-w-[400px] h-auto select-none"
        role="img"
        aria-label="Gráfico radar dos cinco pilares PERMA"
      >
        <defs>
          <linearGradient id="permaRadarFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#ec4899" stopOpacity="0.28" />
          </linearGradient>
        </defs>

        {/* Concentric grid pentagons */}
        {levels.map((lvl) => {
          const pts = axes
            .map((_, idx) => {
              const p = getPoint(idx, lvl);
              return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
            })
            .join(' ');
          return (
            <polygon
              key={lvl}
              points={pts}
              fill="none"
              className="stroke-slate-300 dark:stroke-slate-400/20"
              strokeWidth={lvl === 10 ? 1.5 : 1}
            />
          );
        })}

        {/* Healthy baseline reference (6.5) */}
        <polygon
          points={baselinePolygon}
          fill="none"
          className="stroke-sky-600/60 dark:stroke-sky-400/40"
          strokeWidth={1.3}
          strokeDasharray="4 3"
        />

        {/* Axis lines */}
        {axes.map((_, idx) => {
          const outer = getPoint(idx, 10);
          return (
            <line
              key={idx}
              x1={cx}
              y1={cy}
              x2={outer.x}
              y2={outer.y}
              className="stroke-slate-300 dark:stroke-slate-400/20"
              strokeWidth={1}
            />
          );
        })}

        {/* Scale numbers along top axis */}
        {[2, 4, 6, 8, 10].map((lvl) => {
          const p = getPoint(0, lvl);
          return (
            <text
              key={lvl}
              x={p.x + 6}
              y={p.y + 3}
              className="fill-slate-500 dark:fill-slate-400/75"
              fontSize="9"
              fontWeight="600"
            >
              {lvl}
            </text>
          );
        })}

        {/* User PERMA polygon */}
        <polygon
          points={dataPolygon}
          fill="url(#permaRadarFill)"
          className="stroke-indigo-600 dark:stroke-indigo-400"
          strokeWidth={2.2}
          strokeLinejoin="round"
        />

        {/* Vertex dots and outer labels */}
        {axes.map((axis, idx) => {
          const point = dataPoints[idx];
          const labelPoint = getPoint(idx, 12.6);
          const angle = (Math.PI * 2 * idx) / axes.length - Math.PI / 2;
          const cos = Math.cos(angle);

          let textAnchor: 'start' | 'middle' | 'end' = 'middle';
          if (cos > 0.25) textAnchor = 'start';
          else if (cos < -0.25) textAnchor = 'end';

          // Adjust vertical position slightly for top/bottom vertices
          const sin = Math.sin(angle);
          const dyBase = sin < -0.5 ? -8 : sin > 0.5 ? 10 : 0;

          return (
            <g key={axis.key}>
              <circle
                cx={point.x}
                cy={point.y}
                r={4.5}
                fill={axis.color}
                className="stroke-white dark:stroke-slate-900"
                strokeWidth={2}
              />
              <text
                x={labelPoint.x}
                y={labelPoint.y + dyBase}
                textAnchor={textAnchor}
                className="fill-slate-900 dark:fill-slate-200"
                fontSize="11"
                fontWeight="700"
              >
                {axis.short} · {axis.value.toFixed(1)}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + dyBase + 13}
                textAnchor={textAnchor}
                className="fill-slate-500 dark:fill-slate-400"
                fontSize="9.5"
                fontWeight="500"
              >
                {axis.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Subtle legend */}
      <div className="mt-1 flex flex-wrap items-center justify-center gap-4 text-[11px] text-slate-600 dark:text-slate-400">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-0.5 bg-indigo-600 dark:bg-indigo-400 inline-block" />
          Seu Perfil PERMA
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-t border-dashed border-sky-600 dark:border-sky-400 inline-block" />
          Referência Saudável (6,5)
        </span>
      </div>
    </div>
  );
};
