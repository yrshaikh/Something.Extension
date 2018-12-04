import { AjaxService } from './AjaxService';
import { CommonService } from './CommonService';
import { LocalStorageService } from './LocalStorageService';

export class FlickrService {
    constructor() {
        this.ajaxService = new AjaxService();
        this.commonService = new CommonService();
        this.key = this.commonService.getCurrentTimeNameAndKey().key;
        this.localStorageService = new LocalStorageService(this.key);
    }
    async get() {

        const imageUrlFromCache = this.localStorageService.get();
        if (imageUrlFromCache)
            return imageUrlFromCache;

        const requestUrl = this.buildUrl();
        const response = await this.ajaxService.get(requestUrl);
        const photos = response.photos.photo;
        const selectedIndex = photos.length == 1 ? 0 : this.commonService.getRandomNumber(0, photos.length) - 1;
        const imageUrl = this.buildImagePath(photos[selectedIndex]);

        this.localStorageService.set(imageUrl);
        return imageUrl;
    }
    buildImagePath(photo) {
        // https://www.flickr.com/services/api/misc.urls.html
        return `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_h.jpg`;
    }
    buildUrl() {
        return 'https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=1729040527eabf65a4cfd91aae30b184&gallery_id=' + this.key + '&format=json&nojsoncallback=1';
    }
    clear() {
        this.localStorageService.clear();
    }
}