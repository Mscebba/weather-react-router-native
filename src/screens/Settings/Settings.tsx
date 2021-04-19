import React, { FC, useContext, useEffect } from 'react';
import { BackHandler, StyleSheet, Text } from 'react-native';
import { RouteComponentProps } from 'react-router';
import RNPickerSelect from 'react-native-picker-select';

import { CitiesContext } from 'context';
import styled from 'styled-components/native';

interface Props extends RouteComponentProps {}

interface ContextInterface {
  units: string;
  setUnits: (unit: string) => void;
}

const Settings: FC<Props> = ({ history }) => {
  const { units, setUnits } = useContext(CitiesContext) as ContextInterface;

  const backAction = () => {
    history.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  const placeholder = {
    label: 'Seleccionar...',
    value: '',
    color: '#9EA0A4',
  };

  const unitsList = [
    { label: 'Métrico', value: 'metric' },
    { label: 'Imperial', value: 'imperial' },
    { label: 'Kelvin', value: 'kelvin' },
  ];

  return (
    <Container>
      <Title>Preferencias</Title>
      <Text>Seleccionar Unidad de Temperatura</Text>
      <RNPickerSelect
        onValueChange={value => setUnits(value)}
        value={units}
        placeholder={placeholder}
        useNativeAndroidPickerStyle={false}
        style={pickerSelectStyles}
        items={unitsList}
      />

      <SubTitle>Tip</SubTitle>
      <TipText>
        Estando en la pantalla principal, mantené presionado el nombre de una
        ciudad para acceder al menú de edición Podes seleccionarla como tu
        'Ciudad predeterminada', o eliminarla de la lista.
      </TipText>
    </Container>
  );
};

export default Settings;

const Container = styled.View`
  background-color: #fff;
  padding-top: 15%;
  padding-horizontal: 20px;
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #26282c;
  margin-bottom: 30px;
`;

const SubTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #26282c;
  margin-bottom: 5px;
`;

const TipText = styled.Text`
  font-size: 16px;
  line-height: 22px;
  color: #999;
`;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 30,
  },
  inputAndroid: {
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    height: 50,
    paddingRight: 30,
    marginBottom: 30,
  },
});
