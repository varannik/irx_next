export interface recTrend {
    date: string
    , "AI": number | null
    , "Votes": number | null
    , "You": number | null
    , "Real": number | null
    , "AI Forcast"?: number | null
    , "Voting Forcast"?: number | null
    , "Your Forcast"?: number | null
  
  }



  export interface recCatTrackTooltip{
    date: string
    , "Forcasted Shift %": number | null
    , "Actual Shift %": number | null
  }

  export interface recCatTrack {
    color : "bg-green-high" | "bg-red-high" | "bg-gray-600"  
    tooltip: recCatTrackTooltip
  }

  export interface recTrack {
      AI: recCatTrack[]
      Voting: recCatTrack[]
    , You: recCatTrack[]
  }
  
  export interface IAssetData {
      trend: recTrend[]
    , track: recTrack
  }
  export interface IChartData {
    [key: string]: IAssetData
  }