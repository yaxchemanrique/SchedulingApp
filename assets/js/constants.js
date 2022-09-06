const API_URL_APPOINTMENTS = 'http://localhost:3000/appointmentSlots';

const CONFIG_POST = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
}

const SCHEDULES = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

export {
    API_URL_APPOINTMENTS,
    CONFIG_POST,
    SCHEDULES,
};