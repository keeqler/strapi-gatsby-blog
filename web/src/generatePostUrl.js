const { format } = require('date-fns');

module.exports = (title, publishDateObj) => {
  const urlTitle = title.split(' ').slice(0, 12).join('-').toLowerCase();
  const urlDate = format(publishDateObj, 'dd-MM-yyyy');

  return `/${urlTitle}-${urlDate}`;
};
