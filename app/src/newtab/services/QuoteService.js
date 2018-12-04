import { CommonService } from './CommonService';

export class QuoteService {
    constructor() {
        this.quotes = [
            '“The man who does not read has no advantage over the man who cannot read.” ― Mark Twain',
            '“If you don\'t stand for something you will fall for anything.” ― Gordon A.Eadie',
            '“I have not failed. I\'ve just found 10,000 ways that won\'t work.”― Thomas A.Edison',
            '“That which does not kill us makes us stronger.” ― Friedrich Nietzsche',
            '“For every minute you are angry you lose sixty seconds of happiness.” ― Ralph Waldo Emerson',
            '“If you judge people, you have no time to love them.”― Mother Teresa'
        ];
        this.commonService = new CommonService();
    }
    get() {
        return this.quotes[this.commonService.getRandomNumber(0, this.quotes.length)];
    }
}
