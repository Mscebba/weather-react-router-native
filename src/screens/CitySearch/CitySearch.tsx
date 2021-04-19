import React, { FC, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { RouteComponentProps } from 'react-router';

import Search from 'components/Search';
import styled from 'styled-components/native';

interface Props extends RouteComponentProps {}

const CitySearch: FC<Props> = ({ history }) => {
  const backAction = () => {
    history.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  return (
    <Container>
      <Title>Buscar</Title>
      <Search />
    </Container>
  );
};

export default CitySearch;

const Container = styled.View`
  background-color: #ffffff;
  padding-top: 50px;
  padding-horizontal: 20px;
  flex: 1;
  padding-top: 20%;
`;

const Title = styled.Text`
  font-size: 24px;
`;

const ButtonLink = styled.Button`
  color: #fff;
`;
