const monthMap = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const formatPublishTime = (timeStr) => {
  if (!timeStr) return "";
  const date = new Date(timeStr);
  const month = monthMap[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};
