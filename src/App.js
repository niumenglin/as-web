import React from "react";
import  {Button} from 'antd';
import './App.less';

function App() {
  return (
    <div className="App">
        <Button type="primary">123456</Button>
        <Button type="primary" loading>
            Loading123
        </Button>
    </div>
  );
}

export default App;
