export const getAllReview = (db, setReviews) => {
  db.transaction((tx) => {
    tx.executeSql(`select * from reviews;`, [], (_, { rows: { _array } }) =>
      setReviews(_array)
    );
  });
};

export const getReview = (db, id, setItem) => {
  db.transaction((tx) => {
    tx.executeSql(
      `select * from reviews where id = ?;`,
      [id],
      (_, { rows: { _array } }) => setItem(_array[0])
    );
  });
};

export const addReview = (db, values, setReviews) => {
  db.transaction((tx) => {
    tx.executeSql(
      "insert into reviews (title, body, rating) values (?, ?, ?)",
      [values.title, values.body, values.rating]
    );
    tx.executeSql("select * from reviews;", [], (_, { rows: { _array } }) =>
      setReviews(_array)
    );
  });
};

export const editReview = (db, id, values, setItem) => {
  db.transaction((tx) => {
    tx.executeSql(
      `update reviews set title = ?, body = ?, rating = ? where id = ?;`,
      [values.title, values.body, values.rating, id]
    );
    tx.executeSql(
      `select * from reviews where id = ?;`,
      [id],
      (_, { rows: { _array } }) => setItem(_array[0])
    );
  });
};

export const deleteReview = (db, id, setReviews) => {
  db.transaction((tx) => {
    tx.executeSql(`delete from reviews where id = ?;`, [id]);
    tx.executeSql("select * from reviews;", [], (_, { rows: { _array } }) =>
      setReviews(_array)
    );
  });
};
