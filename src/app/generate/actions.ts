'use server';

import { StoryData } from '@/lib/story-types';

export interface GenerateStoryResult {
    success: boolean;
    story?: {
        title: string;
        content: string;
        format: StoryData['outputFormat'];
    };
    error?: string;
}

export interface GenerateAudioResult {
    success: boolean;
    audioUrl?: string;
    error?: string;
}

export interface GenerateIllustrationsResult {
    success: boolean;
    images?: string[];
    error?: string;
}

interface BackendRequestBody {
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

interface BackendResponse {
    title: string;
    text: string;
}

interface IllustrationResponse {
    images: string[];
}

function mapStoryDataToRequest(storyData: StoryData): BackendRequestBody {
    return {
        child_information: {
            name: storyData.childInfo.name,
            favorite_pet_name: storyData.childInfo.favouritePet || undefined,
            friends_names: storyData.childInfo.friendsName
                ? storyData.childInfo.friendsName.split(',').map(name => name.trim()).filter(Boolean)
                : undefined,
            age: storyData.childInfo.age ? parseInt(storyData.childInfo.age, 10) : undefined,
            gender: storyData.childInfo.gender || undefined,
            description: storyData.childInfo.description || undefined,
        },
        story_goal: storyData.storyValues.goal,
        tags: storyData.storyValues.tags,
        story_length: storyData.storyStyle.length,
        story_theme: storyData.storyStyle.theme,
        include_islamic_teaching: storyData.storyStyle.islamicTeaching,
        additional_instructions: storyData.customDescription.personalDescription || undefined,
    };
}

export async function generateStoryAction(storyData: StoryData): Promise<GenerateStoryResult> {
    if (!storyData.childInfo.name) {
        return { success: false, error: 'Child name is required' };
    }

    const requestBody = mapStoryDataToRequest(storyData);

    try {
        const response = await fetch('https://ts-hackathon-25-backend.onrender.com/story/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody),
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: 'Backend error' }));
            return { success: false, error: errorData.error || 'Failed to generate story' };
        }

        const data: BackendResponse = await response.json();

        return {
            success: true,
            story: {
                title: data.title,
                content: data.text,
                format: [...storyData.outputFormat],
            },
        };
    } catch (error) {
        console.error('Failed to call generateStoryAction', error);
        return { success: false, error: 'Unexpected error generating story' };
    }
}

export async function generateAudioAction(input: { title: string; content: string; }): Promise<GenerateAudioResult> {
    if (!input.title || !input.content) {
        return { success: false, error: 'Missing story data for audio generation' };
    }
    try {
        const params = new URLSearchParams({
            title: input.title,
            text: input.content,
        });
        const response = await fetch(`https://ts-hackathon-25-backend.onrender.com/narration/stream?${params.toString()}`, {
            method: 'GET',
            cache: 'no-store',
        });
        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            console.error('Audio generation failed:', errorText);
            return { success: false, error: 'Failed to generate audio' };
        }

        const arrayBuffer = await response.arrayBuffer();
        if (!arrayBuffer.byteLength) {
            return { success: false, error: 'No audio data received' };
        }

        const base64Audio = Buffer.from(arrayBuffer).toString('base64');
        const contentType = response.headers.get('content-type') || 'audio/mpeg';
        const dataUrl = `data:${contentType};base64,${base64Audio}`;

        return { success: true, audioUrl: dataUrl };
    } catch (error) {
        console.error('Failed to call generateAudioAction', error);
        return { success: false, error: 'Unexpected error generating audio' };
    }
}

export async function generateIllustrationsAction(input: { title: string; content: string; }): Promise<GenerateIllustrationsResult> {
    if (!input.title || !input.content) {
        return { success: false, error: 'Missing story data for illustrations' };
    }

    try {
        const response = await fetch('https://ts-hackathon-25-backend.onrender.com/generate-illustrations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: input.title,
                text: input.content,
            }),
            cache: 'no-store',
        });

        if (!response.ok) {
            const errorPayload = await response.json().catch(() => ({ error: 'Failed to fetch illustrations' }));
            return { success: false, error: errorPayload.error || 'Failed to fetch illustrations' };
        }

        const data: IllustrationResponse = await response.json();
        const images = Array.isArray(data.images) ? data.images : [];
        return { success: true, images };
    } catch (error) {
        console.error('Failed to call generateIllustrationsAction', error);
        return { success: false, error: 'Unexpected error generating illustrations' };
    }
}
