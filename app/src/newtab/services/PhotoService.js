import { AjaxService } from './AjaxService';
import { LocalStorageService } from './LocalStorageService';

export class PhotoService {
    constructor() {
        this.ajaxService = new AjaxService();
        this.currentImage = new LocalStorageService('currentImage');
        this.imageStore = new LocalStorageService('imageStore');
        this.collectionUrl = 'https://api.unsplash.com/collections/3582579?per_page=100&client_id=4ea9098287864f4bcb9d6284912e3e520e302224d3acc440e66122172f412650';
    }
    async get() {
        let image = this.getImageFromCache();

        if (image) {
            return image;
        }

        let imageStore = this.getImageStoreFromCache();
        if (imageStore) {
            image = this.getRandomImageFromStore(imageStore);
            this.setImageToCache(image);
            return image;
        }

        imageStore = await this.getImageStoreFromApi();
        this.setImageStoreToCache(imageStore);
        image = this.getRandomImageFromStore(imageStore);
        this.setImageToCache(image);
        return image;
    }
    reset() {
        this.removeImageFromCache();
        this.removeImageStoreFromCache();
    }
    getImageFromCache() {
        return JSON.parse(this.currentImage.get());
    }
    getImageStoreFromCache() {
        return JSON.parse(this.imageStore.get());
    }
    setImageToCache(value) {
        return this.currentImage.set(JSON.stringify(value));
    }
    setImageStoreToCache(value) {
        return this.imageStore.set(JSON.stringify(value));
    }
    removeImageFromCache() {
        return this.currentImage.clear();
    }
    removeImageStoreFromCache() {
        return this.imageStore.clear();
    }
    getRandomImageFromStore(imageStore) {
        const randomIndex = Math.floor(Math.random() * imageStore.length);
        const randomImage = imageStore[randomIndex];
        return randomImage;
    }
    async getImageStoreFromApi(){
        let apiResponse = await this.ajaxService.get(this.collectionUrl);
        const imageStore = [];
        apiResponse.preview_photos.forEach((element, i) => {
            imageStore.push({
                id: element.id,
                url: element.urls.regular,
                urlHd: element.urls.full
            });
        });
        return imageStore;
    }
}