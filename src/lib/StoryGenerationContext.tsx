"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
    updateChildInfo: (data: Partial<ChildInfo>) => void;
    updateStoryValues: (data: Partial<StoryValues>) => void;
    updateStoryStyle: (data: Partial<StoryStyle>) => void;
    updateCustomDescription: (data: Partial<CustomDescription>) => void;
    updateOutputFormat: (format: StoryData['outputFormat']) => void;
    resetStoryData: () => void;
    generateStory: () => Promise<StoryGenerationResponse>;
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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem('storyGenerationData');
        if (savedData) {
            try {
                setStoryData(JSON.parse(savedData));
            } catch (error) {
                console.error('Error loading saved story data:', error);
            }
        }
    }, []);

    // Save data to localStorage whenever storyData changes
    useEffect(() => {
        localStorage.setItem('storyGenerationData', JSON.stringify(storyData));
    }, [storyData]);

    const updateChildInfo = (data: Partial<ChildInfo>) => {
        setStoryData(prev => ({
            ...prev,
            childInfo: { ...prev.childInfo, ...data }
        }));
    };

    const updateStoryValues = (data: Partial<StoryValues>) => {
        setStoryData(prev => ({
            ...prev,
            storyValues: { ...prev.storyValues, ...data }
        }));
    };

    const updateStoryStyle = (data: Partial<StoryStyle>) => {
        setStoryData(prev => ({
            ...prev,
            storyStyle: { ...prev.storyStyle, ...data }
        }));
    };

    const updateCustomDescription = (data: Partial<CustomDescription>) => {
        setStoryData(prev => ({
            ...prev,
            customDescription: { ...prev.customDescription, ...data }
        }));
    };

    const updateOutputFormat = (format: StoryData['outputFormat']) => {
        setStoryData(prev => ({
            ...prev,
            outputFormat: format
        }));
    };

    const resetStoryData = () => {
        setStoryData(initialStoryData);
        localStorage.removeItem('storyGenerationData');
    };

    const generateStory = async (): Promise<StoryGenerationResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            console.log('🚀 Generating story with data:', JSON.stringify(storyData, null, 2));

            // const response = await fetch('/api/generate-story', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(storyData),
            // });

            // if (!response.ok) {
            //     throw new Error(`HTTP error! status: ${response.status}`);
            // }

            // const result = await response.json();
            // console.log('✅ Story generation result:', result);
            // return result;
            return null as any; // Placeholder to avoid TS error
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setError(errorMessage);
            console.error('❌ Story generation error:', errorMessage);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const value: StoryGenerationContextType = {
        storyData,
        updateChildInfo,
        updateStoryValues,
        updateStoryStyle,
        updateCustomDescription,
        updateOutputFormat,
        resetStoryData,
        generateStory,
        isLoading,
        error,
    };

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
