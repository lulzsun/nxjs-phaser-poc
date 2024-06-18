import { name } from '../../../../package.json';

export class NXImageFile extends Phaser.Loader.FileTypes.ImageFile {
    declare cache: Phaser.Textures.TextureManager;
    declare data: HTMLImageElement;

    constructor(
        loader: Phaser.Loader.LoaderPlugin, 
        key: string | Phaser.Types.Loader.FileTypes.ImageFileConfig,
        url?: string | string[],
        xhrSettings?: Phaser.Types.Loader.XHRSettingsObject,
        frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig
    ) {
        loader.imageLoadType = 'HTMLImageElement';
        super(loader, key, url, xhrSettings, frameConfig);
    }

    loadImage(): void {
        this.state = Phaser.Loader.FILE_LOADING;

        this.src = 'sdmc:/switch/' + name + '/' + this.url;

        this.data = new Image();

        // this.data.crossOrigin = this.crossOrigin;

        var _this = this;

        this.data.onload = function () {
            _this.state = Phaser.Loader.FILE_LOADED;

            _this.loader.nextFile(_this, true);
        };

        this.data.onerror = function ()
        {
            _this.loader.nextFile(_this, false);
        };

        this.data.src = this.src;
    }
}