import { IBBAsset, IBBDay, IBBMovs } from "@/types/BB";
import { Schema, models, model } from "mongoose";



// Define the schema for a single Rate entry (IBBDay)
const BBDaySchema: Schema = new Schema<IBBDay>({
  date: { type: String, required: true },
  Rate: { type: Number, required: true },
  Lower: { type: Number, required: true },
  Middle: { type: Number, required: true },
  Upper: { type: Number, required: true },
});

// Define the schema for dynamic currencies
const CurrencySchema = new Schema<IBBMovs>({
  MA3: [BBDaySchema],
  MA5: [BBDaySchema],
  MA10: [BBDaySchema],
});


// Define the main schema that extends Document (IBBAsset)
const BBAssetSchema: Schema = new Schema<IBBAsset>({
  bb: {
    type: Map,
    of: CurrencySchema,
    required: true,
  },
});

// Create the MaxMin model
const BB = models.BB || model<IBBAsset>("BB", BBAssetSchema);

export default BB;
