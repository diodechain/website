export class SiweMessage {
    constructor(param) {
        this.domain = param.domain;
        this.address = param.address;
        this.uri = param.uri;
        this.version = param.version;
        this.chainId = param.chainId;
        this.nonce = param.nonce;
        if (typeof this.chainId === 'string') {
            throw new Error("chainId must be a number");
        }
        this.nonce = this.nonce || crypto.randomUUID();
    }

    toMessage() {
        const headerPrefix = this.scheme
            ? `${this.scheme}://${this.domain}`
            : this.domain;
        const header = `${headerPrefix} wants you to sign in with your Ethereum account:`;
        const uriField = `URI: ${this.uri}`;
        let prefix = [header, this.address].join('\n');
        const versionField = `Version: ${this.version}`;

        if (!this.nonce) {
            this.nonce = crypto.randomUUID();
        }

        const chainField = `Chain ID: ` + this.chainId || '1';

        const nonceField = `Nonce: ${this.nonce}`;

        const suffixArray = [uriField, versionField, chainField, nonceField];

        this.issuedAt = this.issuedAt || new Date().toISOString();

        suffixArray.push(`Issued At: ${this.issuedAt}`);

        if (this.expirationTime) {
            const expiryField = `Expiration Time: ${this.expirationTime}`;

            suffixArray.push(expiryField);
        }

        if (this.notBefore) {
            suffixArray.push(`Not Before: ${this.notBefore}`);
        }

        if (this.requestId) {
            suffixArray.push(`Request ID: ${this.requestId}`);
        }

        if (this.resources) {
            suffixArray.push(
                [`Resources:`, ...this.resources.map(x => `- ${x}`)].join('\n')
            );
        }

        const suffix = suffixArray.join('\n');
        prefix = [prefix, this.statement].join('\n\n');
        if (this.statement !== undefined) {
            prefix += '\n';
        }
        return [prefix, suffix].join('\n');
    }
}