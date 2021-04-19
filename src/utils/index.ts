import { Platform } from 'react-native';

export function genFecha(date: number): string {
  const dia = new Date(date * 1000);
  if (Platform.OS === 'ios')
    return dia.toLocaleString('es-AR', {
      weekday: 'long',
      month: 'long',
      day: '2-digit',
    });
  else {
    const semana = [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ],
      meses = [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ];

    return `${semana[dia.getDay()]}, ${dia.getDate()} de ${
      meses[dia.getMonth()]
    }`;
  }
}
