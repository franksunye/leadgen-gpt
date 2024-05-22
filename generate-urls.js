import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const blogPostsDir = path.join(__dirname, 'src/pages/blog/posts');
const siteUrl = 'https://www.leadgen-gpt.com';

function getBlogPostUrls() {
    console.log('Scanning blog posts directory...');
    const files = fs.readdirSync(blogPostsDir);
    console.log(`Found ${files.length} blog posts.`);
    return files.map(file => `${siteUrl}/blog/posts/${path.parse(file).name}`);
}

async function submitUrls(urls) {
    const apiKey = '909d02eacbeb4db79775a48c41642530';
    const keyLocation = `${siteUrl}/${apiKey}.txt`;
    const payload = {
        host: siteUrl.replace('https://', ''),
        key: apiKey,
        keyLocation: keyLocation,
        urlList: urls
    };

    const response = await fetch('https://api.indexnow.org/IndexNow', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
    });

    if (response.ok) {
        console.log('URLs submitted successfully');
    } else {
        console.error('Error submitting URLs:', response.statusText);
    }
}

const newBlogPostUrls = getBlogPostUrls();
console.log('New blog post URLs:', newBlogPostUrls);
if (newBlogPostUrls.length > 0) {
    submitUrls(newBlogPostUrls);
} else {
    console.log('No new blog posts found. Nothing to submit to IndexNow.');

} 

