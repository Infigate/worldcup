export function fmtLocal(iso: string, tz: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: tz,
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export const fmtJst = (iso: string): string => fmtLocal(iso, 'Asia/Tokyo');

export function fmtJstDate(iso: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date(iso));
}

export function fmtJstTime(iso: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function fmtLocalTime(iso: string, tz: string): string {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(iso));
}

export function fmtClock(ms: number): string {
  return new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    month: 'numeric',
    day: 'numeric',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(ms));
}

export function fmtCountdown(ms: number): string {
  if (ms <= 0) return 'まもなく';
  const min = Math.floor(ms / 60000);
  const days = Math.floor(min / 1440);
  const hours = Math.floor((min % 1440) / 60);
  const mins = min % 60;
  if (days > 0) return `あと${days}日${hours}時間`;
  if (hours > 0) return `あと${hours}時間${mins}分`;
  return `あと${mins}分`;
}
