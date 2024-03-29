export class HandledError {
    private static readonly defaultErrorMessage = 'sorry, something went wrong';
    text: string;
    code: number;
    constructor(code?: number, text: string = HandledError.defaultErrorMessage) {
        this.code = code;
        this.text = text;
    }
    
    public toString(): string {
        return this.text;
    }
}
