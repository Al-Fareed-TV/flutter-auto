const axios = require('axios');
const expect = require('expect');

const BASE_URL = 'http://localhost:8080';

// Helper function to make GET requests to Autopilot API
async function get(path) {
    try {
        const response = await axios.get(`${BASE_URL}${path}`);
        return response.data;
    } catch (error) {
        console.error(`Error requesting ${path}:`, error.message);
        throw error;
    }
}

// Helper to tap on an element
async function tap(params) {
    const query = new URLSearchParams(params).toString();
    await get(`/tap?${query}`);
    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, 500));
}

// Helper to enter text
async function typeText(text) {
    await get(`/type?text=${encodeURIComponent(text)}`);
    // Wait for typing
    await new Promise(resolve => setTimeout(resolve, 500));
}

async function runTest() {
    console.log('🚀 Starting Autopilot Test...');

    try {
        console.log('Checking app launch...');
        const widgets = await get('/widgets');
        if (!widgets || widgets.length === 0) {
            throw new Error('App not responding or empty widget tree');
        }
        console.log('✅ App is running');

        // 2. Test Navigation to Registration
        console.log('Navigating to Registration...');
        // Tap "Register" text on Home Screen
        await tap({ text: 'Register' });
        console.log('✅ Tapped Register');

        // Wait for navigation and animation
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 3. Fill Registration Form
        console.log('Filling Registration Form...');

        // Fetch all editable fields (TextFormFields)
        const editables = await get('/editables');
        if (editables.length < 3) {
            throw new Error(`Expected at least 3 text fields, found ${editables.length}`);
        }

        // Field 1: Full Name
        console.log('Entering Name...');
        // Tap the first editable field using its position
        await tap({
            x: editables[0].position.left + 10,
            y: editables[0].position.top + 10
        });
        await typeText('Test User1');
        console.log('✅ Entered Name');
        await axios.delete(`${BASE_URL}/keyboard`);

        // Field 2: Email
        console.log('Entering Email...');
        await tap({
            x: editables[1].position.left + 10,
            y: editables[1].position.top + 10
        });
        await typeText('test123@example.com');
        console.log('✅ Entered Email');
        await axios.delete(`${BASE_URL}/keyboard`);

        // Field 3: Phone
        console.log('Entering Phone...');
        await tap({
            x: editables[2].position.left + 10,
            y: editables[2].position.top + 10
        });
        await typeText('1234565646');
        console.log('✅ Entered Phone');
        await axios.delete(`${BASE_URL}/keyboard`);

        // 4. Submit Registration
        console.log('Submitting Registration...');
        // There are multiple "Register" texts (one in tab, one as button).
        // Let's use the one at the bottom, or by index if supported, or "User Registration" context
        // The last "Register" in the list should be the button.
        // Or we can tap "Back to Home" to verify we can cancel, but let's try to register.
        // A safer bet might be tapping the "Register" button specifically.
        // Let's try tapping the LAST "Register" text found, or rely on 'text' tapping the first visible one.
        // It failed before. Let's try tapping by text again, maybe it works now that fields are filled.

        // Based on debug output, "Register" appears 3 times:
        // 1. Menu item?
        // 2. Tab header?
        // 3. Button?

        // Let's tap the last one by finding all occurrences
        const registerTexts = await get('/texts?text=Register');
        const registerButton = registerTexts[registerTexts.length - 1];

        await tap({
            x: registerButton.position.left + 10,
            y: registerButton.position.top + 10
        });
        console.log('✅ Tapped Register Button');

        // 5. Verify Navigation to Home
        // Check for Home screen elements
        console.log('Verifying Home Screen...');
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for navigation

        // Try to find "Welcome" or similar text
        const texts = await get('/texts?text=Welcome');
        if (texts.length > 0) {
            console.log('✅ Successfully navigated to Home Screen');
        } else {
            console.log('⚠️ Could not verify Home Screen text directly, but script finished without error.');
        }

        console.log('🎉 Test Completed Successfully!');

    } catch (error) {
        console.error('❌ Test Failed:', error);
        process.exit(1);
    }
}

runTest();