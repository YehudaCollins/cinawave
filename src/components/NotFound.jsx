import React from 'react';

const NotFoundPage = () => {
  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <h2 style={styles.h2}>You got us!! <br /> We crashed into a wave</h2>
        <h1 style={styles.h1}>
          Quick, grab this boat and get <a href="https://cinawave.com/" style={styles.a}>back to safety</a>
        </h1>
      </div>
    </div>
  );
};

const styles = {
  body: {
    backgroundColor: '#f0f0f0', // Light gray background
    fontFamily: '\'Segoe UI\', Tahoma, Geneva, Verdana, sans-serif', // Font stack
    textAlign: 'center',
    marginTop: '100px' // Adjust as needed
  },
  container: {
    textAlign: 'center',
  },
  h2: {
    fontSize: '5em',
    color: '#333', // Dark gray text
  },
  h1: {
    fontSize: '3em',
    color: '#555', // Slightly darker gray text
  },
  a: {
    color: '#007bff', // Blue link color
    textDecoration: 'none', // Remove underline
  },
  aHover: {
    textDecoration: 'underline', // Add underline on hover
  },
};

export default NotFoundPage;
