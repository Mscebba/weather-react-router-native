import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { citiesArray, countriesMap } from 'constants/constants';

const storeDataCities = async (value: object, key: string) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const CitiesContext = createContext({});

const CitiesProvider: React.FC = ({ children }) => {
  const [cities, setCities] = useState(citiesArray);
  const [mainCity, setMainCity] = useState('3435910');
  const [countries, setCountries] = useState(countriesMap);
  const [units, setUnits] = useState('metric');
  const [lang, setLang] = useState('sp');

  const DATA_STORE = {
    cities,
    mainCity,
    units,
  };

  const addCity = (id: string) => {
    setCities([...cities, id]);
  };

  const removeCity = (id: string) => {
    setCities([...cities.filter(city => city !== id)]);
  };

  const toggleCity = (id: string) => {
    if (cities.includes(id)) removeCity(id);
    else addCity(id);
  };

  const setDefaultCity = (id: string) => {
    setMainCity(id);
  };

  useEffect(() => {
    const getData = async (key: string) => {
      await AsyncStorage.getItem(key).then(value => {
        if (value && value.length > 2) {
          const data = JSON.parse(value);
          setCities(data.cities);
          setMainCity(data.mainCity);
          setUnits(data.units);
        }
      });
    };
    getData('@App_Cities');
  }, []);

  useEffect(() => {
    storeDataCities(DATA_STORE, '@App_Cities');
  }, [cities, mainCity, units]);

  return (
    <CitiesContext.Provider
      value={{
        cities,
        addCity,
        removeCity,
        toggleCity,
        units,
        setUnits,
        lang,
        countries,
        mainCity,
        setDefaultCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

export default CitiesProvider;
