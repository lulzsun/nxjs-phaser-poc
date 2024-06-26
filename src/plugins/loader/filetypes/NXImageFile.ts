import { name } from '../../../../package.json';

export class NXImageFile extends Phaser.Loader.FileTypes.ImageFile {
    declare cache: Phaser.Textures.TextureManager;

    constructor(
        loader: Phaser.Loader.LoaderPlugin, 
        key: string | Phaser.Types.Loader.FileTypes.ImageFileConfig,
        url?: string | string[],
        xhrSettings?: Phaser.Types.Loader.XHRSettingsObject,
        frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig
    ) {
        if (Switch !== undefined) loader.imageLoadType = 'HTMLImageElement';
        super(loader, key, url, xhrSettings, frameConfig);
    }

    loadImage(): void {
        // @ts-expect-error: super.loadImage() exists, typing isnt exposed.
        if (Switch === undefined) return super.loadImage();
        this.state = Phaser.Loader.FILE_LOADING;
        this.src = 'sdmc:/switch/' + name + '/' + this.url;
        this.data = new Image();
        var _this = this;

        this.data.onload = function () {
            _this.state = Phaser.Loader.FILE_LOADED;
            _this.loader.nextFile(_this, true);
        };
        this.data.onerror = function () {
            _this.loader.nextFile(_this, false);
        };

        this.data.src = this.src;
    }
}