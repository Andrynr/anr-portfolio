export const formatTime = (t) => {
  if (!t) return "";
  const parsed = Date.parse(t);
  if (!isNaN(parsed)) return new Date(parsed).toLocaleString();
  return String(t);
};
