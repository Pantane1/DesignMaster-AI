
export enum DesignMode {
  POSTER = 'POSTER',
  BUSINESS_CARD = 'BUSINESS_CARD'
}

export interface PosterData {
  eventType: string;
  title: string;
  date: string;
  colors: string;
  audience: string;
  tone: string;
}

export interface BusinessCardData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  brandColors: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface PosterDesignResult {
  headline: string;
  subtext: string;
  cta: string;
  fontPairing: {
    heading: string;
    body: string;
  };
  colors: ColorPalette;
  layoutDescription: string;
  visualMetaphor: string;
}

export interface BusinessCardDesignResult {
  front: {
    layout: string;
    elements: string[];
  };
  back: {
    layout: string;
    elements: string[];
  };
  typography: {
    primary: string;
    secondary: string;
  };
  colors: ColorPalette;
  qrPlacement: string;
  spacingNotes: string;
}
