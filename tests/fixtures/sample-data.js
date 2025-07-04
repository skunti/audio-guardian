
module.exports = {
  validUser: {
    email: 'doctor@hospital.com',
    password: 'healthcare123',
    role: 'physician'
  },
  
  testAudioMetadata: {
    id: 'test-audio-123',
    filename: 'patient-consultation.wav',
    duration: 180,
    fileSize: 1024000,
    status: 'completed',
    createdAt: '2024-01-15T10:30:00Z'
  },
  
  mockApiResponses: {
    auth: {
      success: {
        token: 'mock-jwt-token',
        user: {
          id: 'user-123',
          email: 'doctor@hospital.com',
          role: 'physician'
        }
      },
      failure: {
        error: 'Invalid credentials',
        code: 'AUTH_FAILED'
      }
    },
    
    upload: {
      success: {
        audioId: 'audio-456',
        status: 'processing',
        estimatedCompletion: '2024-01-15T10:35:00Z'
      },
      failure: {
        error: 'File too large',
        code: 'FILE_SIZE_EXCEEDED',
        maxSize: '100MB'
      }
    }
  }
};
