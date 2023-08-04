import forge from "node-forge";
const encTestKey = process.env.ENCRYPTION_KEY || "";

export async function encrypt( payload:any) {
    const text = JSON.stringify(payload);
    const cipher = forge.cipher.createCipher(
        "3DES-ECB",
        forge.util.createBuffer(encTestKey)
    );
    cipher.start({iv: ""});
    cipher.update(forge.util.createBuffer(text, "utf8"));
    cipher.finish();
    const encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
}