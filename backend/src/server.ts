/* eslint-disable import/no-extraneous-dependencies */
import 'dotenv/config';
import app from './App';

app.listen(process.env.PORT || 3333, () => {
  console.log(
    `🚀 Server started ${process.env.PORT ? process.env.PORT : 3333}!`,
  );
});
