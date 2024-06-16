import { Window } from 'happy-dom-without-node';
//@ts-ignore
globalThis.document = new Window().document;
globalThis.process = undefined;