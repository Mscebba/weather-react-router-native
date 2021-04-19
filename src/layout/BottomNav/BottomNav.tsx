import React, { FC } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import { TouchableOpacity, Vibration } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

interface Props extends RouteComponentProps {}

const BottomNav: FC<Props> = ({ history }) => {
  return (
    <Nav>
      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(50);
          history.push('/');
        }}
      >
        <MaterialIcons name='home' size={34} color='black' />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(50);
          history.push('/search');
        }}
      >
        <MaterialIcons name='search' size={34} color='black' />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(50);
          history.push('/settings');
        }}
      >
        <MaterialIcons name='settings' size={34} color='black' />
      </TouchableOpacity>
    </Nav>
  );
};

export default withRouter(BottomNav);

const Nav = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 5px;
  opacity: 0.4;
`;
