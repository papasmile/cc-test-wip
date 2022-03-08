
export const formatApiDate = dbDate => {
  // const parsedDate = new Date(dbDate).toISOString();
  // return parsedDate.substring(0, parsedDate.length - 5) + 'Z';
  return dbDate.replace(' ', 'T') + 'Z'
}
