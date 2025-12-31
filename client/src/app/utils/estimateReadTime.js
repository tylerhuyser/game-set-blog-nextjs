export function estimateReadTime(html, wpm = 200) {
  if (!html) return null;

  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const wordCount = text.split(' ').length;
  const minutes = Math.ceil(wordCount / wpm);

  return formatReadTime(minutes);
}

function formatReadTime(minutes) {
  if (minutes <= 2) return "2 MIN READ";
  if (minutes <= 5) return "5 MIN READ";
  if (minutes <= 8) return "8 MIN READ";
  if (minutes <= 10) return "10 MIN READ";
  if (minutes <= 15) return "15 MIN READ";
  return "15+ MIN READ";
}