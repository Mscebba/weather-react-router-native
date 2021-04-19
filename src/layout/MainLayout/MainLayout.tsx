import React, { FC } from 'react';

import BottomNav from 'layout/BottomNav';
import styled from 'styled-components/native';

const MainLayout: FC = ({ children }) => {
  return (
    <Container>
      <Main>{children}</Main>
      <Nav>
        <BottomNav />
      </Nav>
    </Container>
  );
};

export default MainLayout;

const Container = styled.View`
  flex: 1;
  margin: 0px;
`;

const Main = styled.View`
  flex: 1;
`;

const Nav = styled.View`
  height: 50px;
  padding-horizontal: 30px;
`;
