import { Pinecone } from '@pinecone-database/pinecone';

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const index = pinecone.index('wordhunt');
    
    // Get two random words by querying with random vectors
    // Generate random vectors with similar distribution to GloVe
    // GloVe vectors roughly follow normal distribution with mean 0, std ~0.4
    const generateRandomGloVeVector = () => {
      return Array(50).fill(0).map(() => {
        // Box-Muller transform for normal distribution
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        return z0 * 0.4; // scale by typical GloVe std deviation
      });
    };
    
    const randomVector1 = generateRandomGloVeVector();
    const randomVector2 = generateRandomGloVeVector();
    
    // Query for random words
    const [result1, result2] = await Promise.all([
      index.namespace('').query({
        vector: randomVector1,
        topK: 1,
        includeMetadata: true
      }),
      index.namespace('').query({
        vector: randomVector2,
        topK: 1,
        includeMetadata: true
      })
    ]);
    
    if (!result1.matches[0] || !result2.matches[0]) {
      return res.status(500).json({ error: 'Failed to get random words' });
    }
    
    const startWord = result1.matches[0].id;
    const targetWord = result2.matches[0].id;
    
    // Fetch the actual vectors for these words
    const vectors = await index.namespace('').fetch([startWord, targetWord]);
    
    res.status(200).json({
      startWord: startWord,
      targetWord: targetWord,
      startVector: vectors.records[startWord].values,
      targetVector: vectors.records[targetWord].values
    });
    
  } catch (error) {
    console.error('Error creating new game:', error);
    res.status(500).json({ error: 'Failed to create new game' });
  }
}