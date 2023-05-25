interface IInputEventHandler {
    (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >,
        other?: any
    ): void;
}
interface IMouseEventHandler {
    (
        event: React.MouseEvent<
            | HTMLInputElement
            | HTMLDivElement
            | HTMLTextAreaElement
            | HTMLButtonElement,
            MouseEvent
        >,
        other?: any
    ): void;
}

interface IFileEventHandler {
    (data: any, fileInfo: any, error: any): void;
}
export type {IInputEventHandler, IMouseEventHandler, IFileEventHandler};
