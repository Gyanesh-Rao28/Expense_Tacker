'use client';
import { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, deleteDoc, doc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useRouter } from 'next/navigation';


export default function Home() {
  const [Items, setItems] = useState([]);
  const [user, setuser] = useState([])
  const [NewItems, setNewItems] = useState({
    name: '',
    price: '',
  });
  const [total, setTotal] = useState(0);

  const router = useRouter();

  const addItem = async (e) => {
    e.preventDefault();
    if (NewItems.name !== '' && NewItems.price !== '') {
      try {
        await addDoc(collection(db, 'items'), {
          userId: user.userId,
          name: NewItems.name.trim(),
          price: NewItems.price,
        });
        setNewItems({ name: '', price: '' });
        readItems();
      } catch (error) {
        console.error('Error adding document: ', error);
      }
    }
  };

  // delete items

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'items', id));
    } catch (error) {
      console.error('Error deleting document: ', error);
    } finally {
      router.push('/')
    }
  };

  // read items

  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    
    if (token) {
      
      const storedUser = localStorage.getItem("auth-user");
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser) {

        setuser(parsedUser)
        // readItems(parsedUser.userId)
      
        const q = query(collection(db, "items"), where("userId", "==", parsedUser.userId));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push({ ...doc.data(), id: doc.id });
          });

          setItems(items);

          // const calculateTotal = () => {
          //   const totalPrice = items.reduce((sum, item) => sum + parseFloat(item.price), 0);
          //   setTotal(totalPrice);
          // };
          // calculateTotal();
          return () => unsubscribe();
        })
      }
    } else {
      router.push('/login')
    }

  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className='text-4xl p-4 text-center'>Todo Tracker</h1>
        <h2 className='text-2xl p-4 text-center'>Welcome {user.username}</h2>

        <div className='bg-slate-800 p-4 rounded-lg'>
          <form className='grid grid-cols-6 items-center text-black'>

            <input value={NewItems.name} onChange={(e) => { setNewItems({ ...NewItems, name: e.target.value }) }} type="text" placeholder='To do' className='col-span-3 p-3 border' required />
            <input value={NewItems.price} onChange={(e) => { setNewItems({ ...NewItems, price: e.target.value }) }} type="text" placeholder='Tag' className='col-span-2 p-3 border mx-3' required />

            <button type='submit' onClick={addItem} className='text-white bg-slate-950 hover:bg-slate-900 p-3 text-xl'>+</button>
          </form>

          <ul>
              {Items.map((item) => (
                <li key={item.id} className='my-4 w-full flex justify-between bg-slate-950'>
                  <div className='p-4 w-full flex justify-between'>
                    <span className='capitalize'>{item.name}</span>
                    <span>{item.price}</span>
                  </div>
                  <button className='ml-8 p-4 border-l-2 border-slate-900 hover:bg-slate-900 w-16'
                    onClick={() => { deleteItem(item.id) }}
                  >X</button>
                </li>
              ))}
          </ul>

          {/* {
            Items.length < 1 ? ("") : (
              <>
                <div className='flex justify-between p-3'>
                  <span>Total: </span>
                  <span>₹{total}</span>
                </div>
              </>
            )
          } */}

        </div>

      </div>
    </main>
  );
}
