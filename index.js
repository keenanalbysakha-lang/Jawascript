#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const kamus = {
    'sediakno': 'let',
    'omongo': 'console.log',
    'yen': 'if',
    'yen_ora': 'else'
};

const fileTarget = process.argv[2];

if (!fileTarget) {
    console.log("Salah lur! Carane: jawascript <nama-file.jw>");
    process.exit(1);
}

if (!fileTarget.endsWith('.jw')) {
    console.log("Eror lur! File kudu duwe ekstensi .jw (Contoh: halo.jw)");
    process.exit(1);
}

const lokasiFile = path.resolve(fileTarget);
let kodeJawa = fs.readFileSync(lokasiFile, 'utf8');

Object.keys(kamus).forEach(kataJawa => {
    const regex = new RegExp(kataJawa, 'g');
    kodeJawa = kodeJawa.replace(regex, kamus[kataJawa]);
});

try {
    eval(kodeJawa);
} catch (error) {
    console.error("Waduh, kodenya eror lur! Periksa sintaksmu.");
    console.error(error.message);
}
