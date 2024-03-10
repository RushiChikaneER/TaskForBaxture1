'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Text, SimpleGrid, Button, rem } from '@mantine/core';
import { IconUsersPlus, IconTrash, Star } from '@tabler/icons-react'; // Import the Star icon

function generateAvatarUrl(name) {
    const baseUrl = 'https://api.dicebear.com/7.x/initials/svg';
    const seed = encodeURIComponent(name);
    return `${baseUrl}?seed=${seed}`;
  }

export function MyTemplate() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setData(response.data);
        setLoading(false);
        // Initialize the followed state with false for each user
        setFollowed(new Array(response.data.length).fill(false));
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleFollow = (index) => {
    const newData = [...followed];
    newData[index] = !newData[index]; // Toggle the followed state
    setFollowed(newData);
  };

  const handleDelete = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    const newFollowed = [...followed];
    newFollowed.splice(index, 1);
    setFollowed(newFollowed);
  };

  return (
    <Container size="xl">
      
      {loading ? (
        <Text>Loading...</Text>
      ) : error ? (
        <Text>Error: {error}</Text>
      ) : (
        <SimpleGrid cols={{ xs: 1, sm: 2, md: 3, lg: 4 }} gutter="lg">
          {data.map((user, index) => (
            <div key={user.id} style={{
              border: '1px solid #ccc',
              padding: '20px',
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
            }}>
                <div style={{ textAlign: 'center' }}>
                <img
                  src={generateAvatarUrl(user.name)}
                  alt="Avatar"
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%', // Make the image circular
                    objectFit: 'cover', // Ensure the image covers the circle without stretching
                    margin: 'auto', // Center the image horizontally
                    marginBottom: '10px',
                  }}
                />
              </div>
              {/* Render the user's name with a star icon if followed */}
              <Text style={{ fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
                {followed[index] ? (
                  <>
                    {user.name} <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-star" width={24} height={24} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
</svg>
                  </>
                ) : (
                  user.name
                )}
              </Text>
              <Text>
  <span style={{ color: 'black' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-at"
      width={15}
      height={15}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" />
    </svg>
    <a
      href={`mailto:${user.email}`}
      style={{ color: 'black', textDecoration: 'none' }}
      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
    >
      {user.email}
    </a>
  </span>
</Text>
<Text>
  <span style={{ color: 'black' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-phone-call"
      width={15}
      height={15}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
      <path d="M15 7a2 2 0 0 1 2 2" />
      <path d="M15 3a6 6 0 0 1 6 6" />
    </svg>
    <a
      href={`tel:${user.phone}`}
      style={{ color: 'black', textDecoration: 'none' }}
      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
    >
      {user.phone}
    </a>
  </span>
</Text>
<Text>
  <span style={{ color: 'black' }}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-world"
      width={15}
      height={15}
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M3.6 9h16.8" />
      <path d="M3.6 15h16.8" />
      <path d="M11.5 3a17 17 0 0 0 0 18" />
      <path d="M12.5 3a17 17 0 0 1 0 18" />
    </svg>
    <a
      href={user.website}
      style={{ color: 'black', textDecoration: 'none' }}
      onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
      onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
    >
      {user.website}
    </a>
  </span>
</Text>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button
                  leftSection={<IconUsersPlus style={{ width: rem(16), height: rem(16) }} />}
                  style={{ flex: 1, marginRight: '10px' }}
                  onClick={() => handleFollow(index)}
                >
                  {followed[index] ? 'Unfollow' : 'Follow'}
                </Button>
                <Button
                  leftSection={<IconTrash size={14} />}
                  variant="outline"
                  color="red"
                  style={{ flex: 1 }}
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </SimpleGrid>
      )}
    </Container>
  );
}
