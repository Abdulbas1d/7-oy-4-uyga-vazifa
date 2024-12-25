import React, { useState } from 'react';
import './index.css';
import { Toaster, toast } from 'react-hot-toast';

function HomeworkTwo() {
  const [copy, setCopy] = useState('')
  const [list, setList] = useState([]);
  const [pasteValue, setPasteValue] = useState('');

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item)
      .then(() => {
        toast.success(`"${item}" nusxalandi!`);
      })
      .catch(() => {
        toast.error('Nusxalashda xatolik yuz berdi!');
      });
  };

  const handleAddToList = (e) => {
    e.preventDefault();
    if (copy.trim() === '') {
      toast.error('Iltimos, mahsulot nomini kiriting!');
      return;
    }
    setList([...list, copy]);
    setCopy('');
    toast.success(`"${copy}" ro'yxatga qo'shildi!`);
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData('text');
    setPasteValue(pasteData);
    toast.success(`"${pasteData}" joylandi!`);
  };

  return (
    <div className="container_Copy">
      <Toaster />
      <div className="copy">
        <form className="formTwo" onSubmit={handleAddToList}>
          <h2>Copy {" "} / {" "} Paste Shopping List</h2>

          <label htmlFor="copy">Kopiya uchun biror narsa kiriting!</label>
          <input
            value={copy}
            onChange={(e) => setCopy(e.target.value)}
            type="text"
            name="copy"
            id="copy"
            placeholder="Enter your task for copy..."
          />

          <button type="submit" className="btnTwo">Add to List</button>
        </form>

        <div className="list">
          <h3>Shopping List:</h3>
          <ul>
            {list.length > 0 ? (
              list.map((item, index) => (
                <li key={index} onClick={() => handleCopy(item)}>
                  {item} <button className='copy'>Click to Copy</button>
                </li>
              ))
            ) : (
              <p>Hozircha kopiyalar mavjud emas!</p>
            )}
          </ul>
        </div>

        <div className="paste">
          <h3>Paste Here:</h3>
          <input value={pasteValue} onPaste={handlePaste} onChange={(e) => setPasteValue(e.target.value)} type="text" placeholder="Paste copied item here..." />
        </div>
      </div>
    </div>
  );
}

export default HomeworkTwo;
