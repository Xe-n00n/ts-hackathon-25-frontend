import { NextRequest, NextResponse } from 'next/server';

// Backend API request schema
interface GenerateStoryRequest {
    child_information: {
        name: string;
        favorite_pet_name?: string;
        any_of?: string;
        friends_names?: string[];
        age?: number;
        gender?: string;
        description?: string;
    };
    story_goal: string;
    tags?: string[];
    story_length: string;
    story_theme: string;
    include_islamic_teaching: boolean;
    additional_instructions?: string;
}

// Backend API response schema
interface GenerateStoryResponse {
    title: string;
    text: string;
}

export async function POST(request: NextRequest) {
    try {
        const requestData: GenerateStoryRequest = await request.json();

        // Basic validation
        if (!requestData.child_information.name) {
            console.log('❌ Validation failed - missing required fields');
            return NextResponse.json(
                { error: 'Child name is required' },
                { status: 400 }
            );
        }

        // Call the actual backend API
        const backendResponse = await fetch('https://ts-hackathon-25-backend.onrender.com/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData),
        });

        if (!backendResponse.ok) {
            const errorData = await backendResponse.json().catch(() => ({ error: 'Unknown error' }));
            return NextResponse.json(
                { error: errorData.error || 'Backend API error' },
                { status: backendResponse.status }
            );
        }

        const apiResponse: GenerateStoryResponse = await backendResponse.json();


        return NextResponse.json(apiResponse);
    } catch (error) {
        console.error('❌ Error generating story:', error);
        return NextResponse.json(
            { error: 'Failed to generate story' },
            { status: 500 }
        );
    }
}
