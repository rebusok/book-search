import React, {useState} from 'react';
import {SuperButton, SuperInputText} from "../components";
import Api from "../api/api";

function App() {
  const [searchValue, setSearchValue] = useState<string>('')
  const searchHandler = () => {
    Api.searchBook(searchValue,)
  }
  return (
    <div >
      <SuperInputText onChangeText={setSearchValue} value={searchValue} placeholder={'Поиск книг'}/>
      <SuperButton onClick={searchHandler}>
        Search
      </SuperButton>
    </div>
  );
}

export default App;
