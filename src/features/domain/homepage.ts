export interface HeroSection {
  title: string
  tagline: string
  image: string
}

export interface AboutSection {
  title: string
  image: string
  content: string
}

export interface ChooseUsReason {
  icon: string
  description: string
  disabled: boolean
  title: string
}

export interface ChooseUsSection {
  title: string
  description: string
  reasons: ChooseUsReason[]
}

export interface ProgramItem {
  description: string
  image: string
  title: string
  slug: string
}

export interface ProgramsSection {
  title: string
  description: string
  items: ProgramItem[]
}

export interface HomepageData {
  hero: HeroSection
  about: AboutSection
  choose_us: ChooseUsSection
  programs: ProgramsSection
}

export interface HomepageManagementState {
  data: HomepageData | null
  loading: boolean
  saving: boolean
  activeTab: string
}