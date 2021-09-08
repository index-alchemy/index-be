const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const seasons = [
  'Winter',
  'Spring',
  'Summer',
  'Fall'
];

const oneYearAgo = new Date();
oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

const generateCohorts = () => {
  const year = Number(new Date().getFullYear());

  const cohortCodes = [year - 1, year, year + 1].reduce((acc, val) => {
    const arr = [];
    for (let i = 1; i <= 12; i++) {
      const month = i < 10 ? `0${i}` : i;
      arr.push(`${val}-${month}`);
    }
    return [...acc, ...arr];
  }, []).reverse();

  return cohortCodes;
};

const parseCohort = cohortCode => {
  let [year, month] = cohortCode.split('-');

  year = (year.length === 2) ? 2000 + Number(year) : Number(year);

  month = year > 2019
    ? months[Number(month) - 1]
    : seasons[~~(Number(month) / 3)]
  ;

  return `${month} ${year}`;
};

export default parseCohort;
export { generateCohorts };
