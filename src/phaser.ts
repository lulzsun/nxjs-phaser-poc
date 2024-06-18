import "phaser";

import { NXLoaderPlugin } from './plugins/loader/NXLoaderPlugin';
import { NXInputPlugin } from './plugins/input/NXInputPlugin';

Phaser.Plugins.PluginCache.register('Loader', NXLoaderPlugin, 'load');
Phaser.Plugins.PluginCache.register('InputPlugin', NXInputPlugin, 'input');