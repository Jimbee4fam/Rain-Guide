export type FrequencyType = 'single' | 'range';

export type Category =
  | 'aviation'
  | 'weather'
  | 'marine'
  | 'fm'
  | 'am'
  | 'cb'
  | 'railroad'
  | 'frs'
  | 'ham'
  | 'hf'
  | 'ais'
  | 'utility'
  | 'custom';

export type SdrMode =
  | 'AM' | 'FM' | 'NFM' | 'WFM' | 'USB' | 'LSB' | 'CW' | 'DSB' | 'RAW';

export interface AppSetting {
  mode?: string;
  bandwidth?: string;
  filter?: string;
  filterWidth?: string;
  step?: string;
  squelch?: string;
  notes?: string;
  [key: string]: string | undefined;
}

export interface AppSettings {
  sdrpp: AppSetting;
  sdrsharp: AppSetting;
  gqrx: AppSetting;
  dragonos: AppSetting;
}

export interface Preset {
  id: string;
  name: string;
  category: Category;
  frequencyType: FrequencyType;
  frequency?: string;
  frequencyStart?: string;
  frequencyEnd?: string;
  mode: SdrMode;
  bandwidth: string;
  step?: string;
  description: string;
  antennaNote: string;
  tags: string[];
  isFavorite: boolean;
  isCustom: boolean;
  nfcTagId?: string;
  deepLink?: string;
  appSettings: AppSettings;
  quickTuneSteps?: string[];
}

export type Page = 'home' | 'signal-stack' | 'scan-tag' | 'favorites' | 'custom-presets';

export interface HomeSection {
  id: string;
  title: string;
  icon: string;
  content: string;
  details?: ComponentDetail[];
}

export interface ComponentDetail {
  name: string;
  description: string;
  howToUse: string[];
  warnings: string[];
}
