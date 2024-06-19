import { Window } from 'happy-dom-without-node';

//  @ts-expect-error
if (globalThis.document === undefined) {
    //  @ts-expect-error: dependency injection of 'document' because nxjs does not have a 'document'
    globalThis.document = new Window({
        innerWidth: 1280,
        innerHeight: 720
    }).document;
    //  @ts-expect-error: dependency injection of 'process' because nxjs does not have a 'process'
    globalThis.process = undefined;
} else {
    // @ts-expect-error: for running on other devices other than switch
    globalThis.Switch = undefined;
}