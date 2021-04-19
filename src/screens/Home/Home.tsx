import React, { FC, ReactNode, useContext, useEffect } from 'react';
import { Alert, BackHandler } from 'react-native';
import { CitiesContext } from 'context';

import FavCitiesList from 'components/FavCitiesList';
import City from 'components/City';
import styled from 'styled-components/native';

interface ContextInterface {
  cities: string[];
}

export const Home: FC = () => {
  const { cities } = useContext(CitiesContext) as ContextInterface;

  const backAction = () => {
    Alert.alert('Salir', '¿Queres cerrar la aplicación?', [
      {
        text: 'Cancelar',
        onPress: () => null,
        style: 'cancel',
      },
      { text: 'Salir', onPress: () => BackHandler.exitApp() },
    ]);
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  return (
    <Container>
      <DefaultCity>
        <City short />
      </DefaultCity>
      <CitiesList>
        <CitiesTitle>Mis ciudades</CitiesTitle>
        <FavCitiesList list={cities} />
      </CitiesList>
    </Container>
  );
};

export default Home;

const Container = styled.View`
  flex: 1;
`;

const DefaultCity = styled.View`
  background: #e6e6e6;
  flex: 1;
`;

const CitiesList = styled.View`
  height: 420px;
  padding-horizontal: 20px;
  padding-vertical: 10px;
`;

const CitiesTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;
