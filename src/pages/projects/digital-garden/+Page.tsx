export { Page }

function Page() {
  return (
    <>
      <h2 className="text-white text-2xl mb-2">Digital Garden</h2>
      <p className="text-white mb-5">This page tracks what I'd like to do in this space.</p>
      <h3 className="text-white text-xl mb-2">Checklist</h3>
      <ul className="list-disc list-inside mb-5">
        <li className="text-white line-through">Establish a digital garden</li>
        <li className="text-white line-through">Switch from next.js to Vite + Vike + Tailwind</li>
        <li className="text-white line-through">Switch to static builds</li>
        <li className="text-white line-through">Create tracker page</li>
        <li className="text-white ">Establish a basic theme</li>
        <li className="text-white ">Attach Sanity CMS + build webhooks</li>
        <li className="text-white ">Sort site metadata for crawlers</li>
        <li className="text-white ">Create a site logo</li>
        <li className="text-white ">Create components to use in Sanity block editor</li>
        <li className="text-white ">... everything else!</li>
      </ul>
      
    </>
  )
}       