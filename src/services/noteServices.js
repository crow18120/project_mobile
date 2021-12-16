export const getAllNote = (db, idApartment, setList) => {
  db.transaction((tx) => {
    tx.executeSql(
      `select * from note where apartment = ?;`,
      [idApartment],
      (_, { rows: { _array } }) => setList(_array)
    );
  });
};

export const getNote = (db, idNote, setItem) => {
  db.transaction((tx) => {
    tx.executeSql(
      `select * from note where id = ?;`,
      [idNote],
      (_, { rows: { _array } }) => setItem(_array[0])
    );
  });
};

export const addNote = (db, values, setList) => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into note (title, info, apartment) values (?, ?, ?)",
      [values.title, values.info, values.apartment],
      null,
      (_, error) => {
        console.log(error);
        return true;
      }
    );
    tx.executeSql(
      "select * from note where apartment = ?;",
      [values.apartment],
      (_, { rows: { _array } }) => setList(_array)
    );
  });
};

export const editNote = (db, idApartment, values, setList) => {
  db.transaction((tx) => {
    tx.executeSql(
      `update note set title = ?, info = ?, apartment = ? where id = ?;`,
      [values.title, values.info, values.apartment, idApartment]
    );
    tx.executeSql(
      `select * from note where apartment = ?;`,
      [values.apartment],
      (_, { rows: { _array } }) => setList(_array)
    );
  });
};

export const deleteNote = (db, idNote, idApartment, setList) => {
  db.transaction((tx) => {
    tx.executeSql(`delete from note where id = ?;`, [idNote]);
    tx.executeSql(
      "select * from note where apartment = ?;",
      [idApartment],
      (_, { rows: { _array } }) => setList(_array)
    );
  });
};
