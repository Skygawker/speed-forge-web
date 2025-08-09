import { useEffect } from "react";

interface SeoProps {
  title: string;
  description?: string;
  canonicalPath?: string;
}

const Seo = ({ title, description, canonicalPath }: SeoProps) => {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = 'description';
        document.head.appendChild(meta);
      }
      meta.content = description;
    }

    if (canonicalPath) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      const origin = window.location.origin;
      link.href = canonicalPath.startsWith('http') ? canonicalPath : `${origin}${canonicalPath}`;
    }
  }, [title, description, canonicalPath]);

  return null;
};

export default Seo;
