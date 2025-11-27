"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react';
import { generateStoryAction } from '@/app/generate/actions';
import {
    ChildInfo,
    StoryValues,
    StoryStyle,
    CustomDescription,
    StoryData,
    GeneratedStory,
    RecentStory,
    StoryGenerationResponse
} from './story-types';

interface StoryGenerationContextType {
    storyData: StoryData;
    recentStories: RecentStory[];
    currentStory: GeneratedStory | null;
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
    const [currentStory, setCurrentStory] = useState<GeneratedStory | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasLoadedRecentStories, setHasLoadedRecentStories] = useState(false);

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
        setHasLoadedRecentStories(true);
    }, []);

    // Save recent stories to localStorage whenever recentStories changes
    useEffect(() => {
        if (!hasLoadedRecentStories) {
            return;
        }
        try {
            localStorage.setItem('recentStories', JSON.stringify(recentStories));
        } catch (error) {
            console.error('Error saving recent stories:', error);
        }
    }, [recentStories, hasLoadedRecentStories]);

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

    // Load currently selected story from sessionStorage on mount
    useEffect(() => {
        const storedStory = sessionStorage.getItem('generatedStory');
        if (storedStory) {
            try {
                setCurrentStory(JSON.parse(storedStory));
            } catch (error) {
                console.error('Error loading current story:', error);
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
    const addToRecentStories = useCallback((story: GeneratedStory) => {
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
    }, []);

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
    const selectRecentStory = useCallback((story: RecentStory) => {
        const serializedStory: GeneratedStory = {
            title: story.title,
            content: story.content,
            format: story.format
        };
        sessionStorage.setItem('generatedStory', JSON.stringify(serializedStory));
        setCurrentStory(serializedStory);
    }, []);

    const generateStory = useCallback(async (): Promise<StoryGenerationResponse> => {
        setIsLoading(true);
        setError(null);

        try {
            const result = await generateStoryAction(storyData);

            if (result.success && result.story) {
                sessionStorage.setItem('generatedStory', JSON.stringify(result.story));
                setCurrentStory(result.story);
                addToRecentStories(result.story);
                return result;
            }

            const message = result.error || 'Failed to generate story';
            setError(message);
            return { success: false, error: message };
        } catch (error) {
            const message = error instanceof Error ? error.message : 'An unknown error occurred';
            setError(message);
            return { success: false, error: message };
        } finally {
            setIsLoading(false);
        }
    }, [storyData, addToRecentStories]);

    // Memoized context value to prevent unnecessary re-renders
    const value = useMemo<StoryGenerationContextType>(() => ({
        storyData,
        recentStories,
        currentStory,
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
    }), [storyData, recentStories, currentStory, updateChildInfo, updateStoryValues, updateStoryStyle, updateCustomDescription, updateOutputFormat, resetStoryData, generateStory, getLatestStoryTitle, selectRecentStory, isLoading, error]);

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
