import React, { FC, useContext } from 'react';
import { paises, simbolos } from 'constants/constants';
import { Alert, Vibration } from 'react-native';
import { RouteComponentProps, withRouter } from 'react-router';
import { CitiesContext } from 'context';
import styled from 'styled-components/native';

interface Props extends RouteComponentProps {
  id: string;
  name: string;
  units: string;
  country: string;
  weather: { temperature: { actual: number }; summary: { icon: string } };
}

interface ContextInterface {
  removeCity: (id: string) => void;
  setDefaultCity: (id: string) => void;
}

export const CityOneLine: FC<Props> = ({
  name,
  country,
  weather,
  id,
  history,
  units,
}) => {
  const { removeCity, setDefaultCity } = useContext(
    CitiesContext
  ) as ContextInterface;

  return (
    <Container
      onPress={() => {
        Vibration.vibrate(40);
        history.push(`/city/${id}`);
      }}
      onLongPress={() => {
        Vibration.vibrate(60);
        Alert.alert(
          `${name}`,
          `¿Querés convertir ${name} en tu 'Ciudad Predeterminada' o eliminarla?`,
          [
            {
              text: 'Cancelar',
              style: 'cancel',
              onPress: () => {
                Vibration.vibrate(40);
              },
            },
            {
              text: 'Eliminarla',
              style: 'destructive',
              onPress: () => {
                Vibration.vibrate(40);
                removeCity(id);
              },
            },
            {
              text: 'Ciudad Predeterminada',
              onPress: () => {
                Vibration.vibrate(40);
                setDefaultCity(id);
              },
            },
          ]
        );
      }}
    >
      <P numberOfLines={1} ellipsizeMode={'tail'}>
        {name}, {paises[country]}
      </P>
      <Temperature>
        <P>
          {weather.temperature.actual.toFixed(0)}
          {simbolos[units]}
        </P>
        <Icon
          source={{
            uri: `http://openweathermap.org/img/wn/${weather.summary.icon}@2x.png`,
          }}
        />
      </Temperature>
    </Container>
  );
};

export default withRouter(CityOneLine);

const Container = styled.TouchableOpacity`
  background-color: #f0f0f0;
  flex: 1;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  min-height: 45px;
  margin-bottom: 7px;
  border-radius: 4px;
  padding-left: 10px;
  padding-vertical: 4px;
  shadow-color: #000000;
  shadow-opacity: 0.3;
  elevation: 2;
`;

const Temperature = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.Image`
  width: 35px;
  height: 35px;
`;

const P = styled.Text`
  font-size: 12px;
  max-width: 76%;
`;
