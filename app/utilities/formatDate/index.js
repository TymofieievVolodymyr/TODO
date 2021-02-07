export default function formatDate(date) {
  let d = new Date(date);
  let month = '' + (d.getMonth() + 1);
  let day = '' + d.getDate();
  let year = d.getFullYear();

  if (month.length < 2){
    month = '0' + month;
  }
  if (day.length < 2){
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

export function nextDayDate(todayDate){
  const  date = todayDate;
  return date.setDate(date.getDate() + 1);
}


