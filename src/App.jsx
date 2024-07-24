import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Home from './routes/Home';
import Purchases from './routes/Purchases';
import Favorite from './routes/Favorite';
import Drawer from './Drawer/Drawer';

export const AppContext = createContext({});

export default function App() {
  const [searchValue, setSearchValue] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sneakers, setSneakers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerCard, setDrawerCard] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    async function fetchData () {
      const sneakerData = await axios.get('https://3ad519bdc442b341.mokky.dev/sneaker');
      const DrawerData = await axios.get('https://3ad519bdc442b341.mokky.dev/DrawerCard')
      const FavoritesData = await axios.get('https://3ad519bdc442b341.mokky.dev/favorites')
   
      setDrawerCard(DrawerData.data);
      setFavorites(FavoritesData.data);
      setSneakers(sneakerData.data);
      setIsLoading(false);
    }

    fetchData();
  }, [])

  const DrawerOpen = () => {
    setDrawerOpen(!drawerOpen);
  }

  const onChangeSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const onClickPlus = (obj) => {

    if(drawerCard.find(prev => prev.id === obj.id)) {
      setDrawerCard(prev => prev.filter((item) => item.id !== obj.id));
      axios.delete(`https://3ad519bdc442b341.mokky.dev/DrawerCard/${obj.id}`);
    } else {
      axios.post('https://3ad519bdc442b341.mokky.dev/DrawerCard', obj)
      setDrawerCard(prev => [...prev, obj])
    }
  }

  const getAddedItems = (title) => {
    return drawerCard.some((item) => item.title === title);
  }

  const DeleteCard = (id) => {
    axios.delete(`https://3ad519bdc442b341.mokky.dev/DrawerCard/${id}`)
    setDrawerCard((prev) => prev.filter((prev) => prev.id !== id));
  }

  const onClickFavorite = async (obj) => {
    try {
      if (favorites.find(FavoritObj => FavoritObj.id === obj.id)) {
        axios.delete(`https://3ad519bdc442b341.mokky.dev/favorites/${obj.id}`)
        
      } else {
        const { data } = await axios.post('https://3ad519bdc442b341.mokky.dev/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      }
    } catch(err) {
      console.log(err);
      alert('Ошибка при получении закладок');
    }
  }

  const items = [
    {id: 1, img: './src/assets/slider-img.png'},
    {id: 2, img: './src/assets/slider-img.png'},
    {id: 3, img: './src/assets/slider-img.png'},
    {id: 4, img: './src/assets/slider-img.png'},
    {id: 5, img: './src/assets/slider-img.png'}
  ]

  return (
    <AppContext.Provider value={{drawerCard, favorites, sneakers, getAddedItems}}>
      <div className='wrapper'>
      <>
       <Routes>
        <Route path='/React-Sneakers/' element={<Header drawerOpen={DrawerOpen} />}>
          <Route index
            element={
            <Home 
            items={items}
            drawerCard={drawerCard}
            searchValue={searchValue}
            onChangeSearchValue={onChangeSearchValue}
            sneakers={sneakers}
            isLoading={isLoading}
            onClickPlus={onClickPlus}
            onClickFavorite={onClickFavorite}
            />
          }/>
          <Route path='favorite' element={ 
            <Favorite 
            onClickPlus={onClickPlus}
            onClickFavorite={onClickFavorite}
            />}/>
            <Route path='purchases' element={<Purchases/>}/>
          </Route>
        </Routes>
      </>
      <section>
            <Drawer 
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              items={drawerCard}
              DeleteCard={DeleteCard}
              />
        </section>
    </div>
    </AppContext.Provider>
  )
}


