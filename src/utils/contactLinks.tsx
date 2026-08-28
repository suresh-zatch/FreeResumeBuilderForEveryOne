import React from 'react';

/**
 * Determines the proper href for a contact value.
 * - email → mailto:
 * - phone → tel:
 * - URLs → ensures https:// prefix
 * Returns null if the value is not linkable (e.g. plain location text).
 */
export function getContactHref(value: string, type?: 'email' | 'phone' | 'website' | 'linkedin' | 'github' | 'location'): string | null {
  if (!value) return null;

  // Explicit type hints
  if (type === 'email') return `mailto:${value}`;
  if (type === 'phone') return `tel:${value.replace(/\s+/g, '')}`;
  if (type === 'location') return null; // Locations aren't clickable

  // For website, linkedin, github — ensure URL has protocol
  if (type === 'website' || type === 'linkedin' || type === 'github') {
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    return `https://${value}`;
  }

  // Auto-detect if no type provided
  if (value.includes('@') && !value.includes('/')) return `mailto:${value}`;
  if (/^\+?\d[\d\s\-().]+$/.test(value)) return `tel:${value.replace(/\s+/g, '')}`;
  if (value.includes('linkedin.com') || value.includes('github.com') || value.includes('.') && value.includes('/')) {
    if (value.startsWith('http://') || value.startsWith('https://')) return value;
    return `https://${value}`;
  }

  return null;
}

/**
 * Renders a contact value as a clickable link if it's a URL/email/phone,
 * or as plain text otherwise (e.g. location).
 * 
 * Usage in templates:
 *   <ContactLink value={personalInfo.email} type="email" className="text-blue-600" />
 */
interface ContactLinkProps {
  value: string;
  type?: 'email' | 'phone' | 'website' | 'linkedin' | 'github' | 'location';
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ContactLink: React.FC<ContactLinkProps> = ({ value, type, className = '', style, children }) => {
  const href = getContactHref(value, type);

  if (href) {
    return (
      <a
        href={href}
        target={type === 'email' || type === 'phone' ? undefined : '_blank'}
        rel={type === 'email' || type === 'phone' ? undefined : 'noopener noreferrer'}
        className={`hover:underline ${className}`}
        style={style}
      >
        {children || value}
      </a>
    );
  }

  return <span className={className} style={style}>{children || value}</span>;
};

/**
 * For templates that render contact items from a flat array,
 * this helper maps each item to the right type for auto-linking.
 */
export function getContactType(value: string, personalInfo: {
  email?: string;
  phone?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  location?: string;
}): 'email' | 'phone' | 'website' | 'linkedin' | 'github' | 'location' | undefined {
  if (value === personalInfo.email) return 'email';
  if (value === personalInfo.phone) return 'phone';
  if (value === personalInfo.website) return 'website';
  if (value === personalInfo.linkedin) return 'linkedin';
  if (value === personalInfo.github) return 'github';
  if (value === personalInfo.location) return 'location';
  return undefined;
}
