"use client"
import { fetchUser } from '@/lib/fetchUser';
import React from 'react'

export default function ProfilePage() {
  
  async function fetchdata() {
    const accessToken = localStorage.getItem('accessToken');
    
    await fetchUser(accessToken);
  }
  
  return (
    <div onClick={fetchdata}>ProfilePage</div>
  )
}
