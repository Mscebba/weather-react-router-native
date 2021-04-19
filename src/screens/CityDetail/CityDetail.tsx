import React, { FC, useEffect } from 'react';
import { BackHandler } from 'react-native';
import { RouteComponentProps } from 'react-router';

import City from 'components/City';

interface Props extends RouteComponentProps {}

export const CityDetail: FC<Props> = ({ history }) => {
  const backAction = () => {
    history.push('/');
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  return <City />;
};

export default CityDetail;
