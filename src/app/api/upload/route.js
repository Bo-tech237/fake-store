import fs from 'fs';
import { NextResponse } from 'next/server';

//export const config = { api: { bodyParser: false } };

export async function POST(request) {
    const formData = await request.formData();
    console.log('test', formData);
    const formDataEntryValues = Array.from(formData.values());
    for (const formDataEntryValue of formDataEntryValues) {
        if (
            typeof formDataEntryValue === 'object' &&
            'arrayBuffer' in formDataEntryValue
        ) {
            const file = formDataEntryValue;
            const buffer = Buffer.from(await file.arrayBuffer());
            fs.writeFileSync(`public/${file.name}`, buffer);
        }
    }
    return NextResponse.json({ success: true });
}
