// filepath: client/src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  return (
    <div>
      <h1>Marwa City Restaurant POS</h1>
      <ul>
        {menu.map(item => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
// filepath: client/src/App.js
import React, { useEffect, useState } from 'react';

function App() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => setMenu(data));
  }, []);

  return (
    <div>
      <h1>Marwa City Restaurant POS</h1>
      <ul>
        {menu.map(item => (
          <li key={item.id}>{item.name} - ${item.price}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;