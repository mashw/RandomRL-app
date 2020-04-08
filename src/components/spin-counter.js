import { dbase } from '../firebase';

export const spinNumber =  () => {
    dbase.ref()          
    .once('value')
    .then((snapshot) => {
      const val = snapshot.val();
      const currentNumber = val.spinNumber;
      console.log('spin-counter#: ' + currentNumber);
      return currentNumber;
    })
    .catch((e) => {
      console.log('Error fetching data', e);
  })};

