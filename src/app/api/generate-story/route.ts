import { NextRequest, NextResponse } from 'next/server';
import { StoryData, StoryGenerationResponse } from '@/lib/StoryGenerationContext';

export async function POST(request: NextRequest) {
    try {
        const storyData: StoryData = await request.json();

        console.log('📝 API received story data:', JSON.stringify(storyData, null, 2));

        // Basic validation
        if (!storyData.childInfo.name || !storyData.childInfo.age) {
            console.log('❌ Validation failed - missing required fields');
            return NextResponse.json(
                { success: false, error: 'Child name and age are required' },
                { status: 400 }
            );
        }

        // TODO: Integrate with your AI story generation service
        // This is a placeholder implementation
        console.log('🤖 Generating story using template...');
        const mockStory = await generateStory(storyData);

        const response: StoryGenerationResponse = {
            success: true,
            story: {
                title: `The Adventures of ${storyData.childInfo.name}`,
                content: mockStory,
                format: storyData.outputFormat
            }
        };

        console.log('✅ API sending response:', JSON.stringify(response, null, 2));

        return NextResponse.json(response);
    } catch (error) {
        console.error('❌ Error generating story:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to generate story' },
            { status: 500 }
        );
    }
}

// Placeholder story generation function
// Replace this with your actual AI service integration
async function generateStory(storyData: StoryData): Promise<string> {
    const { childInfo, storyValues, storyStyle, customDescription } = storyData;

    // This is a very basic template - replace with your AI story generation
    let story = `Once upon a time, there was a wonderful child named ${childInfo.name}. `;
    story += `${childInfo.name} was ${childInfo.age} years old and loved ${childInfo.favouritePet}. `;

    if (childInfo.friendsName) {
        story += `${childInfo.name} had many friends including ${childInfo.friendsName}. `;
    }

    story += `One day, ${childInfo.name} embarked on a ${storyStyle.length} ${storyStyle.theme} adventure. `;

    if (storyValues.goal) {
        story += `The goal of this story was to help ${childInfo.name} learn about ${storyValues.goal}. `;
    }

    if (customDescription.personalDescription) {
        story += `Additionally, ${customDescription.personalDescription} `;
    }

    if (storyStyle.islamicTeaching) {
        story += `This story also includes important Islamic teachings and values. `;
    }

    story += `And they all lived happily ever after!`;

    return story;
}
