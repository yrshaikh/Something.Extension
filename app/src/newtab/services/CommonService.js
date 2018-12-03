export class CommonService {
    getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    isPM() {
        const date = new Date();
        const
            hour = date.getHours(),
            morning = hour < 12 ? 'AM' : 'PM';
        return morning === 'PM';
    }
    getCurrentTime() {
        const date = new Date();
        const
            hour = date.getHours(),
            minute = date.getMinutes(),
            hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
            minuteFormatted = minute < 10 ? '0' + minute : minute,
            morning = hour < 12 ? 'AM' : 'PM';
        return `${hourFormatted}:${minuteFormatted} ${morning}`;
    }
}
