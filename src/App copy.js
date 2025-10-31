import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Welcome from './components/Welcome/Welcome';
import UserDirectory from './components/UserDirectory/UserDirectory';
import TodoList from './components/TodoList/TodoList';
import ThemeContextProvider from './context/ThemeContext';
import ThemeSwitcher from './components/ThemeSwitcher/ThemeSwitcher';
import { use, useContext } from 'react';
import ThemeContext from './context/ThemeContext';


function App() {
  const { theme } = useContext(ThemeContext); 
  return (
    <div className={`App ${theme}`}>
      <Header />
      <main>
        <UserDirectory />
        <TodoList />
      </main>
    </div>
  );
}

export default App;
