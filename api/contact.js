export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const formData = new URLSearchParams();
        
        // Add all form fields
        for (const [key, value] of Object.entries(req.body)) {
            formData.append(key, value);
        }

        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        return res.status(200).json(data);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}
