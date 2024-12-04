import { IUserScoreDetails } from "@/types/Score";

const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for IUserScoreDetails
const UserScoreDetailsSchema = new Schema({
  join_date: { type: String, required: true },
  mean_absolute_error: { type: Number, required: true },
  root_mean_squared_error: { type: Number, required: true },
  mean_absolute_percentage_error: { type: Number, required: true },
  weighted_score: { type: Number, required: true },
  rolling_average_stability: { type: Number, required: true },
  consistency_incentive: { type: Number, required: true },
  trend_sensitivity: { type: Number, required: true },
  bonus_points: { type: Number, required: true },
  frequency_of_predictions: { type: Number, required: true },
  ranking_score: { type: Number, required: true },
  rank: { type: Number, required: true }
});

// Schema for IUsers
const UsersSchema = new Schema({
  userScores: { type: Map, of: UserScoreDetailsSchema } // Map of IUserScoreDetails
});

// Schema for IScoreAsset
const ScoreAssetSchema = new Schema({
  assets: { type: Map, of: [UsersSchema] } // Map of arrays of IUsers
});

// Schema for IScore
const ScoreSchema = new Schema({
  updateDate: { type: String, required: true },
  assets: [ScoreAssetSchema] // Array of IScoreAsset
});

// Export the main model
const Score = mongoose.model('Score', ScoreSchema);

module.exports = Score;
