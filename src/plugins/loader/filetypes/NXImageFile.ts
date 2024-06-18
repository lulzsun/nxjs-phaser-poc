import { ChannelOrder, decodePng } from 'image-in-browser';

export class NXImageFile extends Phaser.Loader.FileTypes.ImageFile {
    declare cache: Phaser.Textures.TextureManager;
    declare data: OffscreenCanvas;

    constructor(
        loader: Phaser.Loader.LoaderPlugin, 
        key: string | Phaser.Types.Loader.FileTypes.ImageFileConfig,
        url?: string | string[],
        xhrSettings?: Phaser.Types.Loader.XHRSettingsObject,
        frameConfig?: Phaser.Types.Loader.FileTypes.ImageFrameConfig
    ) {
        super(loader, key, url, xhrSettings, frameConfig);
    }

    load(): void {
        if (this.state === Phaser.Loader.FILE_POPULATED) {
            //  Can happen for example in a JSONFile if they've provided a JSON object instead of a URL
            this.loader.nextFile(this, true);
        }
        else {
            this.state = Phaser.Loader.FILE_LOADING;

            this.src = Phaser.Loader.GetURL(this, this.loader.baseURL);

            if (!this.src) {
                throw new Error('URL Error in File: ' + this.key + ' from: ' + this.url);
            }

            if (this.src.indexOf('data:') === 0) {
                this.base64 = true;
            }

            if (Switch === undefined) {
                this.xhrLoader = Phaser.Loader.XHRLoader(this, this.loader.xhr);
                return;
            }

            this.onProcess();
        }
    }

    async onProcess(): Promise<void> {
        if (Switch === undefined) {
            super.onProcess();
            return;
        }
        this.state = Phaser.Loader.FILE_PROCESSING;

        const buffer = Switch.readFileSync('sdmc:/switch/nxjs-phaser-poc/' + this.url as string);
        const img = decodePng({ data: buffer as Uint8Array })!;
        
        this.data = new OffscreenCanvas(img.width, img.height);
        const ctx = this.data.getContext('2d')!;
        
        // Creating ImageData from MemoryImage
        const imageData = ctx.createImageData(img.width, img.height);
        const rawBytes = img.getBytes({ order: ChannelOrder.rgba });
        imageData.data.set(rawBytes);

        // Putting ImageData into context
        ctx.putImageData(imageData, 0, 0);
        this.onProcessComplete();

        this.state = Phaser.Loader.FILE_LOADED;
        this.loader.nextFile(this, false);
    }
}