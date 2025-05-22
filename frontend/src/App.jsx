import './App.css'
import React from 'react';
import Dialog from './components/Dialog.jsx';
import BookingList from './pages/BookingList.jsx';

function App() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="htl-u-margin-inline-24 htl-u-padding-block-end-24">
      <Dialog
        isOpen={open}
        setOpen={setOpen}
      />
      <BookingList
        setOpen={setOpen} 
      />
    </div>
  );
}

export default App
