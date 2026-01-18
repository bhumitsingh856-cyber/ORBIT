function timeAgo(date) {
  const diff = Date.now() - new Date(date);
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}hr ago`;
  const day = Math.floor(hr / 24);
  return `${day}day ago`;
}

export default timeAgo;