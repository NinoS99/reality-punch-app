'use client'

import { useState, useEffect } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

type EntityType = 'show' | 'season' | 'episode' | 'character'

export default function FavouriteButton({ 
    entityType, 
    entityId 
}: { 
    entityType: EntityType
    entityId: number 
}) {
    const [isFavorite, setIsFavorite] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            try {
                const response = await fetch(
                    `/api/favourites?entityType=${entityType}&entityId=${entityId}`
                )
                if (!response.ok) throw new Error('Failed to fetch favorite status')
                const data = await response.json()
                setIsFavorite(data.isFavorite)
            } catch (error) {
                console.error('Error fetching favorite status:', error)
            } finally {
                setIsLoading(false)
            }
        }
        
        fetchFavoriteStatus()
    }, [entityType, entityId])

    const handleFavorite = async () => {
        setIsLoading(true)
        try {
            const method = isFavorite ? 'DELETE' : 'POST'
            const response = await fetch('/api/favourites', {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ entityType, entityId }),
            })
            
            if (!response.ok) throw new Error('Failed to update favorite')
            setIsFavorite(!isFavorite)
        } catch (error) {
            console.error('Error updating favourite:', error)
        } finally {
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return (
            <div className="p-2 rounded-full bg-white shadow animate-pulse">
                <div className="w-5 h-5"></div>
            </div>
        )
    }

    return (
        <button 
            onClick={handleFavorite}
            className={`p-2 rounded-full shadow hover:bg-gray-100 transition-colors ${
                isFavorite ? 'bg-red-100' : 'bg-green-200'
            }`}
            aria-label={isFavorite ? "Remove from favourites" : "Add to favourites"}
            disabled={isLoading}
        >
            {isFavorite ? (
                <FaHeart className="text-red-500 text-xl" />
            ) : (
                <FaRegHeart className="text-gray-700 text-xl" />
            )}
        </button>
    )
}