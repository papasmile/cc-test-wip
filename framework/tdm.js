
const foreignKeyMap = {
  campgroundId: 'Campgrounds',
  campsiteId: 'Campsites',
  customerId: 'Customers'
}

export const createData = (connection, testData, rowIds, tableNameIndex, rowIndex, complete) => {
  if (rowIds[getTableName(testData, tableNameIndex)]) {
    performInsert(connection, testData, rowIds, tableNameIndex, rowIndex, complete);
  } else {
    performDelete(connection, testData, rowIds, tableNameIndex, rowIndex, complete);
  }
};

const getTableName = (testData, tableNameIndex) => {
  const tableNames = Object.keys(testData);
  return tableNames[tableNameIndex];
};

const performInsert = (connection, testData, rowIds, tableNameIndex, rowIndex, complete) => {
  const tableName = getTableName(testData, tableNameIndex);
  const rawItem = testData[tableName][rowIndex];
  const item = swapIds(rawItem, rowIds);
  connection.query(`INSERT INTO ${tableName} SET ?`, item, (error, results, fields) => {
    if (error) {
      console.log(error);
      return complete();
    }
    rowIds[tableName].push(results.insertId);
    if (rowIndex === testData[tableName].length -1) {
      if (tableNameIndex === Object.keys(testData).length - 1) {
        complete();
      } else {
        createData(connection, testData, rowIds, tableNameIndex + 1, 0, complete);
      }
    } else {
      createData(connection, testData, rowIds, tableNameIndex, rowIndex + 1, complete);
    }
  });
};

const swapIds = (rawItem, rowIds) => {
  const item = { ...rawItem };
  Object.keys(foreignKeyMap).forEach(key => {
    if (item.hasOwnProperty(key)) item[key] = rowIds[foreignKeyMap[key]][item[key]];
  });
  return item;
};

const performDelete = (connection, testData, rowIds, tableNameIndex, rowIndex, complete) => {
  const tableName = getTableName(testData, tableNameIndex);
  connection.query(`DELETE FROM ${tableName}`, (error, results, fields) => {
    if (error) {
      console.log(error);
      return complete();
    }
    rowIds[tableName] = [];
    createData(connection, testData, rowIds, tableNameIndex, rowIndex, complete);
  });
};
