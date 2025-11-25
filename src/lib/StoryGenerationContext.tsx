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
        };
    }, []);

    const generateStory = useMemo(() => {
        return async (): Promise<StoryGenerationResponse> => {
            setIsLoading(true);
            setError(null);

            try {
                console.log('🚀 Generating story with data:', JSON.stringify(storyData, null, 2));

                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1000));

                return {
                    success: true,
                    story: {
                        title: "Generated Story",
                        content: "Story content would be here...",
                        format: storyData.outputFormat
                    }
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
        updateChildInfo,
        updateStoryValues,
        updateStoryStyle,
        updateCustomDescription,
        updateOutputFormat,
        resetStoryData,
        generateStory,
        isLoading,
        error,
    }), [storyData, updateChildInfo, updateStoryValues, updateStoryStyle, updateCustomDescription, updateOutputFormat, resetStoryData, generateStory, isLoading, error]);

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
