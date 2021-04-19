import React, { FC, ReactNode } from 'react';
import { TouchableOpacity, Vibration } from 'react-native';
import { RouteComponentProps, withRouter } from 'react-router';

import { MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';

interface Props extends RouteComponentProps {
  children?: ReactNode;
  title: string;
  text?: string;
  icon?: string;
}

const Message: FC<Props> = ({ children, history, title, text, icon }) => {
  return (
    <Container>
      <TouchableOpacity
        onPress={() => {
          Vibration.vibrate(40);
          history.push('/search');
        }}
      >
        <MaterialIcons
          name={icon ? icon : 'info-outline'}
          size={60}
          color='black'
          style={{ color: '#7fbef1' }}
        />
      </TouchableOpacity>
      <P>{title}</P>
      {text && <P>{text}</P>}
      {children}
    </Container>
  );
};

export default withRouter(Message);

const Container = styled.View`
  flex: 1;
  align-items: center;
  padding-top: 50px;
`;

const P = styled.Text`
  text-align: center;
`;
