import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Game-related API routes
  
  // Validate a word
  app.post("/api/validate-word", async (req, res) => {
    try {
      const { word } = req.body;
      
      if (!word || typeof word !== 'string') {
        return res.status(400).json({ 
          valid: false, 
          error: "Word is required" 
        });
      }
      
      // Simple validation - in production, use a proper dictionary API
      const normalizedWord = word.toLowerCase().trim();
      
      // Basic validation rules
      const isValid = normalizedWord.length >= 3 && /^[a-z]+$/.test(normalizedWord);
      
      res.json({ 
        valid: isValid,
        word: normalizedWord 
      });
    } catch (error) {
      console.error('Word validation error:', error);
      res.status(500).json({ 
        valid: false, 
        error: "Internal server error" 
      });
    }
  });
  
  // Get game statistics (if needed for future features)
  app.get("/api/game-stats", async (req, res) => {
    try {
      // This could be expanded to track game statistics
      res.json({ 
        gamesPlayed: 0,
        averageScore: 0,
        mostCommonWords: []
      });
    } catch (error) {
      console.error('Game stats error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
