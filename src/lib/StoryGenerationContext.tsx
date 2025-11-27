"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

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

export interface RecentStory {
    title: string;
    content: string;
    createdAt: string;
    format: string;
}

export interface StoryGenerationResponse {
    success: boolean;
    story?: {
        title: string;
        content: string;
        format: string;
    };
    error?: string;
}

interface StoryGenerationContextType {
    storyData: StoryData;
    recentStories: RecentStory[];
    updateChildInfo: (data: Partial<ChildInfo>) => void;
    updateStoryValues: (data: Partial<StoryValues>) => void;
    updateStoryStyle: (data: Partial<StoryStyle>) => void;
    updateCustomDescription: (data: Partial<CustomDescription>) => void;
    updateOutputFormat: (format: StoryData['outputFormat']) => void;
    resetStoryData: () => void;
    generateStory: () => Promise<StoryGenerationResponse>;
    getLatestStoryTitle: () => string | null;
    selectRecentStory: (story: RecentStory) => void;
    isLoading: boolean;
    error: string | null;
}

const initialStoryData: StoryData = {
    childInfo: {
        name: '',
        age: '',
        gender: '',
        favouritePet: '',
        friendsName: '',
        description: '',
    },
    storyValues: {
        goal: '',
        tags: [],
    },
    storyStyle: {
        length: 'medium',
        theme: 'adventure',
        islamicTeaching: true,
    },
    customDescription: {
        personalDescription: '',
        tags: [],
    },
    outputFormat: 'text-only',
};

const StoryGenerationContext = createContext<StoryGenerationContextType | undefined>(undefined);

export function StoryGenerationProvider({ children }: { children: ReactNode }) {
    const [storyData, setStoryData] = useState<StoryData>(initialStoryData);
    const [recentStories, setRecentStories] = useState<RecentStory[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load recent stories from localStorage on mount
    useEffect(() => {
        const savedStories = localStorage.getItem('recentStories');
        if (savedStories) {
            try {
                setRecentStories(JSON.parse(savedStories));
            } catch (error) {
                console.error('Error loading recent stories:', error);
            }
        }
    }, []);

    // Save recent stories to localStorage whenever recentStories changes
    useEffect(() => {
        try {
            localStorage.setItem('recentStories', JSON.stringify(recentStories));
        } catch (error) {
            console.error('Error saving recent stories:', error);
        }
    }, [recentStories]);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('storyGenerationData');
        if (savedData) {
            try {
                setStoryData(JSON.parse(savedData));
            } catch (error) {
                console.error('Error loading saved story data:', error);
                setError('Failed to load saved data');
            }
        }
    }, []);

    // Save data to localStorage whenever storyData changes
    useEffect(() => {
        try {
            localStorage.setItem('storyGenerationData', JSON.stringify(storyData));
        } catch (error) {
            console.error('Error saving story data:', error);
            setError('Failed to save data');
        }
    }, [storyData]);

    // Add story to recent stories
    const addToRecentStories = (story: { title: string; content: string; format: string }) => {
        const newStory: RecentStory = {
            ...story,
            createdAt: new Date().toISOString(),
        };

        setRecentStories(prev => {
            // Remove duplicate titles
            const filteredStories = prev.filter(s => s.title !== story.title);
            // Add new story to the beginning and limit to 5 recent stories
            return [newStory, ...filteredStories].slice(0, 5);
        });
    };

    // Get latest story title
    const getLatestStoryTitle = useMemo(() => {
        return () => {
            return recentStories.length > 0 ? recentStories[0].title : null;
        };
    }, [recentStories]);

    // Memoized update functions to prevent unnecessary re-renders
    const updateChildInfo = useMemo(() => {
        return (data: Partial<ChildInfo>) => {
            setStoryData(prev => ({
                ...prev,
                childInfo: { ...prev.childInfo, ...data }
            }));
        };
    }, []);

    const updateStoryValues = useMemo(() => {
        return (data: Partial<StoryValues>) => {
            setStoryData(prev => ({
                ...prev,
                storyValues: { ...prev.storyValues, ...data }
            }));
        };
    }, []);

    const updateStoryStyle = useMemo(() => {
        return (data: Partial<StoryStyle>) => {
            setStoryData(prev => ({
                ...prev,
                storyStyle: { ...prev.storyStyle, ...data }
            }));
        };
    }, []);

    const updateCustomDescription = useMemo(() => {
        return (data: Partial<CustomDescription>) => {
            setStoryData(prev => ({
                ...prev,
                customDescription: { ...prev.customDescription, ...data }
            }));
        };
    }, []);

    const updateOutputFormat = useMemo(() => {
        return (format: StoryData['outputFormat']) => {
            setStoryData(prev => ({
                ...prev,
                outputFormat: format
            }));
        };
    }, []);

    const resetStoryData = useMemo(() => {
        return () => {
            setStoryData(initialStoryData);
            setError(null);
            localStorage.removeItem('storyGenerationData');
            sessionStorage.removeItem('generatedStory'); // Clear generated story too
        };
    }, []);
    const selectRecentStory = useMemo(() => {
        return (story: RecentStory) => {
            console.log('📖 Selecting recent story:', story.title);
            sessionStorage.setItem('generatedStory', JSON.stringify({
                title: story.title,
                content: story.content,
                format: story.format
            }));
        };
    }, []);

    const generateStory = useMemo(() => {
        return async (): Promise<StoryGenerationResponse> => {
            setIsLoading(true);
            setError(null);

            try {
                console.log('🚀 Generating story with data:', JSON.stringify(storyData, null, 2));

                // Transform the data to match the backend API schema
                const requestBody = {
                    child_information: {
                        name: storyData.childInfo.name,
                        favorite_pet_name: storyData.childInfo.favouritePet || undefined,
                        friends_names: storyData.childInfo.friendsName ? [storyData.childInfo.friendsName] : undefined,
                        age: storyData.childInfo.age ? parseInt(storyData.childInfo.age) : undefined,
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

                console.log('📡 Sending request to API:', JSON.stringify(requestBody, null, 2));

                // Call the actual API
                const response = await fetch('/api/generate-story', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to generate story');
                }

                const apiResponse = await response.json();

                console.log('✅ API Response received:', apiResponse);

                // Save the generated story to sessionStorage for the preview page
                const generatedStory = {
                    title: apiResponse.title,
                    content: apiResponse.text,
                    format: storyData.outputFormat
                };

                sessionStorage.setItem('generatedStory', JSON.stringify(generatedStory));

                // Add to recent stories
                addToRecentStories(generatedStory);


                return {
                    success: true,
                    story: generatedStory
                };
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
                setError(errorMessage);
                console.error('❌ Story generation error:', errorMessage);
                return { success: false, error: errorMessage };
            } finally {
                setIsLoading(false);
            }
        };
    }, [storyData]);

    // Memoized context value to prevent unnecessary re-renders
    const value = useMemo<StoryGenerationContextType>(() => ({
        storyData,
        recentStories,
        updateChildInfo,
        updateStoryValues,
        updateStoryStyle,
        updateCustomDescription,
        updateOutputFormat,
        resetStoryData,
        generateStory,
        getLatestStoryTitle,
        selectRecentStory,
        isLoading,
        error,
    }), [storyData, recentStories, updateChildInfo, updateStoryValues, updateStoryStyle, updateCustomDescription, updateOutputFormat, resetStoryData, generateStory, getLatestStoryTitle, selectRecentStory, isLoading, error]);

    return (
        <StoryGenerationContext.Provider value={value}>
            {children}
        </StoryGenerationContext.Provider>
    );
}

export function useStoryGeneration() {
    const context = useContext(StoryGenerationContext);
    if (context === undefined) {
        throw new Error('useStoryGeneration must be used within a StoryGenerationProvider');
    }
    return context;
}
