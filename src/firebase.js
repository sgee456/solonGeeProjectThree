import {initializeApp} from 'firebase/app';
import {getDatabase} from'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDOWMEAFNVjuqn6sj8ct5uw9Yz9-x7xbj4",  
    authDomain: "solongeeprojectthree.firebaseapp.com",  
    projectId: "solongeeprojectthree",  
    storageBucket: "solongeeprojectthree.appspot.com",  
    messagingSenderId: "264140519090",  
    appId: "1:264140519090:web:d23f78d18804761b15fbab"  
  };

  const app = initializeApp(firebaseConfig);

  const realtime = getDatabase(app);

  export default realtime;
  