'use client';
import { useEffect, useRef, useState } from 'react';
import { Music2 } from 'lucide-react';
declare global { interface Window { portfolioMusic?: HTMLAudioElement; } }
export function BackgroundMusic() {
  const audio = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const repositoryBase = window.location.pathname.startsWith('/nong-yating-portfolio')
      ? '/nong-yating-portfolio'
      : '';
    const player = window.portfolioMusic ?? new Audio(`${repositoryBase}/assets/cloud-country.mp3`);
    window.portfolioMusic = player;
    player.loop = true;
    player.preload = 'metadata';
    player.muted = false;
    audio.current = player;
    const sync = () => setPlaying(!player.paused);
    const failed = () => { setPlaying(false); setError(true); };
    sync();
    player.addEventListener('play', sync);
    player.addEventListener('pause', sync);
    player.addEventListener('error', failed);
    return () => {
      player.removeEventListener('play', sync);
      player.removeEventListener('pause', sync);
      player.removeEventListener('error', failed);
    };
  }, []);
  const toggle = async () => {
    const player = audio.current;
    if (!player) return;
    if (!player.paused) { player.pause(); return; }
    player.volume = 0.5;
    player.muted = false;
    setError(false);
    try { await player.play(); } catch { setPlaying(false); setError(true); }
  };
  return <div className="site-music">
    <button type="button" className={`site-music-toggle${playing ? ' is-playing' : ''}`} onClick={toggle} aria-pressed={playing} aria-label={playing ? '暂停背景音乐 Cloud Country' : '播放背景音乐 Cloud Country'} title="Cloud Country · ConcernedApe">
      <span className="site-music-disc"><Music2 aria-hidden="true" /></span>
      <span className="site-music-label">Music {playing ? 'on' : 'off'}</span>
    </button>
    {error && <span className="site-music-error" role="status">暂时无法播放，请点击重试</span>}
  </div>;
}
