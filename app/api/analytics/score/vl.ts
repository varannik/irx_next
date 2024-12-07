import { z } from 'zod';

// Validation for IUserScoreDetails
const UserScoreDetailsSchema = z.object({
    join_date: z.string().min(1, "Join date is required"),
    mean_absolute_error: z.number().min(0, "Mean absolute error must be a positive number"),
    root_mean_squared_error: z.number().min(0, "Root mean squared error must be a positive number"),
    mean_absolute_percentage_error: z.number().min(0, "Mean absolute percentage error must be a positive number"),
    weighted_score: z.number().min(0, "Weighted score must be a positive number"),
    rolling_average_stability: z.number().min(0, "Rolling average stability must be a positive number"),
    consistency_incentive: z.number().min(0, "Consistency incentive must be a positive number"),
    trend_sensitivity: z.number().min(0, "Trend sensitivity must be a positive number"),
    bonus_points: z.number().min(0, "Bonus points must be a positive number"),
    frequency_of_predictions: z.number().min(0, "Frequency of predictions must be a positive number"),
    ranking_score: z.number().min(0, "Ranking score must be a positive number"),
    rank: z.number().min(1, "Rank must be at least 1"),
  });
  
  
  // Validation for IUsers (map of UserScoreDetails)
  const UsersSchema = z.record(
    z.string(),
    UserScoreDetailsSchema // Map of IUserScoreDetails
  );
  
  // Validation for IScoreAsset (map of arrays of IUsers)
  const ScoreAssetSchema = z.record(
    z.string(),
    z.array(UsersSchema) // Map of arrays of IUsers
  );
  
  // Validation for IScore
  export const vScoreSchema = z.object({
    updateDate: z.string().min(1, "Update date is required"),
    assets: z.array(ScoreAssetSchema) // Array of ScoreAssetSchema
  });