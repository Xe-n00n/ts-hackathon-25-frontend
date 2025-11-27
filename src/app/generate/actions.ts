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
        const response = await fetch('https://ts-hackathon-25-backend.onrender.com/generate', {
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
