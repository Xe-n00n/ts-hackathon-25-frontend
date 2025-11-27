export interface ChildInfo {
    name: string;
    age: string;
    gender: string;
    favouritePet: string;
    friendsName: string;
    description: string;
}

export interface StoryValues {
    goal: string;
    tags: string[];
}

export interface StoryStyle {
    length: 'short' | 'medium' | 'long';
    theme: 'adventure' | 'home' | 'school';
    islamicTeaching: boolean;
}

export interface CustomDescription {
    personalDescription: string;
    tags: string[];
}

export interface StoryData {
    childInfo: ChildInfo;
    storyValues: StoryValues;
    storyStyle: StoryStyle;
    customDescription: CustomDescription;
    outputFormat: 'text-only' | 'illustrated-digital-book' | 'audio-version' | 'printable-pdf';
}

export interface GeneratedStory {
    title: string;
    content: string;
    format: string;
}

export interface RecentStory extends GeneratedStory {
    createdAt: string;
}

export interface StoryGenerationResponse {
    success: boolean;
    story?: GeneratedStory;
    error?: string;
}
