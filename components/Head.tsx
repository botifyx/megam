import React, { useEffect } from 'react';

interface HeadProps {
    title?: string;
    description?: string;
    keywords?: string;
}

const Head: React.FC<HeadProps> = ({ title, description, keywords }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }

        const updateMeta = (name: string, content: string) => {
            let element = document.querySelector(`meta[name="${name}"]`);
            if (!element) {
                element = document.createElement('meta');
                element.setAttribute('name', name);
                document.head.appendChild(element);
            }
            element.setAttribute('content', content);
        };

        if (description) {
            updateMeta('description', description);
        }

        if (keywords) {
            updateMeta('keywords', keywords);
        }
    }, [title, description, keywords]);

    return null;
};

export default Head;
