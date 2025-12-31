export const breakpointColumns = {
  default: 4,
  1280: 3,
  1024: 2,
  640: 1,
};

export type CardVariant = 'tall' | 'standard' | 'compact';

export const getCardVariant = (index: number): CardVariant => {
  const patterns: CardVariant[] = ['tall', 'standard', 'compact', 'standard', 'tall', 'compact', 'standard'];
  return patterns[index % patterns.length];
};

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return {
    day: date.toLocaleDateString('en-US', { weekday: 'short' }),
    date: date.getDate(),
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    year: date.getFullYear(),
    time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    full: date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  };
};
