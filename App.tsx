import * as React from 'react';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { NativeRouter, Switch, Route } from 'react-router-native';

import MainLayout from 'layout/MainLayout';
import Home from 'screens/Home';
import CitySearch from 'screens/CitySearch';
import CitiesProvider from 'context';
import CityDetail from 'screens/CityDetail';
import Settings from 'screens/Settings';

const client = new ApolloClient({
  uri: 'https://graphql-weather-api.herokuapp.com/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      City: {
        fields: {
          weather: {
            merge: true,
          },
        },
      },
    },
  }),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <CitiesProvider>
        <NativeRouter>
          <MainLayout>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/city/:id' component={CityDetail} />
              <Route exact path='/search' component={CitySearch} />
              <Route exact path='/settings' component={Settings} />
            </Switch>
          </MainLayout>
        </NativeRouter>
      </CitiesProvider>
    </ApolloProvider>
  );
}
