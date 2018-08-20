import Alert from 'react-s-alert';

export default function showAlert(error, msg, statusCode) {
  if (error) {
    return Alert.error(msg || '', {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 3000,
      html: true,
    });
  }
  if (statusCode == 201) {
    return Alert.success('Created Successfully', {
      position: 'bottom-right',
      effect: 'slide',
      timeout: 3000,
      html: true,
    });
  }

  return Alert.success('updated Successfully', {
    position: 'bottom-right',
    effect: 'slide',
    timeout: 3000,
    html: true,
  });
}


