import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding-top: 80px;
  padding-horizontal: 20px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-weight: bold;
`;

export const SubTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

export const TemperatureContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
`;
export const Temperature = styled.Text`
  font-size: 60px;
`;
export const Horario = styled.Text`
  font-size: 24px;
  font-weight: bold;
  line-height: 24px;
  margin-bottom: 10px;
`;
export const Icon = styled.Image`
  width: 100px;
  height: 100px;
`;

export const P = styled.Text`
  font-size: 16px;
  text-transform: capitalize;
  /* margin-bottom: 5px; */
`;

export const Bookmark = styled.TouchableOpacity`
  position: absolute;
  padding: 8px;
  top: 50px;
  right: 20px;
  opacity: 0.7;
`;
