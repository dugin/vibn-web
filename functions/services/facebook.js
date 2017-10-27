const FB = require('fb');


class Facebook {

    constructor() {
        this.config();
    }

    config() {
        this.fb = new FB.Facebook({
            accessToken: functions.config().facebook.accesstoken,
            appId: functions.config().facebook.appid,
            appSecret: functions.config().facebook.appsecret,
            version: 'v2.4',
        });
    }

    getEvent(id) {
        return new Promise((resolve, reject) => {
            this.fb.api(id, {fields: 'id,name,attending_count,cover,description,is_canceled,owner,start_time,end_time,place'}, (res) => {
                if (!res || res.error) {
                    reject(res.error);
                }
                else
                    resolve(res);
            });
        })
    }

}

module.exports = Facebook;
