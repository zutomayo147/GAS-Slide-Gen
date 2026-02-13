export interface DesignSettings {
  presetName: string;
  themeColor: string;
  fontFamily: string;
  footerText: string;
  outputFolderUrl: string;
}

export const DEFAULT_DESIGN_SETTINGS: DesignSettings = {
  presetName: 'Default',
  themeColor: '#4285F4', // Google Blue
  fontFamily: 'Noto Sans JP',
  footerText: '© Google Inc.',
  outputFolderUrl: '',
};

export interface SlideData {
  type: string;
  [key: string]: any;
}
