const xlsx = require('xlsx');
const twilio = require('twilio');

// Twilio credentials
const accountSid = 'ACdbb30882658a67997810e14916ce0380';
const authToken = '5bd6fbe076168a0276ccb5902af414c5';
const client = twilio(accountSid, authToken);

// Function to read Excel file and return an array of contacts
function readExcelFile(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    return xlsx.utils.sheet_to_json(sheet);
}

// Function to send SMS messages to all contacts
async function sendMessages(filePath) {
    const contacts = readExcelFile(filePath);
    for (const contact of contacts) {
        try {
            const message = await client.messages.create({
                body: contact.Message,
                from: '+18484209002', // Your Twilio phone number
                to: contact.Phone
            });
            console.log(`Message sent to ${contact.Phone}: ${message.sid}`);
        } catch (error) {
            console.error(`Failed to send message to ${contact.Phone}: ${error.message}`);
        }
    }
}

// Replace 'contacts.xlsx' with the path to your Excel file
sendMessages('DataAxel_Data.xlsx');

    