const formatToDayMonthYear = (isoStr: string): string => {
  const date = new Date(isoStr);
  const day = String(date.getUTCDate()).padStart(2, "0"); // 1~31 → 2자리
  const monthAbbr = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = monthAbbr[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  return `${month} ${day}. ${year}`;
};

export default formatToDayMonthYear;