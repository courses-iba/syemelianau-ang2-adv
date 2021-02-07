export class Message {
    private mText: string;
    private mType: string;

    constructor(text: string, type: string = 'primary') {
        this.mText = text;
        this.mType = type;
        setTimeout(() => {
            this.mText = null;
            this.mType = null;
        }, 5000);
    }

    get text(): string {
        return this.mText;
    }

    get type(): string {
        return this.mType;
    }
}
