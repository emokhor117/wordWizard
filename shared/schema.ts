import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

// Game sessions table for tracking anagram games
export const gameSessions = pgTable("game_sessions", {
  id: serial("id").primaryKey(),
  player1Name: text("player1_name").notNull(),
  player2Name: text("player2_name").notNull(),
  player1Score: integer("player1_score").notNull().default(0),
  player2Score: integer("player2_score").notNull().default(0),
  letters: text("letters").notNull(), // JSON string of the letter set used
  createdAt: timestamp("created_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Words found during games
export const foundWords = pgTable("found_words", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").references(() => gameSessions.id),
  playerNumber: integer("player_number").notNull(), // 1 or 2
  word: text("word").notNull(),
  points: integer("points").notNull(),
  letterIndices: text("letter_indices"), // JSON string of indices used
  createdAt: timestamp("created_at").defaultNow(),
});

// Validation schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGameSessionSchema = createInsertSchema(gameSessions).pick({
  player1Name: true,
  player2Name: true,
  letters: true,
});

export const insertFoundWordSchema = createInsertSchema(foundWords).pick({
  sessionId: true,
  playerNumber: true,
  word: true,
  points: true,
  letterIndices: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertGameSession = z.infer<typeof insertGameSessionSchema>;
export type GameSession = typeof gameSessions.$inferSelect;

export type InsertFoundWord = z.infer<typeof insertFoundWordSchema>;
export type FoundWord = typeof foundWords.$inferSelect;
