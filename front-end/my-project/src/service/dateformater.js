 function formatDate(isoString) {
  if (!isoString) return "";
  const dateObj = new Date(isoString);
  return dateObj.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
}
export default formatDate