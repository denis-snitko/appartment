import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { ref, get, child } from 'firebase/database';
import { database } from '../firebase';

export const useData = create(
  devtools((set) => ({
    entities: [],
    status: null,
    error: null,
    
    fetchData: async (endpoint: string) => {
      const dbRef = ref(database);
      const resultData: any = [];
      
      set({ status: 'loading' });
      
      await get(child(dbRef, `apartment/${endpoint}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            
            for (const key in data) {
              if (Object.prototype.hasOwnProperty.call(data, key)) {
                const element = {
                  id: key,
                  ...data[key],
                };
                resultData.push(element);
              }
            }
          } else {
            console.log('No data available');
          }
          set({ status: 'success' });
        })
        .catch((error) => {
          set({ status: 'error' });
          console.error(error);
        });
      
      set({ entities: resultData });
    },
  })),
);
