import { NXImageFile } from "./filetypes/NXImageFile";
Phaser.Loader.FileTypesManager.destroy();

export class NXLoaderPlugin extends Phaser.Loader.LoaderPlugin {
    constructor(scene: Phaser.Scene) {
        Phaser.Loader.FileTypesManager.register('image', 
            (
                key: string | Phaser.Types.Loader.FileTypes.ImageFileConfig | Phaser.Types.Loader.FileTypes.ImageFileConfig[], 
                url?: string | string[],
            ) => {
                if (Array.isArray(key)) {
                    for (var i = 0; i < key.length; i++) {
                        this.addFile(new NXImageFile(this, key[i]));
                    }
                }
                else {
                    this.addFile(new NXImageFile(this, key, url));
                }
                return this;
            }
        );
        super(scene);
    }
}