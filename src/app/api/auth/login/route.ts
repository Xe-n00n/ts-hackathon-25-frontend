/*
=== LOGIN API ROUTE TEMPLATE ===
Replace this dummy implementation with your backend integration.

To connect to your backend:
1. Replace the dummyLoginHandler() with your actual backend call
2. Update the response format to match your API's return structure
3. Add proper error handling for your backend responses

Dummy response format: { "ok": true, user: {...}, token: "..." }
Real response should include user data and authentication token.
*/

import { NextRequest, NextResponse } from 'next/server';

// DUMMY HANDLER - Replace this with your actual backend call
async function dummyLoginHandler(email: string, password: string) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));

    // TODO: Replace with real backend call
    // Example:
    // const response = await fetch('https://your-backend.com/api/auth/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password })
    // });
    // return await response.json();

    // Dummy successful response - simulates finding a user
    return {
        ok: true,
        user: {
            id: 'user123',
            email,
            name: 'John Doe', // Would come from your database
            country: 'United States', // Would come from your database
            createdAt: '2024-01-01T00:00:00.000Z',
        },
        token: 'dummy-jwt-token-67890'
    };
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { email, password } = body;

        // Basic validation (you can expand this)
        if (!email || !password) {
            return NextResponse.json(
                { error: 'Email and password are required' },
                { status: 400 }
            );
        }

        // Call backend handler (replace with real implementation)
        const result = await dummyLoginHandler(email, password);

        // Dummy success response
        return NextResponse.json(result);

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Login failed' },
            { status: 500 }
        );
    }
}
