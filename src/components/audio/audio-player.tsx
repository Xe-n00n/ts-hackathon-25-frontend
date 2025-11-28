"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Loader2 } from "lucide-react";
import { generateAudioAction } from "@/app/generate/actions";

interface AudioPlayerProps {
    storyTitle?: string;
    storyContent?: string;
    cachedAudioUrl?: string | null;
    onAudioCached?: (url: string | null) => void;
}

export function AudioPlayer({ storyTitle, storyContent, cachedAudioUrl = null, onAudioCached }: AudioPlayerProps) {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [audioUrl, setAudioUrl] = useState<string | null>(cachedAudioUrl);
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Load audio metadata
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoaded = () => setDuration(audio.duration);
        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);

        audio.addEventListener("loadedmetadata", handleLoaded);
        audio.addEventListener("timeupdate", handleTimeUpdate);

        return () => {
            audio.removeEventListener("loadedmetadata", handleLoaded);
            audio.removeEventListener("timeupdate", handleTimeUpdate);
        };
    }, []);

    const resetAudioState = useCallback(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
            audio.removeAttribute("src");
            audio.load();
        }
        setIsPlaying(false);
        setDuration(0);
        setCurrentTime(0);
        setAudioUrl(null);
        setErrorMessage(null);
    }, []);

    useEffect(() => {
        resetAudioState();
    }, [storyTitle, storyContent, resetAudioState]);

    const ensureAudioReady = useCallback(async () => {
        if (audioUrl || isGenerating) {
            return;
        }

        if (!storyTitle || !storyContent) {
            setErrorMessage("Story data missing");
            return;
        }

        setIsGenerating(true);
        setErrorMessage(null);
        try {
            const result = await generateAudioAction({
                title: storyTitle,
                content: storyContent,
            });
            if (!result.success || !result.audioUrl) {
                throw new Error(result.error || "Failed to generate audio");
            }

            setAudioUrl(result.audioUrl);
            onAudioCached?.(result.audioUrl);
            const audio = audioRef.current;
            if (audio) {
                audio.src = result.audioUrl;
                await new Promise<void>((resolve) => {
                    const handleCanPlay = () => {
                        audio.removeEventListener("canplay", handleCanPlay);
                        resolve();
                    };
                    audio.addEventListener("canplay", handleCanPlay, { once: true });
                    audio.load();
                });
            }
        } catch (error) {
            const message = error instanceof Error ? error.message : "Audio generation failed";
            setErrorMessage(message);
        } finally {
            setIsGenerating(false);
        }
    }, [audioUrl, isGenerating, onAudioCached, storyContent, storyTitle]);

    const togglePlay = useCallback(async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (!audioUrl) {
            await ensureAudioReady();
        }

        if (!audioRef.current || !audioRef.current.src) {
            return;
        }

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (error) {
                setErrorMessage(error instanceof Error ? error.message : "Unable to play audio");
            }
        }
    }, [audioUrl, ensureAudioReady, isPlaying]);

    const handleSeek = (value: number[]) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = value[0];
        setCurrentTime(value[0]);
    };

    const formatTime = (time: number) => {
        if (isNaN(time)) return "0:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    const disableControls = isGenerating || !storyTitle || !storyContent;

    useEffect(() => {
        if (cachedAudioUrl) {
            setAudioUrl(cachedAudioUrl);
            const audio = audioRef.current;
            if (audio) {
                audio.src = cachedAudioUrl;
            }
        } else if (cachedAudioUrl === null) {
            const audio = audioRef.current;
            if (audio) {
                audio.removeAttribute("src");
                audio.load();
            }
            setAudioUrl(null);
        }
    }, [cachedAudioUrl]);

    return (
        <div className="w-full px-3 py-2 rounded-full border bg-dark-red shadow-sm space-y-1.5">
            <audio ref={audioRef} preload="metadata" />

            {/* Controls */}
            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={togglePlay}
                    disabled={disableControls}
                >
                    {isGenerating ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isPlaying ? (
                        <Pause className="h-4 w-4" />
                    ) : (
                        <Play className="h-4 w-4" />
                    )}
                </Button>

                {/* Time info */}
                <span className="text-xs font-base text-white">
                    {formatTime(currentTime)}
                </span>

                {/* Slider */}
                <Slider
                    value={[currentTime]}
                    max={duration || 0}
                    step={0.1}
                    className="flex-1 min-w-[160px] data-[orientation=horizontal]:h-6"
                    onValueChange={handleSeek}
                    disabled={disableControls || !audioUrl}
                />

                {/* Total duration */}
                <span className="text-xs font-base text-white">
                    {formatTime(duration)}
                </span>
            </div>

            {errorMessage && (
                <p className="text-[11px] text-white/80">{errorMessage}</p>
            )}
        </div>
    );
}
