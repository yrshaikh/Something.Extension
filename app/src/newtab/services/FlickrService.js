import { AjaxService } from './AjaxService';
import { CommonService } from './CommonService';
import { LocalStorageService } from './LocalStorageService';

export class FlickrService {
    constructor() {
        this.ajaxService = new AjaxService();
        this.commonService = new CommonService();
        this.localStorageService = new LocalStorageService('FlickrService');
    }
    async get(query) {

        const imageUrlFromCache = this.localStorageService.get();
        if (imageUrlFromCache)
            return imageUrlFromCache;

        const requestUrl = this.buildUrl(query);
        const response = await this.ajaxService.get(requestUrl);
        const photos = response.photos.photo;
        const selectedIndex = this.commonService.getRandomNumber(0, photos.length);
        const imageUrl = this.buildImagePath(photos[selectedIndex]);

        this.localStorageService.set(imageUrl);
        return imageUrl;
    }
    buildImagePath(photo) {
        // https://www.flickr.com/services/api/misc.urls.html
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_h.jpg`;
    }
    buildUrl(query) {
        return 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=3385a627443ba77eec4d8348f50e6ac0&gallery_id=72157704262118125&format=json&nojsoncallback=1&auth_token=72157702775726491-c99a7e5e4e4fd23b&api_sig=1f0b2189477c5dc83c03cd57401e2c63';
    }
}