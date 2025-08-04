import config from '../config/environments/index'
const OneSignal = require('onesignal-node');

// const client = new OneSignal.Client('f10f4fad-bb50-4e88-ad8f-813e89803883', 'NmFhNzRhNWQtZmZkYi00Y2Q0LTg5NmQtOTEyMTU5ZTBiYzY3');
const client = new OneSignal.Client(config.ONE_SIGNAL_APP_ID, config.ONE_SIGNAL_API_KEY);

export async function SendNotificationForUsers(notification:any) {
    try {

        const response = await client.createNotification(notification);
        console.log(response)
        console.log(response.body.id);
    } catch (e:any) {
        if (e instanceof OneSignal.HTTPError) {
            // When status code of HTTP response is not 2xx, HTTPError is thrown.
            console.log(e.statusCode);
            console.log(e.body);
        }
    }

}
