export class MockProperties {
    private store: { [key: string]: string } = {};

    getProperty(key: string): string | null {
        return this.store[key] || null;
    }

    setProperty(key: string, value: string): void {
        this.store[key] = value;
    }

    getProperties(): { [key: string]: string } {
        return { ...this.store };
    }

    deleteAllProperties(): void {
        this.store = {};
    }

    deleteProperty(key: string): void {
        delete this.store[key];
    }

    getKeys(): string[] {
        return Object.keys(this.store);
    }
}

export class MockPropertiesService {
    private scriptProperties = new MockProperties();
    private userProperties = new MockProperties();
    private documentProperties = new MockProperties();

    getScriptProperties() {
        return this.scriptProperties;
    }
    getUserProperties() {
        return this.userProperties;
    }
    getDocumentProperties() {
        return this.documentProperties;
    }
}

// Global augmentation to fake 'PropertiesService'
global.PropertiesService = new MockPropertiesService() as any;
