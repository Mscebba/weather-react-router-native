import React, { useState, FC, useContext } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useLazyQuery } from '@apollo/client';
import { Redirect } from 'react-router';

import { SEARCH_CITY } from 'graphql/queries';
import { CitiesContext } from 'context';
import styled from 'styled-components/native';

interface Item {
  value: string;
  label: string;
}
interface ContextInterface {
  countries: Item[];
  units: string;
  lang: string;
}

const Search: FC = () => {
  const [city, onChangeCity] = useState('');
  const [country, setCountry] = useState('');

  const { countries, units, lang } = useContext(
    CitiesContext
  ) as ContextInterface;

  const [handleSubmit, { loading, data, error }] = useLazyQuery(SEARCH_CITY);

  const { id } = data && data.getCityByName ? data.getCityByName : '';

  if (loading) return <ActivityIndicator size='large' color='#8595b8' />;
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  // remover acentos o diacriticas antes de hacer la busqueda
  const result = city
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  function sendData() {
    // la api devuelve busquedas a partir de los 3 caracteres
    if (city.length <= 2) return;

    handleSubmit({
      variables: {
        name: result,
        country,
        config: {
          units,
          lang,
        },
      },
    });
  }

  const placeholder = {
    label: 'Seleccionar pais (opcional)...',
    value: '',
    color: '#9EA0A4',
  };

  return (
    <Container>
      <TextBox
        onChangeText={onChangeCity}
        value={city}
        placeholder='Buscar ciudad o país...'
        placeholderTextColor='#c1c4c9'
        autoFocus
        clearTextOnFocus
        autoCorrect={false}
        onSubmitEditing={() => sendData()}
      />
      <RNPickerSelect
        onValueChange={value => setCountry(value)}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        items={countries}
      />

      <TouchableOpacity onPress={() => sendData()}>
        <SearchButton>Buscar</SearchButton>
      </TouchableOpacity>

      {data && data.getCityByName.id && <Redirect to={`/city/${id}`} />}

      {data && data.getCityByName === null && (
        <Resultados>Sin resultados. Inténtelo de nuevo</Resultados>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.View`
  padding-top: 15px;
`;

const TextBox = styled.TextInput`
  font-size: 18px;
  height: 45px;
  padding: 5px;
  background-color: #fff;
  border: 1px;
  border-color: #999;
  border-style: solid;
  border-radius: 5px;
  margin-bottom: 35px;
`;

const Resultados = styled.Text`
  font-size: 18px;
  margin-top: 30px;
`;

const SearchButton = styled.Text`
  background-color: #2d79db;
  font-size: 16px;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  padding-vertical: 10px;
  margin-top: 30px;
  border-radius: 8px;
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    height: 50,
    paddingRight: 30,
  },
});
