import React, { FC, useContext } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { useQuery } from '@apollo/client';

import { GET_CITY_LISTED } from 'graphql/queries';
import { CitiesContext } from 'context/cities-context';

import CityOneLine from 'components/FavCitiesList/CityOneLine';
import { Message } from 'ui';

interface Props {
  list: String[];
}

interface getCityById {
  id: string;
  name: string;
  country: string;
  weather: {
    temperature: { actual: number };
    summary: { icon: string };
  };
  timestamp: number;
}

interface CityListed {
  getCityById: getCityById[];
}

interface CityListedVars {
  id: String[];
  config: { units: string; lang: string };
}

interface ContextInterface {
  units: string;
  lang: string;
}

const FavCitiesList: FC<Props> = ({ list }) => {
  const { units, lang } = useContext(CitiesContext) as ContextInterface;

  const { loading, data, error } = useQuery<CityListed, CityListedVars>(
    GET_CITY_LISTED,
    {
      variables: {
        id: list,
        config: { units, lang },
      },
    }
  );

  if (loading) return <ActivityIndicator size='large' color='#8595b8' />;
  if (error) return <Text>{`Error! ${error.message}`}</Text>;

  return (
    <>
      {data && data.getCityById !== null ? (
        <FlatList
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          data={data && data.getCityById}
          renderItem={({ item }: any) => (
            <CityOneLine {...item} units={units} />
          )}
        />
      ) : (
        <Message
          icon='search'
          title='Tu lista de ciudades esta vacía!'
          text='Usa la lupa para buscar nuevas Ciudades y agregarlas a tu lista'
        />
      )}
    </>
  );
};

export default FavCitiesList;
