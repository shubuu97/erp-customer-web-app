import Alert from 'react-s-alert';

const showSuccessAlert = ({
    message, position = 'bottom-right', effect = 'slide', timeout = 3000, html = true
}) => Alert.success(message, {
    position,
    effect,
    timeout,
    html,
    beep: 'http://soundbible.com/mp3/Electronic_Chime-KevanGC-495939803.mp3'
});

const showErrorAlert = ({
    message, position = 'bottom-right', effect = 'slide', timeout = 3000, html = true
}) => Alert.error(message, {
    position,
    effect,
    timeout,
    html,
});

export {
    showSuccessAlert,
    showErrorAlert,
};

