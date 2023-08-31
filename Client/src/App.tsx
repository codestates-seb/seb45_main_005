import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WeatherRecommend from './pages/WeatherRecommend';
import { RouteConst } from './interface/RouteConst';
import SongLists from './components/Playlist/SongLists';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={RouteConst.WeatherRecommend}
          element={<WeatherRecommend />}
        />
        <Route path={RouteConst.SongLists} element={<SongLists />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
