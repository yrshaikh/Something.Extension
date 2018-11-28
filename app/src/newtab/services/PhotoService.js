import Unsplash, { toJson } from 'unsplash-js';
import { LocalStorageService } from './LocalStorageService';

export class PhotoService {
    constructor() {
        this.unsplash = new Unsplash({
            applicationId: "4ea9098287864f4bcb9d6284912e3e520e302224d3acc440e66122172f412650",
            secret: "35e72e41e723375703cd6c6edda3f4fc15a709b2d26e0933940454140a6093e9"
        });
        this.localStorageService = new LocalStorageService('backgroundImage');
    }
    async get(refresh) {
        if (refresh) {
            localStorage.removeItem(this.key);
        }
        else {
            const url = this.localStorageService.get();
            if (url) {
                return url;
            }
        }
        let response = await this.unsplash.photos.getRandomPhoto();
        let photo = await toJson(response);
        const photoObj = {
            url: photo.urls.regular,
            user: photo.user,
        };
        this.localStorageService.set(photoObj.url);
        return photoObj.url;
    }
}