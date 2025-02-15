import forge from 'node-forge';

const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair(2048);

const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

const encrypt = (data: string, publicKey: forge.pki.rsa.PublicKey) => {
    const encryptedBytes = publicKey.encrypt(data, 'RSA-OAEP', {
        md: forge.md.sha256.create(),
        mgf1: {
            md: forge.md.sha1.create()
        }
    });
    return forge.util.encode64(encryptedBytes);
};

const decrypt = (encryptedData: string) => {
    const encryptedBytes = forge.util.decode64(encryptedData);
    const decryptedData = privateKey.decrypt(encryptedBytes, 'RSA-OAEP', {
            md: forge.md.sha256.create(),
            mgf1: {
                md: forge.md.sha1.create()
            }
        });
    return decryptedData;
}

const getPublicKey = () => {
    return publicKeyPem
        .replace('-----BEGIN PUBLIC KEY-----', '')
        .replace('-----END PUBLIC KEY-----', '')
        .replace(/[\r\n]+/g, '');
}

export default {
    encrypt: encrypt,
    decrypt: decrypt,
    getPublicKey: getPublicKey,
}
