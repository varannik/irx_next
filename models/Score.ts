import { IScore, IScoreAsset, IUsers, IUserScoreDetails } from "@/types/Score";
import { model, models, Schema } from "mongoose";


// Mongoose Schema for User Score Details
const UserScoreDetailsSchema = new Schema<IUserScoreDetails>({
  join_date: { type: String, required: [true, "Join date is required"] },
  mean_absolute_error: { type: Number, min: [0, "Mean absolute error must be a positive number"] },
  root_mean_squared_error: { type: Number, min: [0, "Root mean squared error must be a positive number"] },
  mean_absolute_percentage_error: { type: Number, min: [0, "Mean absolute percentage error must be a positive number"] },
  weighted_score: { type: Number, min: [0, "Weighted score must be a positive number"] },
  rolling_average_stability: { type: Number, min: [0, "Rolling average stability must be a positive number"] },
  consistency_incentive: { type: Number, min: [0, "Consistency incentive must be a positive number"] },
  trend_sensitivity: { type: Number, min: [0, "Trend sensitivity must be a positive number"] },
  bonus_points: { type: Number, min: [0, "Bonus points must be a positive number"] },
  frequency_of_predictions: { type: Number, min: [0, "Frequency of predictions must be a positive number"] },
  ranking_score: { type: Number, min: [0, "Ranking score must be a positive number"] },
  rank: { type: Number, min: [1, "Rank must be at least 1"] },
});

// Mongoose Schema for Users (dynamic keys for user details)
const UsersSchema = new Schema<IUsers>({
  // Dynamic object where keys are strings and values are UserScoreDetailsSchema
}, { strict: false }); // Using `strict: false` to allow dynamic keys


// Mongoose Schema for Score Asset (dynamic keys with arrays of Users)
const ScoreAssetSchema = new Schema<IScoreAsset>({
  // Dynamic object where keys are strings and values are arrays of UsersSchema
}, { strict: false }); // Allowing dynamic keys



// Mongoose Schema for the main Score document
const ScoreSchema = new Schema<IScore>({
  updateDate: { type: String, required: [true, "Update date is required"] },
  assets: { type: [ScoreAssetSchema], required: true },
});


// Create the CurrentRate model
const Score = models.Score || model<IScore >('Score', ScoreSchema);

export default Score;