export const getAllApartment = (db, setList) => {
  db.transaction((tx) => {
    tx.executeSql(`select * from apartment;`, [], (_, { rows: { _array } }) =>
      setList(_array)
    );
    tx.executeSql(`select * from apartment;`, [], (_, { rows }) =>
      console.log(JSON.stringify(rows))
    );
  });
};

export const getApartment = (db, id, setItem) => {
  db.transaction((tx) => {
    tx.executeSql(
      `select * from apartment where id = ?;`,
      [id],
      (_, { rows: { _array } }) => setItem(_array[0])
    );
  });
};

export const addApartment = (db, values, setList) => {
  console.log("add");
  db.transaction((tx) => {
    tx.executeSql(
      "insert into apartment (property, bedrooms, money, furniture, note, reporter, date) values (?, ?, ?, ?, ?, ?, ?)",
      [
        values.property,
        values.bedrooms,
        values.money,
        values.furniture,
        values.note,
        values.reporter,
        values.date,
      ],
    );
    tx.executeSql("select * from apartment;", [], (_, { rows: { _array } }) =>
      setList(_array)
    );
  });
};

export const editApartment = (db, id, values, setItem) => {
  db.transaction((tx) => {
    tx.executeSql(
      `update apartment set property = ?, bedrooms = ?, money = ?, furniture = ?, note = ?, reporter = ?, date = ? where id = ?;`,
      [
        values.property,
        values.bedrooms,
        values.money,
        values.furniture,
        values.note,
        values.reporter,
        values.date,
        id,
      ]
    );
    tx.executeSql(
      `select * from apartment where id = ?;`,
      [id],
      (_, { rows: { _array } }) => setItem(_array[0])
    );
  });
};

export const deleteApartment = (db, id, setReviews) => {
  db.transaction((tx) => {
    tx.executeSql(`delete from apartment where id = ?;`, [id]);
    tx.executeSql("select * from apartment;", [], (_, { rows: { _array } }) =>
      setReviews(_array)
    );
  });
};
