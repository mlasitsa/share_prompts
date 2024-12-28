"use client"

import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from '@node_modules/next-auth/react'
import { useRouter } from '@node_modules/next/navigation'
import Profile from '@components/Profile'

const MyProfile = () => {

    const {data: session} = useSession()

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
          if (!session?.user.id) return; // Ensure user ID exists
      
          try {
            const response = await fetch(`/api/users/${session.user.id}/posts`);
            if (response.ok) {
              const data = await response.json();
              setPosts(data);
            } else {
              console.error("Failed to fetch posts:", response.statusText);
            }
          } catch (error) {
            console.error("Error fetching posts:", error);
          }
        };
      
        fetchPosts();
      }, [session?.user.id]); // Add session.user.id to dependency array
      

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }


  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
  )
}

export default MyProfile