## How to run this project locally

First, clone the project and download the dependencies:

```bash
npm install
# or
yarn 
# or
pnpm install
```

then run the development server: 
```bash
npm run dev
# or
yarn run dev
# or
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

# Design Inspiration 
https://www.untitledui.com/components/blog-post-sections

# Tech Stack
- Next JS (App Router)
- TailwindCSS
- Shadcn/ui for components
- React Query for API data fetching, caching, and mutations

#Note: 

Creating/Updating/Deleting Post will not have any effect on the actual data. 

Source:
Important: resource will not be really updated on the server but it will be faked as if. (https://jsonplaceholder.typicode.com/guide/)
