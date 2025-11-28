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
    StoryGenerationResponse,
    OutputFormatOption,
    OUTPUT_FORMAT_OPTIONS,
} from './story-types';

interface StoryGenerationContextType {
    storyData: StoryData;
    recentStories: RecentStory[];
    currentStory: GeneratedStory | null;
    getCachedAudioUrl: (title: string | null, content: string | null) => string | null;
    cacheAudioForStory: (title: string | null, content: string | null, url: string | null) => void;
    updateChildInfo: (data: Partial<ChildInfo>) => void;
    updateStoryValues: (data: Partial<StoryValues>) => void;
    updateStoryStyle: (data: Partial<StoryStyle>) => void;
    updateCustomDescription: (data: Partial<CustomDescription>) => void;
    updateOutputFormat: (format: StoryData['outputFormat']) => void;
    updateCurrentStoryContent: (content: string) => void;
    resetStoryData: () => void;
    generateStory: () => Promise<StoryGenerationResponse>;
    getLatestStoryTitle: () => string | null;
    selectRecentStory: (story: RecentStory) => void;
    isLoading: boolean;
    error: string | null;
}

const normalizeOutputFormats = (value: unknown): OutputFormatOption[] => {
    if (Array.isArray(value)) {
        const filtered = value.filter((item): item is OutputFormatOption =>
            typeof item === 'string' && OUTPUT_FORMAT_OPTIONS.includes(item as OutputFormatOption)
        );
        return filtered.length > 0 ? filtered : [OUTPUT_FORMAT_OPTIONS[0]];
    }

    if (typeof value === 'string' && OUTPUT_FORMAT_OPTIONS.includes(value as OutputFormatOption)) {
        return [value as OutputFormatOption];
    }

    return [OUTPUT_FORMAT_OPTIONS[0]];
};

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
    outputFormat: [OUTPUT_FORMAT_OPTIONS[0]],
};

const StoryGenerationContext = createContext<StoryGenerationContextType | undefined>(undefined);

const AUDIO_CACHE_STORAGE_KEY = 'storyAudioCache';

export function StoryGenerationProvider({ children }: { children: ReactNode }) {
    const [storyData, setStoryData] = useState<StoryData>(initialStoryData);
    const [recentStories, setRecentStories] = useState<RecentStory[]>([]);
    const [currentStory, setCurrentStory] = useState<GeneratedStory | null>(null);
    const [audioCache, setAudioCache] = useState<Record<string, { url: string; contentSignature: string }>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasLoadedRecentStories, setHasLoadedRecentStories] = useState(false);

    // Load recent stories from localStorage on mount
    useEffect(() => {
        const savedStories = localStorage.getItem('recentStories');
        if (savedStories) {
            try {
                const parsedStories: RecentStory[] = JSON.parse(savedStories);
                setRecentStories(parsedStories.map(story => ({
                    ...story,
                    format: normalizeOutputFormats(story.format),
                })));
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
                const parsedData = JSON.parse(savedData);
                setStoryData({
                    ...parsedData,
                    outputFormat: normalizeOutputFormats(parsedData?.outputFormat),
                });
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
                const parsedStory = JSON.parse(storedStory);
                setCurrentStory({
                    ...parsedStory,
                    format: normalizeOutputFormats(parsedStory?.format),
                });
            } catch (error) {
                console.error('Error loading current story:', error);
            }
        }
    }, []);

    useEffect(() => {
        const storedAudio = sessionStorage.getItem(AUDIO_CACHE_STORAGE_KEY);
        if (storedAudio) {
            try {
                const parsed: Record<string, { url: string; contentSignature?: string } | string> = JSON.parse(storedAudio);
                const normalizedEntries = Object.entries(parsed).reduce<Record<string, { url: string; contentSignature: string }>>((acc, [title, value]) => {
                    if (typeof value === 'string') {
                        acc[title] = { url: value, contentSignature: '' };
                    } else if (value && typeof value === 'object' && 'url' in value) {
                        acc[title] = {
                            url: value.url,
                            contentSignature: value.contentSignature ?? '',
                        };
                    }
                    return acc;
                }, {});
                setAudioCache(normalizedEntries);
            } catch (error) {
                console.error('Error loading audio cache:', error);
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

    useEffect(() => {
        try {
            sessionStorage.setItem(AUDIO_CACHE_STORAGE_KEY, JSON.stringify(audioCache));
        } catch (error) {
            console.error('Error saving audio cache:', error);
        }
    }, [audioCache]);

    // Add story to recent stories
    const addToRecentStories = useCallback((story: GeneratedStory) => {
        const normalizedStory: GeneratedStory = {
            ...story,
            format: normalizeOutputFormats(story.format),
        };

        const newStory: RecentStory = {
            ...normalizedStory,
            createdAt: new Date().toISOString(),
        };

        setRecentStories(prev => {
            // Remove duplicate titles
            const filteredStories = prev.filter(s => s.title !== story.title);
            // Add new story to the beginning and limit to 5 recent stories
            return [newStory, ...filteredStories].slice(0, 5);
        });
    }, []);

    const buildAudioSignature = useCallback((content: string | null) => content ?? '', []);

    const getCachedAudioUrl = useCallback((title: string | null, content: string | null) => {
        if (!title) {
            return null;
        }
        const entry = audioCache[title];
        if (!entry) {
            return null;
        }
        const signature = buildAudioSignature(content);
        if (entry.contentSignature !== signature) {
            return null;
        }
        return entry.url;
    }, [audioCache, buildAudioSignature]);

    const cacheAudioForStory = useCallback((title: string | null, content: string | null, url: string | null) => {
        if (!title) {
            return;
        }

        setAudioCache(prev => {
            const next = { ...prev };
            if (url) {
                next[title] = {
                    url,
                    contentSignature: buildAudioSignature(content),
                };
            } else {
                delete next[title];
            }
            return next;
        });
    }, [buildAudioSignature]);

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
                outputFormat: normalizeOutputFormats(format)
            }));
        };
    }, []);

    const updateCurrentStoryContent = useCallback((content: string) => {
        setCurrentStory(prev => {
            if (!prev) {
                return prev;
            }

            const updatedStory: GeneratedStory = {
                ...prev,
                content,
            };

            sessionStorage.setItem('generatedStory', JSON.stringify(updatedStory));

            setRecentStories(prevStories => prevStories.map(story =>
                story.title === updatedStory.title
                    ? { ...story, content }
                    : story
            ));

            return updatedStory;
        });
    }, []);

    const resetStoryData = useMemo(() => {
        return () => {
            setStoryData(initialStoryData);
            setError(null);
            localStorage.removeItem('storyGenerationData');
            sessionStorage.removeItem('generatedStory'); // Clear generated story too
            sessionStorage.removeItem(AUDIO_CACHE_STORAGE_KEY);
            setAudioCache({});
        };
    }, []);
    const selectRecentStory = useCallback((story: RecentStory) => {
        const serializedStory: GeneratedStory = {
            title: story.title,
            content: story.content,
            format: normalizeOutputFormats(story.format)
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
                const sanitizedStory: GeneratedStory = {
                    ...result.story,
                    format: normalizeOutputFormats(result.story.format),
                };

                sessionStorage.setItem('generatedStory', JSON.stringify(sanitizedStory));
                setCurrentStory(sanitizedStory);
                addToRecentStories(sanitizedStory);
                return { success: true, story: sanitizedStory };
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
        getCachedAudioUrl,
        cacheAudioForStory,
        updateChildInfo,
        updateStoryValues,
        updateStoryStyle,
        updateCustomDescription,
        updateOutputFormat,
        updateCurrentStoryContent,
        resetStoryData,
        generateStory,
        getLatestStoryTitle,
        selectRecentStory,
        isLoading,
        error,
    }), [storyData, recentStories, currentStory, getCachedAudioUrl, cacheAudioForStory, updateChildInfo, updateStoryValues, updateStoryStyle, updateCustomDescription, updateOutputFormat, updateCurrentStoryContent, resetStoryData, generateStory, getLatestStoryTitle, selectRecentStory, isLoading, error]);

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
