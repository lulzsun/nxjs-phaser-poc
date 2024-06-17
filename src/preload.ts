import { Window } from 'happy-dom-without-node';
if (globalThis.document === undefined) {
    //  @ts-ignore: dependency injection of 'document' because nxjs does not have a 'document'
    globalThis.document = new Window({
        innerWidth: 1280,
        innerHeight: 720
    }).document;
    //  @ts-ignore: dependency injection of 'process' because nxjs does not have a 'process'
    globalThis.process = undefined;
}