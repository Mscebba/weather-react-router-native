import React, { FC, ReactNode, useContext } from 'react';
import { ActivityIndicator, Vibration, View } from 'react-native';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';

import { CitiesContext } from 'context';
import { GET_CITY_FULL_DETAIL } from 'graphql/queries';
import { backgrounds, paises, simbolos } from 'constants/constants';
import { genFecha } from 'utils';

import * as S from './city.styled';

interface Props {
  short?: Boolean | undefined;
  children?: ReactNode;
}

interface ContextInterface {
  cities: string[];
  mainCity: string;
  units: string;
  lang: string;
  toggleCity: (id: string) => void;
}

export const City: FC<Props> = ({ short }) => {
  const { id }: any = useParams();
  const { toggleCity, units, lang, cities, mainCity } = useContext(
    CitiesContext
  ) as ContextInterface;

  const { loading, data, error } = useQuery(GET_CITY_FULL_DETAIL, {
    variables: {
      id: short ? mainCity : id,
      config: { units, lang },
    },
  });

  if (loading) return <ActivityIndicator size='large' color='#8595b8' />;
  if (error) return <S.P>{`Error! ${error.message}`}</S.P>;

  const { getCityById: city } = data && data;

  const Dia = city && genFecha(city[0].weather.timestamp);

  const textColor = backgrounds[city[0].weather.summary.icon].text;
  const backColor = backgrounds[city[0].weather.summary.icon].back;
  const horario = backgrounds[city[0].weather.summary.icon].hora;

  //Verifica si el id esta dentro del array para pintar el icono de favoritos
  const favorite = (id: string) => {
    return cities.includes(id) ? 'favorite' : 'favorite-border';
  };

  return (
    data && (
      <S.Container
        style={{
          backgroundColor: backColor,
        }}
      >
        <S.P style={{ color: textColor }}>{Dia}</S.P>
        <S.Title
          style={{ color: textColor }}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        >
          {city[0].name}
        </S.Title>
        <S.SubTitle
          style={{ color: textColor }}
          numberOfLines={1}
          ellipsizeMode={'tail'}
        >
          {paises[city[0].country] || null}
        </S.SubTitle>
        <S.TemperatureContainer>
          <View>
            <S.Temperature style={{ color: textColor }}>
              {city[0].weather.temperature.actual.toFixed(0)}
              {simbolos[units]}
            </S.Temperature>
            <S.Horario style={{ color: textColor }}>{horario}</S.Horario>
          </View>
          <S.Icon
            source={{
              uri: `http://openweathermap.org/img/wn/${city[0].weather.summary.icon}@2x.png`,
            }}
          />
        </S.TemperatureContainer>
        <S.P style={{ color: textColor, fontWeight: 'bold' }}>
          {city[0].weather.summary.description}
        </S.P>

        {!short && (
          <>
            <S.P style={{ color: textColor }}>
              Sensación térmica:{' '}
              {city[0].weather.temperature.feelsLike.toFixed(0)}
              {simbolos[units]}
              {'\n'}
              {'\n'}
              Mínima: {city[0].weather.temperature.min.toFixed(0)}
              {simbolos[units]}
              {'\n'}
              Máxima: {city[0].weather.temperature.max.toFixed(0)}
              {simbolos[units]}
              {'\n'}
              {'\n'}
              Viento
              {'\n'}
              Velocidad: {city[0].weather.wind.speed}
              {'\n'}
              Grados: {city[0].weather.wind.deg}º{'\n'}
              {'\n'}
              Visibilidad: {city[0].weather.clouds.visibility}
              {'\n'}
              Humedad: {city[0].weather.clouds.humidity}
              {'\n'}
              {'\n'}
              Coordenadas
              {'\n'}
              Longitud: {city[0].coord.lon}
              {'\n'}
              Latitud: {city[0].coord.lat}
            </S.P>
            <S.Bookmark
              onPress={() => {
                Vibration.vibrate(50);
                toggleCity(city[0].id);
              }}
            >
              <MaterialIcons
                name={favorite(city[0].id)}
                size={42}
                style={{ color: 'white' }}
              />
            </S.Bookmark>
          </>
        )}
      </S.Container>
    )
  );
};

export default City;
