import type { LucideIcon } from 'lucide-react';
import { Briefcase, Users, Heart, FileText } from 'lucide-react';

interface DropdownItem {
  titleKey: string;
  descriptionKey: string;
  href: string;
  icon: LucideIcon;
}

interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
  dropdownContent?: DropdownItem[];
}

export const navItems: NavItem[] = [
  { name: 'services', href: '#services' },
  { name: 'our-work', href: '#our-work' },
  { 
    name: 'company',
    href: '#company',
    hasDropdown: true,
    dropdownContent: [
      {
        titleKey: 'nav.careers',
        descriptionKey: 'nav.careersDescription',
        href: '/careers', // Links to Careers.tsx
        icon: Briefcase
      },
      {
        titleKey: 'nav.aboutUs',
        descriptionKey: 'nav.aboutUsDescription',
        href: '/about', // Links to About.tsx
        icon: Users
      },
      {
        titleKey: 'nav.lifeAtTedred',
        descriptionKey: 'nav.lifeAtTedredDescription',
        href: '/life-at-tedred',
        icon: Heart
      }
    ]
  },
  {
    name: 'resources',
    href: '#resources',
    hasDropdown: true,
    dropdownContent: [
      {
        titleKey: 'nav.tedredStories',
        descriptionKey: 'nav.tedredStoriesDescription',
        href: '/stories', // Links to Stories.tsx
        icon: FileText
      }
    ]
  }
];