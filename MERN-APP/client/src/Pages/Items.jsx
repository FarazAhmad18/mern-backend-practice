import { useState, useEffect } from 'react';
import axios from 'axios';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';

const Items = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/items');
      setItems(res.data);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const addItem = async (item) => {
    try {
      const res = await axios.post('http://localhost:5000/api/items', item);
      setItems([...items, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/items/${id}`, updatedItem);
      setItems(items.map(item => (item._id === id ? res.data : item)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setItems(items.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center">Items Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
          <ItemForm onSubmit={addItem} />
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Items List</h2>
          <ItemList 
            items={items} 
            onUpdate={updateItem} 
            onDelete={deleteItem} 
          />
        </div>
      </div>
    </div>
  );
};

export default Items;