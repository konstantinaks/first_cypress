export function credentialsApi() {
    const names = [
        "Alex",
        "Viktor",
        "Ivan",
        "Ostap",
        "Igor",
        "Michael",
    ];
    const randomNum = Math.floor(Math.random() * 1000);
    const pickedNameIndex = Math.floor(Math.random() * names.length);
    return `${names[pickedNameIndex]}${randomNum}`;
}

