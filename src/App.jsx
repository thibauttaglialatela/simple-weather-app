import { useState, useEffect, useReducer } from 'react'
import './App.css'
import Input from './components/Input'
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  // utiliser useReducer
  const initialState = {
    data: null,
    isLoading: true,
    error: null,
    name:'',
    lat:'',
    lon:'',
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'fetchSuccess':
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          error: null,
        };
      case 'fetchError':
        return {
          ...state,
          isLoading: false,
          error: action.payload
        };
      default:
        return state;
    }
  }

  const API_KEY = String(import.meta.env.VITE_API_KEY);
  const apiGeoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=Pau,FR&limit=1&appid=${API_KEY}`
  const fetchGeoData = async (dispatch) => {
    try {
      const response = await axios.get(apiGeoUrl);
      dispatch({ type: 'fetchSuccess', payload: response.data});
    } catch(error) {
      dispatch({ type: 'fetchError', payload: error.message});
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchGeoData(dispatch)
  }, []);


  const handleChange = (e) => {
    console.log(state)
    setCity(e.target.value);
  }




  return (
    <>
    {
      state.isLoading && <span>Loading...</span>
    }
    {
      state.error && <span>Error: {state.error}</span>
    }
      <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight text-primary">Weather of your town</h1>
      <Input value={city} onChange={handleChange}/>
      <p>Your city: {city}</p>
    </>
  )
}

export default App
